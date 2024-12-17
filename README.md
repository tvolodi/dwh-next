## This application is for ETL management in DWH systems 
### (+ try new js+react+next.js technologies (for me at least))

## How it works
### Main concepts:
1. JS as basis - accent mainly on GUI. DB processing is mainly on DB server and can be put into separate node.js processes. Plus JS is dynamic and it is simpler to design flexible code without tonns of abstraction layers.
1. Usage of VC IDE for application object design. Many objects are described in js files and not in DB tables, where they are not accessable to Visual Code.
1. Extensive usage of js files instead of json to use VC navigation to external objects from IDE.
1. Include js descriptions as source code into the application core hooks.
1. As a result DB schema is described as ORM schema but not in the DB tables (as Table, Attribute tables)
1. Prefer JS to TS. Simpler realization for dynamic code.
1. Development consists of two fase: development -> delivery. No development in production! It sounds good but in real life no one serious project developing in production.

As a result: the application has a core and a bunch of settings in js, json and DB files. Usually it is some schema.

Where schemas uses:
1. Main side menu.
2. Database table descriptions.(drizzle ORM).
3. Datagrid description: [entity].list.js
4. Element details panel: jsonform (https://jsonforms.io/)
4.1. [entity].details.js - data description
4.2. [entity].detailsUi.js - UI description

## Schemas description
### ENTITY.list.js

### ENTITY.details.js

### ENTITY.detailsUi.js


## Start development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


