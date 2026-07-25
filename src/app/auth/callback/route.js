import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

import {prisma} from '@/lib/prisma';

export async function GET(request){
    const {searchParams, origin} = new URL(request.url)
    const code = searchParams.get('code')

    if(code){
        const supabase = await createClient();
        const {data, error} = await supabase.auth.exchangeCodeForSession(code);

        if(!error && data?.user){
            // sync into prisma user table
            await prisma.user.upsert({
                where: {id: data.user.id},
                update: {},
                create: {
                    id: data.user.id,
                    email: data.user.email,
                }

            })
            return NextResponse.redirect(`${origin}/`)
        }
    }
    return NextResponse.redirect(`${origin}/login?error=auth-failed`)
}