import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";
import DropdownMenu from "./DropdownMenu";

const Nav = ({ categories }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const routeChangePostReview = () => {
    let path = "/post-review";
    history.push(path);
  };

  const routeChangeUser = (username) => {
    let path = `/users/${username}`;
    history.push(path);
  };

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
      <DropdownMenu categories={categories} />
      <div className="nav nav__user">
        {" "}
        <img src={user.avatar_url} alt="user avatar" />
        <button
          className="nav nav__userButton"
          onClick={() => {
            routeChangeUser(user.username);
          }}
        >
          {userInitials(user)}
        </button>
      </div>
      <div className="nav nav__postReview">
        <button
          className="nav nav__postReviewButton"
          onClick={() => {
            routeChangePostReview();
          }}
        >
          POST NEW REVIEW
        </button>
      </div>
    </nav>
  );
};

export default Nav;
