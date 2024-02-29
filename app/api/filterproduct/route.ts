import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";
export const dynamic = 'auto'


export async function GET(request: Request) {
  try {
    const searchParams = new URLSearchParams(request.credentials);

    const categories = searchParams.getAll("categories[]");
    const colors = searchParams.getAll("colors[]");
    const sizes = searchParams.getAll("size[]");

    const product = await prisma.product.findMany({
      where: {
        AND: [ 
          { OR: categories.map((category) => ({ style: { contains: category } })) }, 
          { OR: sizes.map((size) => ({ size: { contains: size } })) },
          { OR: colors.map((color) => ({ color: { contains: color } })) },
        ],
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error selecting product", error);
    return NextResponse.error();
  }
}