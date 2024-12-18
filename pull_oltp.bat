call npx drizzle-kit pull --config=drizzle.config.hr.ts
move oltp_db\schema.ts oltp_db\hr_schema.ts
move oltp_db\relations.ts oltp_db\hr_relations.ts

call npx drizzle-kit pull --config=drizzle.config.docworkflow.ts
move oltp_db\schema.ts oltp_db\docworkflow_schema.ts
move oltp_db\relations.ts oltp_db\docworkflow_relations.ts

call npx drizzle-kit pull --config=drizzle.config.infrastructure.ts
move oltp_db\schema.ts oltp_db\infrastructure_schema.ts
move oltp_db\relations.ts oltp_db\infrastructure_relations.ts

call npx drizzle-kit pull --config=drizzle.config.inventory.ts
move oltp_db\schema.ts oltp_db\inventory_schema.ts
move oltp_db\relations.ts oltp_db\inventory_relations.ts

call npx drizzle-kit pull --config=drizzle.config.iot.ts
move oltp_db\schema.ts oltp_db\iot_schema.ts
move oltp_db\relations.ts oltp_db\iot_relations.ts

call npx drizzle-kit pull --config=drizzle.config.tracking.ts
move oltp_db\schema.ts oltp_db\tracking_schema.ts
move oltp_db\relations.ts oltp_db\tracking_relations.ts

