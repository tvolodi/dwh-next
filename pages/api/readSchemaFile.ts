import type { NextApiRequest, NextApiResponse } from "next";
import  fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API: hello from readFile");
    console.log("API: req.query: ", req.query);
    const dbSchema = req.query.dbschema;
    const entity = req.query.entity;
    const type = req.query.type;

    const method = req.method;
    switch (method) {
        case "GET":
            try {
                //const data = await fs.promises.readFile(`./lib/schemas/${dbSchema}/${entity}.${type}.js`, "utf8");
                //return res.status(200).json(JSON.parse(data));
                return res.status(200).json({message: "Hello from readFile"});
            } catch (err) {
                console.error("Error: ", err);
                return res.status(500).send("Error reading file");
            }
        }
}