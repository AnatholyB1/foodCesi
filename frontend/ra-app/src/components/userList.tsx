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
} from "react-admin";

// const filters = [
//   <SearchInput label="Rechercher" source="q" alwaysOn />,
//   <TextInput label="Type" source="type" defaultValue="user" />,
//   <TextInput label="username" source="username" defaultValue="test" />
// ];


export const UserList = (props: any) => {
    return (
        <List  {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="email" />
                <TextField source="username" />
                <TextField source="type" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />

                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export const UserEdit :FunctionComponent<any> = (props: any) => 
    <Edit title="oui" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="email" type={"email"}/>

            <TextInput source="username" />
            <SelectInput source="type" choices={[{id:"user", name:"user"}, {id:"delivery", name:"delivery"}, {id:"restaurant", name:"restaurant"}, {id:"developer", name:"developer"}]} />
        </SimpleForm>
    </Edit>;
