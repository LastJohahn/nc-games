import React from "react";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <nav className="nav">
      <button
        className="nav nav__homeButton"
        onClick={() => {
          routeChange();
        }}
      >
        HOME
      </button>
    </nav>
  );
};

export default Nav;

// home button
// categories as drop down
// logged in user w letter in nav
