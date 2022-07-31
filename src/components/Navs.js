import React from "react";
import {useLocation} from "react-router-dom"
import {NavList,LinkStyled} from "./Navs.styled"

const Navs = () => {
  const LINKS = [
    { to: "/", text: "Home Page" },
    { to: "/starred", text: "This is Starred Page" },
  ];
  const {pathname} = useLocation();
  return (
    <div>
      <NavList>
        {LINKS.map((item) => {
          return (
            <li key={item.to}>
              <LinkStyled className={item.to===pathname?'active':''} to={item.to}>{item.text}</LinkStyled>
            </li>
          );
        })}
      </NavList>
    </div>
  );
};

export default Navs;
