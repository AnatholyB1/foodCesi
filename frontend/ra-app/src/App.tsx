import "./App.css";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import PostList from "./components/PostList";
import UserList from "./components/User/userList";

function App() {
    return (
        <Admin dataProvider={restProvider("http://localhost:5173/api/")}>
            <Resource name="posts" list={PostList} />
            <Resource name="users" list={UserList} />
        </Admin>
    );
}

export default App;
