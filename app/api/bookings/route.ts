import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db('zara_clinic')
    const result = await db.collection('bookings').insertOne({
      ...body,
      savedAt: new Date(),
    })
    return NextResponse.json({ message: 'Booking saved!', id: result.insertedId }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { bookingId } = await request.json()
    const client = await clientPromise
    const db = client.db('zara_clinic')
    await db.collection('bookings').updateOne(
      { id: bookingId },
      { $set: { status: 'cancelled', cancelledAt: new Date() } }
    )
    return NextResponse.json({ message: 'Booking cancelled' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}