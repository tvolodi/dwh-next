import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from '@prisma/client';

import { db } from '@/lib/db/drizzle';
import { eq } from "drizzle-orm";
import { DwhConfig } from '@/lib/schemas/db/schema';


const prismaClient = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log("API: hello from dwh-config details");
    console.log("API: req.query: ", req.query);


    const Id = parseInt(req.query.id as string);

    console.log("API: Id: ", Id);

    const method = req.method;
    switch (method) {
        case "GET":
            // const data = await prismaClient.dwhConfig.findUnique({
            //     where: {
            //         Id: Id
            //     }
            // });
            let data = await db.select()
                .from(DwhConfig)
                .where(eq( DwhConfig.Id, Id));
            
            if (data.length > 0) {
                let result = data[0]; 
                return res.status(200).json(result);
            }
                
            console.log("API: data", data);
            res.status(200).json(data);
            break;
        case "POST":
            // res.status(200).json({ id, method });
            break;
        case "PUT":
            // res.status(200).json({ id, method });
            break;
        case "DELETE":
            // res.status(200).json({ id, method });
            break;
        default:
            // res.status(405).end();
            break;
    }
}