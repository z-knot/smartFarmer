import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      include: {
        field: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const alert = await prisma.alert.create({
      data: body,
      include: {
        field: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(alert);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const alert = await prisma.alert.update({
      where: { id },
      data: updates,
      include: {
        field: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(alert);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}