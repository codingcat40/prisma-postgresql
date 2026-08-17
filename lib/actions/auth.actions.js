'use server';

import { cookies } from "next/headers";
import {prisma} from '@/lib/prisma'
import {hashPassword, verifyPassword, signToken} from '@/lib/auth'

export async function signUp(previousState, formData){
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')

    if(!email || !password) {
        return {error: 'Email and password are required!'}
    }

    if(password.length < 6){
        return {error: 'password must be at least 6 characters'}
    }

    const existingUser = await prisma.user.findUnique({where: {email}})

    if(existingUser){
        return {error: 'User already exists'}
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: name || null,
        }
    })

    // issue a token and set it as httpOnly cookie - login session

    const token = signToken({userId: user.id, email: user.email})

    const cookieStore  = await cookies()

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })

    return {success: true}

}


export async function logIn(prevState, formData){
    const email = formData.get('email')
    const password = formData.get('password')

    if(!email || !password){
        return {error: 'Email and password are required'}
    }
    const user = await prisma.user.findUnique({where: {email}})

    if(!user){
        return {error: 'User does not exist'}
    }

    const isPasswordValid = await verifyPassword(password,  user.password)
    if(!isPasswordValid){
        return {error: 'Invalid password'}
    }

    const token = signToken({userId: user.id, email: user.email})

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })
    return {success: true}
}


export async function logOut(){
    const cookieStore = await cookies();
    cookieStore.delete('token')
    return {success: true}
}