import React from "react";
import PropTypes from "prop-types";
import s from "./Title.module.scss";

const propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  className: PropTypes.string
};

const defaultProps = {
  theme: "h4",
  className: ""
};

const Title = ({ children, theme: Component, className }) => (
  <Component className={[s.root, s[Component], className].join(" ")}>
    {children}
  </Component>
);

Title.defaultProps = defaultProps;
Title.propTypes = propTypes;
export default Title;
