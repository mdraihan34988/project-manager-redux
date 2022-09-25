import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import { userLoggedOut } from "../../features/auth/authSlice";
import getAvatar from "gravatar-url";
import { changeText } from "../../features/filter/filterSlice";
import { apiSlice } from "../../features/api/apiSlice";
import debounce from "../../utils/debounce";
import { selectAuthenticatedUser } from "../../features/auth/authSelectors";

function Navbar() {
  const { user } = useSelector(selectAuthenticatedUser) || {};
  const [dropdown,setDropdown] = useState(true);

  const toggoleDropdown = () => {
    setDropdown((prevState) => !prevState);
  }

  const dispatch = useDispatch();
  const match = useMatch("/projects");

  const logout = () => {
    dispatch(userLoggedOut());
    dispatch(apiSlice.util.resetApiState());
    localStorage.clear();
  };

  const handleInputChange = debounce(
    (value) => dispatch(changeText(value)),
    500
  );

  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <Link to="/">
        <img src={logoImage} className="h-10 w-10" alt="logo" />
      </Link>
      {match && (
        <input
          className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
          type="search"
          placeholder="Search for anything…"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
      <div className="ml-10">
        <Link
          className={`mx-2 text-sm font-semibold ${
            match ? "text-indigo-700" : "text-gray-600 hover:text-indigo-700"
          }`}
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className={`mx-2 text-sm font-semibold ${
            !match ? "text-indigo-700" : "text-gray-600 hover:text-indigo-700"
          }`}
          to="/teams"
        >
          Team
        </Link>
      </div>
      <button type="button" className="peer flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer" onClick={toggoleDropdown}>
        <img
          // src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
          src={getAvatar(user.email, {
            size: 80,
          })}
          alt="Profile"
        />
      </button>
      <div className={`absolute ${dropdown && "hidden"} peer-hover:flex hover:flex right-11 z-10 w-50 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`} style={{top : '48px'}}>
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white drop-shadow-lg">
          <div>{user?.name}</div>
          <div className="pb-2 font-medium truncate">{user?.email}</div>
          <hr/>
          <div className="py-2 flex" onClick={logout}>
              <svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
            <span className="mx-1 pt-1 cursor-pointer">Sign out</span>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
