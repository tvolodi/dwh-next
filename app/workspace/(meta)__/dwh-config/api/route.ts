import { db } from '@/lib/db/drizzle';
import { DwhConfig } from '@/lib/schemas/pg_db/schema';
import { eq } from "drizzle-orm";

export async function GET(req: any) {
        
    // console.log("API: getData for DWH Config");
    // console.log("req", req);

    // const data = await prismaClient.dwhConfig.findMany();
    
    console.log("from drizzle");
    const data = await db.select().from(DwhConfig);

    // console.log("API: data", data);
    return Response.json(data);    
}

// export async function POST(req: any) {    
//     console.log("API: postData for DWH Config");
//     console.log("method", req.method);
//     // console.log("req", req);
//     const reqJson = await req.json();
//     console.log("reqJson", reqJson);
//     // console.log("req.body", req.body);
//     delete reqJson.Id;
//     // const data = await prismaClient.dwhConfig.create({
//     //     data: reqJson
//     // });
//     const reqResult = await db.insert(DwhConfig).values(reqJson).returning();
//     if(reqResult.length > 0) {        
//         console.log("API: POST result", reqResult[0]);
//         return Response.json(reqResult[0]);
//     }

//     // console.log("API: data", data);
//     console.log("API: POST data", {});

//     return Response.json({});
// }

// export async function PUT(req: any) {    
//     console.log("API: PUT Data for DWH Config");
//     // console.log("req", req);
//     const reqJson = await req.json();
//     console.log("reqJson", reqJson);
//     // console.log("req.body", req.body);
//     // const data = await prismaClient.dwhConfig.update({
//     //     where: {
//     //         Id: reqJson.Id
//     //     },
//     //     data: reqJson
//     // });

//     const result = await db.update(DwhConfig).set(reqJson)
//         .where(eq(DwhConfig.Id, reqJson.Id));

//     // console.log("API: data from PUT", data);

//     return Response.json(result);    
// }

// export async function DELETE(req: any) {    
//     console.log("API: DELETE Data for DWH Config");
//     // console.log("req", req);
//     const reqJson = await req.json();
//     console.log("reqJson", reqJson);
//     // console.log("req.body", req.body);
//     const data = await prismaClient.dwhConfig.delete({
//         where: {
//             Id: reqJson.Id
//         }
//     })
//     return Response.json(data);
// };