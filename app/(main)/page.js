import {prisma} from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard'


export default async function HomePage(){
    const user = await getCurrentUser()
    
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'}
    })
    return (
        <div>
            <Navbar user={user}/>
            <main className='mx-auto max-w-6xl px-6 py-8'>
                {posts.length === 0 ? (

                    <p className='mx-auto max-w-6xl px-6 py-8'>
                        No Posts Yet. Create the first one!
                    </p>

                    
                ) : (

                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {
                            posts.map(post => <PostCard key={post.id} post={post} />)
                        }
                    </div>
                )}
            </main>
        </div>
        
    )
}