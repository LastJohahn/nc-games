import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";
import DropdownMenu from "./DropdownMenu";
import "../css/Nav.css";

const Nav = ({ categories }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);

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

  return (
    <nav className="navbar">
      <button
        className="button"
        onClick={() => {
          routeChange();
        }}
      >
        HOME
      </button>
      <DropdownMenu categories={categories} />
      <div className="nav nav__postReview">
        <button
          className="button"
          onClick={() => {
            routeChangePostReview();
          }}
        >
          POST
        </button>
      </div>
      <img
        className="userAvatar"
        src={user.avatar_url}
        alt="user avatar"
        onClick={() => {
          routeChangeUser(user.username);
        }}
      ></img>
    </nav>
  );
};

export default Nav;
