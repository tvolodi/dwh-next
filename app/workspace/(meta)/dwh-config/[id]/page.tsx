'use client'

import { Button } from '@/components/ui/button';
import Form from 'next/form';

import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { person } from '@jsonforms/examples';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

export default function Page({
    params,
} : {
    params: {
        id: string;
        name: string;
    }
})
 {

    // Id       Int   Id       Int    @id @default(autoincrement())
    // Code    String @unique
    // Name    String?
    // ParamValue String?
    // ExtendedValue Json?
    // Notes   String?

    const formSchema = {
        type: "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "code": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "paramValue": {
                "type": "string"
            },
            "extendedValue": {
                "type": "object",
                "properties": {
                    "key": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                }
            },
            "notes": {
                "type": "string"
            }

        }
    }

    const formUISchema = {
        "type": "VerticalLayout",
        "elements": [
            {
                "type": "Control",
                "scope": "#/properties/id"
            },
            {
                "type": "Control",
                "scope": "#/properties/code"
            },
            {
                "type": "Control",
                "scope": "#/properties/name"
            },
            {
                "type": "Control",
                "scope": "#/properties/paramValue"
            },
            {
                "type": "Control",
                "scope": "#/properties/extendedValue"
            },
            {
                "type": "Control",
                "scope": "#/properties/notes"
            }
        ]
    }

    const formData = {
        "id": 1,
        "code": "code 1",
        "name": "name 1",
        "paramValue": "param1 Value",
        "extendedValue": "extended Value 1",
        "notes": "notes 1"
    }

    const schema = formSchema; // person.schema;
    const uischema = formUISchema; // person.uischema;
    const data = formData; //  person.data;

    console.log('Schema: ', schema);
    console.log('UISchema: ', uischema);
    console.log('Data: ', data);

    return (
        <div>
            <Form action={""}>
                <div className='card flex justify-content-center'>
                    <FloatLabel>
                        <InputText id="id" value={"1"}/>
                        <label htmlFor="id">ID</label>                    
                    </FloatLabel>
                    <FloatLabel>
                        <InputText id="name" value={"John"}/>
                        <label htmlFor="name">Name</label>
                    </FloatLabel>
                </div>
                <button type="submit" className="p-mt-2"/>
            </Form>
            <JsonForms 
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({data, errors}) => console.log('Data: ', data, 'Errors: ', errors)}
            />
        </div>
    );
}