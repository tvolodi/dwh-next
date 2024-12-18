import "dotenv/config";
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from 'mysql2/promise';
import * as hrDbSchema from "../../oltp_db/hr_schema.js";
import * as hrDbRelations from "../../oltp_db/hr_relations.js";
import * as inventoryDbSchema from "../../oltp_db/inventory_schema.js";
import * as inventoryDbRelations from "../../oltp_db/inventory_relations.js";
import * as infrastructureDbSchema from "../../oltp_db/infrastructure_schema.js";
import * as infrastructureDbRelations from "../../oltp_db/infrastructure_relations.js";
import * as docworkflowDbSchema from "../../oltp_db/docworkflow_schema.js";
import * as docworkflowDbRelations from "../../oltp_db/docworkflow_relations.js";
import * as trackingDbSchema from "../../oltp_db/tracking_schema.js";
import * as trackingDbRelations from "../../oltp_db/tracking_relations.js";
import * as iotDbSchema from "../../oltp_db/iot_schema.js";
import * as iotDbRelations from "../../oltp_db/iot_relations.js";

const mysqlHRConnection = await mysql.createConnection(process.env.HR_DATABASE_URL);

const commonHrSchema = {
    ...hrDbSchema,
    ...hrDbRelations
};

export const hrMysqlDb = drizzle({
    client: mysqlHRConnection,
    schema: commonHrSchema
  }
);

const mysqlInventoryConnection = await mysql.createConnection(process.env.INVENTORY_DATABASE_URL);
const commonInventorySchema = {
    ...inventoryDbSchema,
    ...inventoryDbRelations
};
export const inventoryMysqlDb = drzille({
    client: mysqlInventoryConnection,
    schema: commonInventorySchema
  }
);

const mysqlInfrastructureConnection = await mysql.createConnection(process.env.INFRASTRUCTURE_DATABASE_URL);
const commonInfrastructureSchema = {
    ...infrastructureDbSchema,
    ...infrastructureDbRelations
};
export const infrastructureMysqlDb = drizzle({
    client: mysqlInfrastructureConnection,
    schema: commonInfrastructureSchema
  }
);

const mysqlDocworkflowConnection = await mysql.createConnection(process.env.DOCWORKFLOW_DATABASE_URL);
const commonDocworkflowSchema = {
    ...docworkflowDbSchema,
    ...docworkflowDbRelations
};
export const docworkflowMysqlDb = drizzle({
    client: mysqlDocworkflowConnection,
    schema: commonDocworkflowSchema
  }
);

const mysqlTrackingConnection = await mysql.createConnection(process.env.TRACKING_DATABASE_URL);
const commonTrackingSchema = {
    ...trackingDbSchema,
    ...trackingDbRelations
};
export const trackingMysqlDb = drizzle({
    client: mysqlTrackingConnection,
    schema: commonTrackingSchema
  }
);

const mysqlIotConnection = await mysql.createConnection(process.env.IOT_DATABASE_URL);
const commonIotSchema = {
    ...iotDbSchema,
    ...iotDbRelations
};
export const iotMysqlDb = drizzle({
    client: mysqlIotConnection,
    schema: commonIotSchema
  }
);
