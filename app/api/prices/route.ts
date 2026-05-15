import { NextResponse } from 'next/server';
import { fetchCoffeeData } from '@/services/googleSheets';

export async function GET() {
  try {
    const data = await fetchCoffeeData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sheets:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
