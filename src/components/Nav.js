import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";

const Nav = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const userInitials = (user) => {
    const fullName = user.name.split(" ");
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  };
  console.log(user);
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
      <div>
        {" "}
        <img src={user.avatar_url} />
        <span>{userInitials(user)}</span>
      </div>
    </nav>
  );
};

export default Nav;

// home button
// categories as drop down
// logged in user w letter in nav
