import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
export async function GET(req: any) {
        
    // console.log("API: getData for DWH Config");
    // console.log("req", req);

    const data = await prismaClient.dwhConfig.findMany();
    // console.log("API: data", data);
    return Response.json(data);    
}

export async function POST(req: any) {    
    console.log("API: postData for DWH Config");
    console.log("method", req.method);
    // console.log("req", req);
    const reqJson = await req.json();
    console.log("reqJson", reqJson);
    // console.log("req.body", req.body);
    delete reqJson.Id;
    const data = await prismaClient.dwhConfig.create({
        data: reqJson
    });


    // console.log("API: data", data);

    return Response.json(data);    
}

export async function PUT(req: any) {    
    console.log("API: PUT Data for DWH Config");
    // console.log("req", req);
    const reqJson = await req.json();
    console.log("reqJson", reqJson);
    // console.log("req.body", req.body);
    const data = await prismaClient.dwhConfig.update({
        where: {
            Id: reqJson.Id
        },
        data: reqJson
    });


    // console.log("API: data from PUT", data);

    return Response.json(data);    
}

export async function DELETE(req: any) {    
    console.log("API: DELETE Data for DWH Config");
    // console.log("req", req);
    const reqJson = await req.json();
    console.log("reqJson", reqJson);
    // console.log("req.body", req.body);
    const data = await prismaClient.dwhConfig.delete({
        where: {
            Id: reqJson.Id
        }
    })
    return Response.json(data);
};