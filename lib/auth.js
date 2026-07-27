// password hashing jwt
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '7d'

export async function hashPassword(plainPassword){
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(plainPassword, salt)
}

export async function verifyPassword(plainPassword, hashedPassword){
    return bcrypt.compare(plainPassword, hashedPassword)
}

export function signToken(payload){
    // payload = {userId, email}
    return jwt.sign(payload, JWT_SECRET, {algorithm: 'RS256'} ,{expiresIn: JWT_EXPIRES_IN}, function(err, token) {
        console.log(token)
    })


}


export function verifyToken(token){
    try{
        return jwt.verify(token, JWT_SECRET)
    }catch(err){
        return null
    }
}
