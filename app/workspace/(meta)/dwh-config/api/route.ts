import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
export async function GET(req: any) {
        
    // console.log("API: getData for DWH Config");
    // console.log("req", req);

    const data = await prismaClient.dwhConfig.findMany();
    console.log("API: data", data);
    return Response.json(data);    
}

export async function POST(req: any) {
        
    console.log("API: postData for DWH Config");
    // console.log("req", req);
    const reqJson = await req.json();
    console.log("reqJson", reqJson);
    // console.log("req.body", req.body);

    const data = await prismaClient.dwhConfig.create({
        data: reqJson
    });


    console.log("API: data", data);

    return Response.json(data);    
}
