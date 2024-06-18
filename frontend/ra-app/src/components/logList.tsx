import {
    List,
    Datagrid,
    TextField,
    TextInput,
} from "react-admin";

const filters = [
<TextInput label="Message" source="message" alwaysOn />,
<TextInput label="Id" source="id"  />,
<TextInput label="Log_connexion" source="message" defaultValue="result login: 200 OK"/>
];

export const LogList = (props: any) => {
    return (
        <List filters={filters} {...props}>
            <Datagrid>
                <TextField source="_id" />
                <TextField source="message" />
                <TextField source="level" />
                <TextField source="timestamp" />
            </Datagrid>
        </List>
    );
};
