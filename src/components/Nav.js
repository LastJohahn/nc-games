import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";

const Nav = ({ categories }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  // categories as drop down, just map over them below & get them in there
  // then buttons that redirect there, however that worked
  // then integrate drop down menu functionality

  const userInitials = (user) => {
    const fullName = user.name.split(" ");
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
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
      {categories.map((category) => {
        return (
          <button>{category.slug.replaceAll("-", " ").toUpperCase()}</button>
        );
      })}
      <div className="nav nav__user">
        {" "}
        <img src={user.avatar_url} />
        <span>{userInitials(user)}</span>
        <br />
        <span>{user.username}</span>
      </div>
    </nav>
  );
};

export default Nav;
