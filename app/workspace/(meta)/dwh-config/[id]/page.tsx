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

    const formSchema = {
        "properties": {
            "id": {
                "type": "string"
            },
            "name": {
                "type": "string"
            }
        }
    }

    const schema = person.schema;
    const uischema = person.uischema;
    const data = person.data;

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