import { Layout } from "react-admin";
import { ReactNode } from "react";
import { MyMenu } from "./MyMenu";

export const MyLayout = ({ children }: { children?: ReactNode }) => (
  <Layout menu={MyMenu}>{children}</Layout>
);
