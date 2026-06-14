import { NextResponse } from 'next/server';
import { clientPromise } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('zara_clinic');
    const collections = await db.listCollections().toArray();
    return NextResponse.json({ message: 'Connected!', collections: collections.map(c => c.name) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}