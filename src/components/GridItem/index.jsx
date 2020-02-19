import React from "react";
import PropTypes from "prop-types";
import s from "./GridItem.module.scss";
import ModalImage from "react-modal-image";

const propTypes = {
  data: PropTypes.node.isRequired
};

const defaultProps = {
  data: "test"
};

const GridItem = ({ data }) => (
  <div className={s.root}>
    <div className={s.container}>
      <ModalImage small={data} large={data} className={s.img} />
    </div>
  </div>
);

GridItem.defaultProps = defaultProps;
GridItem.propTypes = propTypes;
export default GridItem;
