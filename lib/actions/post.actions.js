'use server'

import {writeFile} from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import {prisma} from '@/lib/prisma'
import {getCurrentUser} from '@/lib/getCurrentUser'


export async function createPost(prevState, formData){
    const user = await getCurrentUser()
    if(!user){
        return {error: 'You must be logged in'}
    }

    const title = formData.get('title')
    const description = formData.get('description')
    const imageFile = formData.get('image')

    if(!title || !description){
        return {error: 'Title and description are required!'}
    }

    let imageUrl = null;

    if(imageFile && imageFile.size > 0){
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const uniqueName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        
        const filePath = path.join(process.cwd(), 'public', 'uploads', uniqueName);

        await writeFile(filePath, buffer);

        imageUrl = `/uploads/${uniqueName}`
    
    
    }

    await prisma.post.create({
        data: {
            title, description, imageUrl, authorId: user.id,
        }
    })

    revalidatePath('/')

    return {success: true};
}