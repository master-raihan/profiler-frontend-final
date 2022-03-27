import React from "react";
import Paperbase from "../../components/admin/Paperbase";
import { useLocation } from "react-router-dom";
import Content from "../../components/pages/User/Content";

export default function User() {
  const location = useLocation();
  const title = location ? location.pathname.replace(/\//g, "") : "";
  return (
    <Paperbase location={location} title={title}>
      <Content />
    </Paperbase>
  );
}
