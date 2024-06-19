import { Menu } from "react-admin";

export const MyMenu = () => (
  <Menu>
    <Menu.ResourceItems />
    <Menu.Item
      to="/stats"
      primaryText="Statistiques"
    />
  </Menu>
);
