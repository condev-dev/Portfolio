import "./index.css";
import React from "react";

const Content = ({ children }) => {
  return <section className="m-container">{children}</section>;
};

export default React.memo(Content);
