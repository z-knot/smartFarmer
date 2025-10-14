import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fieldId = searchParams.get('fieldId');
    const sensorType = searchParams.get('type');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const whereClause: any = {};

    if (fieldId) {
      whereClause.fieldId = fieldId;
    }

    if (sensorType) {
      whereClause.sensorType = sensorType;
    }

    if (from || to) {
      whereClause.timestamp = {};
      if (from) whereClause.timestamp.gte = new Date(from);
      if (to) whereClause.timestamp.lte = new Date(to);
    }

    const readings = await prisma.sensorReading.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'asc',
      },
    });

    return NextResponse.json(readings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sensor readings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reading = await prisma.sensorReading.create({
      data: body,
    });

    return NextResponse.json(reading);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create sensor reading' },
      { status: 500 }
    );
  }
}