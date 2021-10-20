import React, { useState } from "react";
import CategoryLink from "./CategoryLink";
import "../css/DropdownMenu.css";

const DropdownMenu = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        className={`button${isOpen ? "--open" : ""}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        CATEGORIES
      </button>
      <div className={`dropdown__content--${isOpen ? "open" : "closed"}`}>
        <ul>
          {categories.map((category) => {
            return <CategoryLink categorySlug={category.slug} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
