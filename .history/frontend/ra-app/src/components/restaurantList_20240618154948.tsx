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
} from "react-admin";

const filters = [
    <TextInput label="Name" source="name" alwaysOn />,
    <TextInput label="Id" source="id" />,
    <TextInput label="Phone number" source="phone_number" />,
];

export const RestaurantList = (props: any) => {
    return (
        <List filters={filters} {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="user_id" />
                <TextField source="address_id" />
                <TextField source="phone_number" />
                <DateField source="created_at" />
                <DateField source="updated_at" />
                <TextField source="Address" />
                
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export const RestaurantEdit: FunctionComponent<any> = (props: any) => (
    <Edit title="Edit" {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
            <TextInput source="user_id" disabled />
            <TextInput source="address_id" disabled />
            <TextInput source="phone_number" />
           
        </SimpleForm>
    </Edit>
);
