import { FunctionComponent } from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Pagination,
} from "react-admin";


export const LogList = (props: any) => {
    return (
        <List  {...props}>
            <Datagrid>
                <TextField source="_id" />
                <TextField source="message" />
                <TextField source="level" />
                <TextField source="timestamp" />
            </Datagrid>
        </List>
    );
};

export const LogEdit :FunctionComponent<any> = (props: any) => 
    <Edit title="oui" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="email" type={"email"}/>

            <TextInput source="username" />
            <SelectInput source="type" choices={[{id:"user", name:"user"}, {id:"delivery", name:"delivery"}, {id:"restaurant", name:"restaurant"}, {id:"developer", name:"developer"}]} />
        </SimpleForm>
    </Edit>;
