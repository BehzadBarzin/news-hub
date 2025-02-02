import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import { useAuth } from "../context/AuthContext";
import RegisterDialog from "./RegisterDialog";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const { showLoading, hideLoading, showToast } = useAppContext();

  const { data: userData, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <nav className="navbar bg-base-100 shadow-lg fixed z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-xl dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/headlines">
                <div className="inline-grid *:[grid-area:1/1]">
                  <div className="status status-success animate-ping"></div>
                  <div className="status status-success"></div>
                </div>{" "}
                Headlines
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          NewsHub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/headlines" className="font-bold bg-base-200/50">
              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-success animate-ping"></div>
                <div className="status status-success"></div>
              </div>
              Headlines
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      {/* Navbar End */}
      <div className="navbar-end">
        {userData ? (
          // User
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="menu-disabled flex items-center">
                <p className="text-primary font-bold text-lg">
                  {userData?.user?.name}
                </p>
              </li>
              <li>
                <Link to="/personal-feeds" className="justify-between">
                  Personal Feeds
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <button
                  className="text-red-400"
                  onClick={async () => {
                    showLoading();
                    await logout();
                    showToast("Logged out!");
                    hideLoading();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // Guest
          <div className="flex gap-1">
            <button
              className="btn btn-soft btn-primary"
              onClick={() => {
                setIsLoginOpen(true);
              }}
            >
              Login
            </button>
            <button
              className="btn btn-soft btn-secondary"
              onClick={() => {
                setIsRegisterOpen(true);
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterDialog
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
