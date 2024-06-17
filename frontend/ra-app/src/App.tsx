import { Admin, Resource } from "react-admin";
import {UserList, UserEdit} from "./components/userList";
import dataProvider from "./dataProvider";
import { LogEdit, LogList } from "./components/logList";

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            {/* <Resource name="posts" list={PostList} /> */}
            <Resource name="users" list={UserList} edit={UserEdit}/>
            <Resource name="restaurants" list={UserList} edit={UserEdit}/>
            <Resource name="order" list={UserList} edit={UserEdit}/>
            <Resource name="log" list={LogList} edit={LogEdit}/>
        </Admin>
    );
}

export default App;
