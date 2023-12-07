// ScrollToButton.jsx

import React from "react";

import { scrollTo } from "../../scrollTo";

const ScrollToButton = ({ toId, children }) => {
  const handleClick = () => scrollTo({ id: toId});

  return <a onClick={handleClick} className="nav-elem">{children}</a>;
};

export default ScrollToButton;
