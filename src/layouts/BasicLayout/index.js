import Center from "@/widgets/General/Center";
import Top from "@/widgets/General/Top";
import Left from "@/widgets/General/Left";
import UserContext from "@/context";
import { useState } from "react";

export default function BasicLayout({ children, filters, filterUpdate }) {
  return (
    <UserContext.Consumer>
      {(value) => {
        console.log(value);
        return (
          <>
            <Top />
            <Left filters={filters} filterUpdate={filterUpdate} />
            <Center>{children}</Center>
          </>
        );
      }}
    </UserContext.Consumer>
  );
}
