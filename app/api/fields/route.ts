import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const fields = await prisma.field.findMany({
      include: {
        fieldCrops: {
          include: {
            crop: true,
          },
        },
        alerts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(fields);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fields' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const field = await prisma.field.create({
      data: body,
      include: {
        fieldCrops: {
          include: {
            crop: true,
          },
        },
      },
    });

    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create field' },
      { status: 500 }
    );
  }
}