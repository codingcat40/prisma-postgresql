'use server'

import {unlink, writeFile} from 'fs/promises'
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

export async function updatePost(prevState, formData){
    const user = await getCurrentUser()
    if(!user){
        return {error: 'User not logged in'}
    }
    const postId = formData.get('postId')
    const title  = formData.get('title')
    const description = formData.get('description')
    const imageFile = formData.get('image')
    const removeImage = formData.get('removeImage') === 'on'


    const post = await prisma.post.findUnique({where: {id: postId}})
    if(!post){
        return {error: 'post not found'}
    }

    if(post.authorId !== user.id){
        return {error: 'Not authorized'}
    }
    if(!title || !description){
        return {error: 'Title and description are required'}
    }

    let imageUrl = post.imageUrl



    // Case 1: user checked "remove image"
  if (removeImage && post.imageUrl) {
    const oldPath = path.join(process.cwd(), 'public', post.imageUrl);
    await unlink(oldPath).catch(() => {}); // ignore if file already missing
    imageUrl = null;
  }

  // Case 2: user uploaded a new image (replaces old one, if any)
  if (imageFile && imageFile.size > 0) {
    if (post.imageUrl) {
      const oldPath = path.join(process.cwd(), 'public', post.imageUrl);
      await unlink(oldPath).catch(() => {});
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', uniqueName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${uniqueName}`;
  }

  await prisma.post.update({
    where: {id: postId},
    data: {title, description, imageUrl},
  })

  revalidatePath('/')
  return {success: true}



}


export async function deletePost(postId){
    const user = await getCurrentUser()

    if(!user){
        return {error: 'user not logged in!'}
    }

    const post = await prisma.post.findUnique({where: {id: postId}})
    if(!post){
        return {error: 'post does not exists'}
    }

    if(post.authorId !== user.id){
        return {error: 'Not authorized to delete'}
    }
    if(post.imageUrl){
        const imagePath = path.join(process.cwd(), 'public', post.imageUrl)
        await unlink(imagePath).catch(() => {})
    }

    await prisma.post.delete({where: {id: postId}})

    revalidatePath('/')
    return {success: true}
}