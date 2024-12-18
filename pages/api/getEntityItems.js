import { db } from '@/lib/db/drizzle';
import { eq, like, ilike, or } from "drizzle-orm";

import * as dbSchema from '@/lib/schemas/pg_db/schema';
import { meta_Module } from '@/lib/schemas/pg_db/schema';

/// Service handler to process DB requests
/// @param req - request object
// const req = {
//     query: {
//         fullEntityName: "meta_Entity"
//     },
//     body: {
//         columns: ["Id", "Code", "Name", "Module.Name", "Notes"],
//         include: ["meta_Module"],
//         filter: {
//             globalStringFilter: "test",
//             columnFilters: [
//                 {
//                     column: "Name",
//                     filter: "like",
//                     value: "test"
//                 },
//                 {
//                     column: "Code",
//                     filter: "eq",
//                     value: "test"
//                 }
//             ]
//         },
//         sort: [{column: "Name", order: "asc"}, {column: "Code", order: "desc"}],
//         page: 1,
//         pageSize: 10
//     }
// }

/// @param res - response object


export default async function handler(req, res) {
    console.log("API: hello from processEntityItem");
    console.log("API: req.query: ", req.query);
    console.log("API: req.body: ", req.body);


    // const Module = dbSchema['meta_Module'];
    // console.log(`Module:`, Module);

    // const withObject = {}
    // withObject['Module'] = true;
    // const optionsObject = {};
    // optionsObject['with'] = withObject;

    // const qResult = await db.query.meta_Entity.findMany(optionsObject);
    // console.log(`=================`)
    // console.log("API: dbResult 1: ", qResult);
    // console.log(`=================`)


    // return res.status(200).json(qResult);

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
        console.log(`Error with import custom module ${entityName} for ${method} method. Standard processing will be used.`);
        // Custom processing is absent. Continue with standard processing
    }

    const entity = dbSchema[fullEntityName];
  
    switch (method) {
        case "GET":

            try{
                const qResult = await db.query[fullEntityName].findMany({
                    with: {}
                });
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
                    for (let i=0; i<include.length; i++) {
                        let refEntityName = include[i];
                        if(refEntityName.includes('_')){
                            refEntityName = refEntityName.split("_")[1];
                        } 
                        includeReferences[refEntityName] = true;
                    }
                }

                if (!columns) {
                    columns = "*";
                }
                if (!filter) {
                    filter = {};
                    filter.where = {};
                } else {

                    let searchString = filter.globalSearchString;
                    let searchExpressionArr = [];
                    if (searchString) {                        
                        Object.keys(entity).forEach((key) => {
                            if (entity[key].dataType === "string") {
                                const filterExpression = ilike(entity[key], `%${searchString}%`);
                                searchExpressionArr.push(filterExpression);
                            }
                        })
                    }
                    filter.where = or(...searchExpressionArr);                    
                }

                console.log(`filter:`, filter);

                if (!sort) {
                    sort = {};
                }
                if (!page) {
                    page = 1;
                }
                if (!pageSize) {
                    pageSize = 10;
                }

                console.log(`includeReferences:`, includeReferences);

                const qResult = await db.query[fullEntityName].findMany({
                   with: includeReferences,
                   where: filter.where,
                });


                // ({
                //     with: {
                //         Module: true
                //     },
                // });
                console.log(`=================`)
                console.log("API: dbResult: ", qResult);
                console.log(`=================`)
                if (qResult.length > 0) {
                    return res.status(200).json(qResult);
                }
                return res.status(200).json([{}]);
            } catch (err) {
                console.error("Error: ", err);
                return res.status(500).send(`Error to get entity list for ${entityName} -> `, err);
            }
            break;

    }
}