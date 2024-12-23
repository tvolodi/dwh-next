// import type { NextApiRequest, NextApiResponse } from "next";
import  fs from "fs";
// import { db } from "../lib/db/drizzle.ts";
import { db } from '@/lib/db/drizzle';
import { eq } from "drizzle-orm";

import * as dbSchema from '@/lib/schemas/pg_db/schema';

export default async function handler(req, res) {
    console.log("API: hello from processEntityItem 2");
    console.log("API: req.query: ", req.query);

    const fullEntityName = req.query.fullEntityName;
    if(!fullEntityName) {
        return res.status(500).send("fullEntityName query parameter is required");
    }

    const fullEntityNameParts = (fullEntityName).split("_");
    const dbSchemaName = fullEntityNameParts[0];
    const entityName = fullEntityNameParts[1];
    // console.log("API: dbSchema: ", dbSchemaName);
    // console.log("API: entity: ", entity);

    const method = req.method;
    const reqBody = req.body;

    console.log("API: method: ", method);
    console.log("API: reqBody: ", reqBody);

    const moduleName = `../pages/api/${dbSchemaName}/${entityName}.${method}.ts`;

    try {
        const customProcModule = await import(moduleName);
        // TODO run custome routine
        return res.status(200).json({message: "Hello from processEntityItem custom processing"});

    } catch (err) {
        console.log(`Error from import custom module ${moduleName} for ${method} method: `);
    }

    console.log(`Entity name: ${fullEntityName}`);

    const entity = dbSchema[fullEntityName];

    // Standard processing

    switch (method) {
        case "GET":
            break;

        case "POST":
            try {
                                
                // Remove Id from the body because it is insertion
                delete reqBody.Id;

                console.log(`API: Method: POST: entity: `, entity);

                const dbResult = await db.insert(entity).values(reqBody).returning();
                console.log("API: Method: POST:  result", dbResult);

                if(dbResult.length > 0) {
                    return res.status(200).json(dbResult[0]);
                }
                return res.status(200).send({});
                
            } catch (err) {
                console.log("Error: ", err);
                return res.status(500).send(`Error inserting entity ${fullEntityName} -> ${err}`);
            }
            break;

        case "PUT":
            try {
                const id = reqBody.Id;
                const dbResult = await db.update(entity).set(reqBody).where(eq(entity.Id, id)).returning();
                
                console.log("API: Method: PUT:  result", dbResult);

                if(dbResult.length > 0) {
                    return res.status(200).json(dbResult[0]);
                }
                return res.status(200).send({});

            } catch (err) {
                console.error("Error: ", err);
                return res.status(500).send(`Error updating entity ${fullEntityName} -> ${err}`);
            }
            break;
        
        case "DELETE":
            try {

                // console.log("API: entity", entity);
                const id = reqBody.Id;
                const dbResult = awaitdb.delete(entity).where(eq(entity.Id, id)).returning();
                if(dbResult.length > 0) {
                    return res.status(200).json(dbResult[0]);
                }                                

            } catch (err) {
                console.error("Error: ", err);
                return res.status(500).send(`Error to delete entity ${fullEntityName} -> ${err}`);
            }
            break;
    }
}