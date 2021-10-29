import React from "react";
import "../css/DropdownMenu.css";

const CategoryLink = ({ categorySlug }) => {
  return (
    <li key={categorySlug}>
      <a href={`/categories/${categorySlug}`} className="dropdown__a">
        {categorySlug.replaceAll("-", " ").toUpperCase()}
      </a>
    </li>
  );
};

export default CategoryLink;
