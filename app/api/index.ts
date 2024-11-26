import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
export default async function handler(req: any, res: any) {
    
    console.log("API: getData for DWH Config");
    console.log("req", req);

    const data = await prismaClient.dwhConfig.findMany();
    res.json(data);    
}