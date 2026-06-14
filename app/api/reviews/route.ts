import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('zara_clinic')
    const reviews = await db.collection('reviews').find({}).sort({ savedAt: -1 }).toArray()
    return NextResponse.json({ reviews })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

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