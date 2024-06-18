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
    CheckboxGroupInput,
} from "react-admin";

const filters = [
    <TextInput label="Username" source="username" alwaysOn />,
    <SelectInput
        label="Type"
        source="type"
        choices={[
            { id: "user", name: "user" },
            { id: "delivery", name: "delivery" },
            { id: "restaurant", name: "restaurant" },
            { id: "developer", name: "developer" },
        ]}
        alwaysOn
    />,
    <SelectInput
        source="active"
        choices={[
            { id: "true", name: "true" },
            { id: "false", name: "false" },
        ]}
        alwaysOn
    />,

    <TextInput label="Id" source="id" />,
    <TextInput label="Email" source="email" />,
];

export const UserList = (props: any) => {
    return (
        <List filters={filters} {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="email" />
                <TextField source="username" />
                <TextField source="type" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
                <TextField source="active" />

                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export const UserEdit: FunctionComponent<any> = (props: any) => (
    <Edit title="Edit" {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="email" type={"email"} />

            <TextInput source="username" />
            <SelectInput
                source="type"
                choices={[
                    { id: "user", name: "user" },
                    { id: "delivery", name: "delivery" },
                    { id: "restaurant", name: "restaurant" },
                    { id: "developer", name: "developer" },
                ]}
            />
            <SelectInput
                source="active"
                choices={[
                    { id: "true", name: "true" },
                    { id: "false", name: "false" },
                ]}
            />
        </SimpleForm>
    </Edit>
);
