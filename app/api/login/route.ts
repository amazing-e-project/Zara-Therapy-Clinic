import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const client = await clientPromise
    const db = client.db('zara_clinic')
    const user = await db.collection('users').findOne({
      email: email.toLowerCase(),
      password
    })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials. Please try again or sign up.' }, { status: 401 })
    }
    return NextResponse.json({ name: user.name, email: user.email, gender: user.gender })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}