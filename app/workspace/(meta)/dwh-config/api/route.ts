import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
export async function GET(req: any) {
    
    console.log("API: getData for DWH Config");
    console.log("req", req);

    const data = await prismaClient.dwhConfig.findMany();
    return Response.json(data);    
}

