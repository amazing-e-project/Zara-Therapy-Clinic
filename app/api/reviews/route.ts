import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db('zara_clinic')
    await db.collection('reviews').insertOne({
      ...body,
      savedAt: new Date(),
    })
    return NextResponse.json({ message: 'Review saved!' }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}