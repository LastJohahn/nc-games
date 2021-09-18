import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/User";

const Nav = ({ categories }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  const routeChangeCategory = (category) => {
    let path = `/categories/${category}`;
    history.push(path);
  };

  const routeChangePostReview = () => {
    let path = "/post-review";
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
      <button
        className="nav nav__categoryDropDownButton"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        CATEGORIES
      </button>
      {isOpen ? (
        <div className="nav nav__categoryButtons">
          {categories.map((category) => {
            return (
              <button
                onClick={() => {
                  routeChangeCategory(category.slug);
                }}
                key={category.slug}
              >
                {category.slug.replaceAll("-", " ").toUpperCase()}
              </button>
            );
          })}
        </div>
      ) : (
        <p></p>
      )}
      <div className="nav nav__user">
        {" "}
        <img src={user.avatar_url} alt="user avatar" />
        <span>{userInitials(user)}</span>
        <br />
        <Link to={`/users/${user.username}`}>
          <span>{user.username}</span>
        </Link>
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
