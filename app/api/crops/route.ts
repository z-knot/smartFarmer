import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const crops = await prisma.crop.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(crops);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch crops' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const crop = await prisma.crop.create({
      data: body,
    });

    return NextResponse.json(crop);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create crop' },
      { status: 500 }
    );
  }
}