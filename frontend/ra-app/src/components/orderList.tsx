import { FunctionComponent } from "react";
import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    EditButton,
    DeleteButton,
    SelectInput,
} from "react-admin";

const filters = [
    <SelectInput
    label="Status"
    alwaysOn
                source="status"
                choices={[
                    { id: "pending", name: "pending" },
                    { id: "validated", name: "validated" },
                    { id: "pending delivery", name: "pending delivery" },
                    { id: "delivery", name: "delivery" },
                    { id: "delivered", name: "delivered" },
                    { id: "completed", name: "completed" },
                    { id: "cancelled", name: "cancelled" },
                    { id: "revoke", name: "revoke" }
                ]}
            />,
    <TextInput label="Id" source="id" />,
    <TextInput label="User Id" source="user_id" />,
    <TextInput label="Restaurant Id" source="restaurant_id" />,
    <TextInput label="Address Id" source="address_id" />,
    <TextInput label="Total price" source="total_price" />
];

export const OrderList = (props: any) => {
    return (
        <List filters={filters} {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="status" />
                <TextField source="Restaurant.name" />
                <TextField source="restaurant_id" />
                <TextField source="User.username" />
                <TextField source="user_id" />
                <TextField source="Address.street" />
                <TextField source="address_id" />
                <TextField source="total_price" />

                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export const OrderEdit: FunctionComponent<any> = (props: any) => (
    <Edit title="Edit" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="Restaurant.name" />
            <TextInput disabled source="User.username" />
            <TextInput disabled source="Address.street" />
            <SelectInput
                source="status"
                choices={[
                    { id: "pending", name: "pending" },
                    { id: "validated", name: "validated" },
                    { id: "pending delivery", name: "pending delivery" },
                    { id: "delivery", name: "delivery" },
                    { id: "delivered", name: "delivered" },
                    { id: "completed", name: "completed" },
                    { id: "cancelled", name: "cancelled" },
                    { id: "revoke", name: "revoke" }
                ]}
            />
        </SimpleForm>
    </Edit>
);
