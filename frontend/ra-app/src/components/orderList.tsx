import { FunctionComponent, useEffect, useState } from "react";
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
    useDataProvider,
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
            { id: "revoke", name: "revoke" },
        ]}
    />,
    <TextInput label="Id" source="id" />,
    <TextInput label="User Id" source="user_id" />,
    <TextInput label="Restaurant Id" source="restaurant_id" />,
    <TextInput label="Address Id" source="address_id" />,
    <TextInput label="Total price" source="total_price" />,
];

export const OrderList = (props: any) => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [pendingRevenue, setPendingRevenue] = useState(0);
    const dataProvider = useDataProvider();

    useEffect(() => {
        // Fetch all orders
        dataProvider.getList('order', {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'id', order: 'ASC' },
            filter: {},
        }).then(({ data }) => {
            const totalRevenue = data.filter(order => order.status == 'completed').reduce((sum, order) => sum + order.total_price, 0);
            const pendingRevenue = data
                .filter(order => order.status != 'completed' && order.status != 'cancelled' && order.status != 'revoke')
                .reduce((sum, order) => sum + order.total_price, 0);
            setTotalRevenue(totalRevenue);
            setPendingRevenue(pendingRevenue);
        }).catch(error => {
            console.error("Error fetching orders:", error);
        });
    }, [dataProvider]);
    
    return (
        <div>
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
            Chiffre d'affaires global : {totalRevenue} €
            <br />
            Chiffre d'affaires transactionnel global en cours : {pendingRevenue} €
        </div>
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
                    { id: "revoke", name: "revoke" },
                ]}
            />
        </SimpleForm>
    </Edit>
);
