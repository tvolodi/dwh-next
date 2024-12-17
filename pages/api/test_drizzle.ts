import { NextApiRequest as Request, NextApiResponse as Response } from 'next';

import { db } from '@/lib/db/drizzle';
import { eq } from "drizzle-orm";

import * as dbSchema from '@/lib/schemas/pg_db/schema';
import { meta_Module } from '@/lib/schemas/pg_db/schema';

export default async function handler (req: Request, res: Response) {
    console.log("API: hello from processEntityItem");
    console.log("API: req.query: ", req.query);
    console.log("API: req.body: ", req.body);

    const { entityName, entityId } = req.query;

    const fullEntityName = req.query.fullEntityName as string;


    try{
        if (!db.query.hasOwnProperty(fullEntityName)) {
            throw new Error(`Invalid entity name: ${fullEntityName}`);
        }
        const qResult = await db.query.meta_Entity.findMany({
            with: {
                Module: true,
            },
        });
        return res.status(200).json(qResult);
    } catch (error) {
        console.error("API: error: ", error);
        res.status(500).json({error: error});
    }

}