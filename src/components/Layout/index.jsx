import React from "react";
import PropTypes from "prop-types";
import s from "./Layout.module.scss";
import Header from "../Header";

const propType = {
  children: PropTypes.node.isRequired,
  setSearch: PropTypes.func
};

const Layout = ({ children, setSearch }) => {
  return (
    <div className={s.root}>
      <Header handleSearch={setSearch} />
      <div className={s.child}>{children}</div>
    </div>
  );
};

Layout.propType = propType;
export default Layout;
