import { Admin, CustomRoutes, Resource } from "react-admin";
import { UserList, UserEdit } from "./components/userList";
import dataProvider from "./dataProvider";
import { LogList } from "./components/logList";
import { RestaurantEdit, RestaurantList } from "./components/restaurantList";
import { OrderEdit, OrderList } from "./components/orderList";
import { StatMongoDbList } from "./components/statList";
import { Route } from "react-router-dom";
import { MyLayout } from "./layout/MyLayout";

function App() {
    return (
        <Admin dataProvider={dataProvider} layout={MyLayout}>
            <Resource name="users" list={UserList} edit={UserEdit} />
            <Resource
                name="restaurants"
                list={RestaurantList}
                edit={RestaurantEdit}
            />
            <Resource name="order" list={OrderList} edit={OrderEdit} />
            <Resource name="log" list={LogList} />
            <CustomRoutes >
                <Route path="/stats" element={<StatMongoDbList />} />
            </CustomRoutes>
        </Admin>
    );
}

export default App;
