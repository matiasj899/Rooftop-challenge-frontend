import React from "react";
import {  NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header id="header-cn">
      <div className="logo-cn">
        <img src="./images/rooftop-logo@2x.webp" alt="logo"></img>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              activeStyle={{
                borderBottom: "2px solid #252525",
              }}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalogo"
              activeStyle={{
                borderBottom: "2px solid #252525",
              }}
            >
              Catalogo
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
