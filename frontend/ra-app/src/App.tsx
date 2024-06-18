import { Admin, Resource } from "react-admin";
import {UserList, UserEdit} from "./components/userList";
import dataProvider from "./dataProvider";
import { LogList } from "./components/logList";
import { RestaurantEdit, RestaurantList } from "./components/restaurantList";
import { OrderEdit, OrderList } from "./components/orderList";

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} edit={UserEdit}/>
            <Resource name="restaurants" list={RestaurantList} edit={RestaurantEdit}/>
            <Resource name="order" list={OrderList} edit={OrderEdit}/>
            <Resource name="log" list={LogList} />
        </Admin>
    );
}

export default App;
