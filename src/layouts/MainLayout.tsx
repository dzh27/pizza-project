import { FC } from "react";
import Header from "../components/header";
import { type } from "@testing-library/user-event/dist/type";

type ChildrenProps = {
  children: any;
};

const MainLayout: FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">{children}</div>;
    </div>
  );
};

export default MainLayout;
