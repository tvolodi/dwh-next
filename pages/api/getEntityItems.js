import { db } from '@/lib/db/drizzle';
import { eq } from "drizzle-orm";

import * as dbSchema from '@/lib/schemas/pg_db/schema';

export default async function handler(req, res) {
    console.log("API: hello from processEntityItem");
    console.log("API: req.query: ", req.query);

    const fullEntityName = req.query.fullEntityName;
    if(!fullEntityName) {
        return res.status(500).send("fullEntityName query parameter is required");
    }

    const fullEntityNameParts = (fullEntityName).split(".");
    const dbSchemaName = fullEntityNameParts[0];
    const entity = fullEntityNameParts[1];
    // console.log("API: dbSchema: ", dbSchemaName);
    // console.log("API: entity: ", entity);

    const entityName = entity;
    const method = req.method;

    console.log("API: method: ", method);

    switch (method) {
        case "GET":
            try {
                //const data = await fs.promises.readFile(`./lib/schemas/${dbSchema}/${entity}.${type}.js`, "utf8");
                //return res.status(200).json(JSON.parse(data));
                const moduleName = `../pages/api/${dbSchemaName}/${entityName}.${method}.ts`;
                // console.log("API: moduleName", moduleName);
                import(moduleName)
                .then((module) => {
                    // console.log("API: module", module);
                    return res.status(200).json({message: "Hello from Save entity item POST method routine import"});
                }).catch((err) => {
                    console.log("Error from import module for POST method: ", err);
                    

                    // Standard GET
                    // Get entity DB schema
                    const entity = dbSchema[entityName];
                    db.select().from(entity).all()
                    .then((result) => {
                        console.log("API: method: GET: result", result);
                        return res.status(200).json(result);
                    }).catch((err) => {
                        console.log(`Error get all records for entity: ${entityName}`, err);
                        return res.status(500).send(`${err}`);
                    });

                });
            } catch (err) {
                console.log("Error: ", err);
                return res.status(500).send("Error reading file");
            }
            break;
        case "POST":
            try {
                const moduleName = `../pages/api/${dbSchemaName}/${entityName}.${method}.ts`;
                // console.log("API: moduleName", moduleName);
                import(moduleName)
                .then((module) => {
                    // console.log("API: module", module);
                    return res.status(200).json({message: "Hello from Save entity item POST method routine import"});
                }).catch((err) => {
                    console.log("Error from import module for POST method: ", err);
                    // return res.status(500).send("Error reading file");

                    // Standard POST method
                    // Get entity DB schema
                    const entity = dbSchema[entityName];

                    // Get filter, sort and pagination parameters
                    let filter = req.body.filter;
                    let sort = req.body.sort;
                    let page = req.body.page;
                    let pageSize = req.body.pageSize;
                    if(!filter) {
                        filter = {};
                    }
                    if(!sort) {
                        sort = {};
                    }
                    if(!page) {
                        page = 1;
                    }
                    if(!pageSize) {
                        pageSize = 10;
                    }

                    db.select().from(entity).where(filter).orderBy(sort).page(page).all()
                    .then((result) => {
                        console.log("API: method: POST: result", result);
                        return res.status(200).json(result);
                    })
                    .catch((err) => {
                        console.log("Error: ", err);
                        return res.status(500).send(`${err}`);
                    });

                });
            } catch (err) {
                console.log("Error: ", err);
                return res.status(500).send("Error reading file");
            }
            break;
        // case "PUT":
        //     try {
        //         const moduleName = `../pages/api/${dbSchemaName}/${entityName}.${method}.ts`;
        //         // console.log("API: moduleName", moduleName);
        //         try{
        //             const module = await import(moduleName);
        //         } catch (err) {
        //             console.error("Error from import module for PUT method: ", err);
        //         }

        //         const entity = dbSchema[entityName];
        //         const reqBody = req.body;
        //         const id = reqBody.Id;
        //         const result = await db.update(entity).set(reqBody).where(eq(entity.Id, id)).returning();
                
        //         console.log("API: Method: PUT:  result", result);

        //         if(result.length > 0) {
        //             return res.status(200).json(result[0]);
        //         }
        //         return res.status(200).send({});

        //     } catch (err) {
        //         console.error("Error: ", err);
        //         return res.status(500).send("Error reading file");
        //     }
        //     //     // console.log("API: module", module);
        //     //     return res.status(200).json({message: "Hello from Save entity item PUT method routine import"});                
        //     //     import(moduleName)
        //     //     .then((module) => {
        //     //         // console.log("API: module", module);
        //     //         return res.status(200).json({message: "Hello from Save entity item PUT method routine import"});
        //     //     }).catch((err) => {
        //     //         console.error("Error from import module for PUT method: ", err);

        //     //         // Standard PUT method
        //     //         const entity = dbSchema[entityName];
        //     //         // console.log("API: entity", entity);
        //     //         const reqBody = req.body;
        //     //         const id = reqBody.Id;
        //     //         let updateData = {}
                    
        //     //         db.update(entity).set(reqBody).where(eq(entity.Id, id)).returning()
        //     //             .then((result) => {
        //     //                 console.log("API: Method: PUT:  req.body", reqBody);
        //     //                 console.log("API: Method: PUT:  result", result);
        //     //                 if(result.length > 0) {
        //     //                     return res.status(200).json(result[0]);
        //     //                 }
        //     //                 return res.status(200).send({});
        //     //             }).catch((err) => {
        //     //                 console.error("Error: ", err);
        //     //                 return res.status(500).send(`Error updating entity ${entityName} with id ${id} -> ${err}`);
        //     //             });
        //     //     });
        //     // } catch (err) {
        //     //     console.error("Error: ", err);
        //     //     return res.status(500).send("Error reading file");
        //     // }
        
        // case "DELETE":
        //     try {
        //         const moduleName = `../pages/api/${dbSchemaName}/${entityName}.${method}.ts`;
        //         // console.log("API: moduleName", moduleName);
        //         import(moduleName)
        //         .then((module) => {
        //             console.log("API: module", module);
        //             console.log("Not implemented yet");
        //             // TODO: Custom processing
        //             return res.status(200).json({message: "Hello from Save entity item DELETE method routine import"});
        //         }).catch((err) => {
        //             console.error("Error from import module for DELETE method: ", err);

        //             // Standard DELETE method
        //             const entity = dbSchema[entityName];
        //             // console.log("API: entity", entity);
        //             const id = req.body.Id;
        //             db.delete(entity).where(eq(entity.Id, id)).returning()
        //                 .then((result) => {
        //                     console.log("API: result", result);
        //                     if(result.length > 0) {
        //                         return res.status(200).json(result[0]);
        //                     }
        //                     return res.status(200).send({});
        //                 })
        //                 .catch((err) => {
        //                     console.error("Error: ", err);
        //                     return res.status(500).send(`${err}`);
        //                 });
        //         });
        //     } catch (err) {
        //         console.error("Error: ", err);
        //         return res.status(500).send(`${err}`);
        //     }

    }
}