import { db } from '@/lib/db/drizzle';
import { eq } from "drizzle-orm";

import * as dbSchema from '@/lib/schemas/pg_db/schema';
import { Module } from '@/lib/schemas/pg_db/schema';

export default async function handler(req, res) {
    console.log("API: hello from processEntityItem");
    console.log("API: req.query: ", req.query);
    console.log("API: req.body: ", req.body);


    const Module = dbSchema['Module'];
    // console.log(`Module:`, Module);

    const qResult = await db.query.Module.findMany({
        with: {
            Entity: true
        },
    });
    console.log(`=================`)
    console.log("API: dbResult 1: ", qResult);
    console.log(`=================`)


    return res.status(200).json(qResult);

    const fullEntityName = req.query.fullEntityName;
    if(!fullEntityName) {
        return res.status(500).send("fullEntityName query parameter is required");
    }

    const fullEntityNameParts = (fullEntityName).split(".");
    const dbSchemaName = fullEntityNameParts[0];
    const entityName = fullEntityNameParts[1];
    // console.log("API: dbSchema: ", dbSchemaName);
    // console.log("API: entity: ", entity);    

    const method = req.method;

    console.log("API: method: ", method);

    const customProcModuleName = `../pages/api/${dbSchemaName}/${entityName}.${method}.ts`;
    let customProcModule;
    try{
        customProcModule = await import(customProcModuleName);
        if (customProcModule) {
            console.log(`API: loaded custom processing module. ${customProcModuleName}`);
            return res.status(200).json({message: "Hello from Save entity item GET method routine import"});
        }
    } catch (err) {
        console.log(`Error with import custom module ${entityName} for ${method} method. Stdaard processing will be used.`);
        // Custom processing is absent. Continue with standard processing
    }

    const entity = dbSchema[entityName];
  
    switch (method) {
        case "GET":

            try{
                const qResult = await db.query[entityName].findMany();
                // const qResult = await db.select().from(entity);
                return res.status(200).json(qResult);    
            } catch (err) {
                console.log(`Error get all records for entity: ${entityName}`, err);
                return res.status(500).send(`${err}`);
            }
            break;
        case "POST":
            try {
                // Standard POST method

                // Get filter, sort and pagination parameters
                let columns = req.body.columns;
                let include = req.body.include;
                let filter = req.body.filter;
                let sort = req.body.sort;
                let page = req.body.page;
                let pageSize = req.body.pageSize;

                const includeReferences = {};
                if (include) {
                    for (const ref of include) {
                        const refEntityName = ref.split(".")[1];
                        const entity = dbSchema[refEntityName];
                        includeReferences[entity] = true;
                    }
                }


                if (!include) {
                    include = [];
                }
                if (!columns) {
                    columns = "*";
                }
                if (!filter) {
                    filter = {};
                }
                if (!sort) {
                    sort = {};
                }
                if (!page) {
                    page = 1;
                }
                if (!pageSize) {
                    pageSize = 10;
                }

                console.log(`includereferences:`, includeReferences);

                const Module = dbSchema['Module'];
                // console.log(`Module:`, Module);

                const qResult = await db.query[entityName].findMany({
                    with: {
                        Module: true
                    },
                });
                console.log(`=================`)
                console.log("API: dbResult: ", qResult);
                console.log(`=================`)
                if (qResult.length > 0) {
                    return res.status(200).json(qResult);
                }
                return res.status(200).json([{}]);

                // db.select().from(entity).where(filter).orderBy(sort).page(page)
                // .then((result) => {
                //     console.log("API: method: POST: result", result);
                //     return res.status(200).json(result);
                // })
                // .catch((err) => {
                //     console.log("Error: ", err);
                //     return res.status(500).send(`${err}`);
                // });
            } catch (err) {
                console.error("Error: ", err);
                return res.status(500).send(`Error to get entity list for ${entityName} -> `, err);
            }


            
            break;

    }
}