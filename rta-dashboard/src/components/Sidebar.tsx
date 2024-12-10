import { NavLink } from "react-router-dom";
import logo from "../assets/logo_white.png";
import { useStore } from "../store";

const Sidebar = () => {
  const user = useStore((state) => state);
  const resetAuth = useStore((state) => state.resetAuth);
  const resetMetrics = useStore((state) => state.resetMetrics);
  const resetUsers = useStore((state) => state.resetUsers);
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-gray-800">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img src={logo} className="mx-auto h-15 w-auto pb-4" />
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  "" + (isActive && "active-navlink")
                }
              >
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-blue-gray-600 group hover:text-gray-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-300"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
                  </svg>

                  <span className="ms-3">Dashboard</span>
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/metrics"
                className={({ isActive }) =>
                  "" + (isActive && "active-navlink")
                }
              >
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-blue-gray-600 group hover:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M2 13h6v8H2v-8zM9 3h6v18H9V3zm7 5h6v13h-6V8z"></path>
                    </g>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Metrics</span>
                </a>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/users-management"
                className={({ isActive }) =>
                  "" + (isActive && "active-navlink")
                }
              >
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-blue-gray-600 group hover:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <g>
                      <g>
                        <path d="M16.5,14c-1.5,0-2.7,0.4-3.6,0.9c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z" />
                      </g>
                      <g>
                        <circle cx="16.5" cy="8.5" r="3.5" />
                      </g>
                    </g>
                    <g>
                      <path d="M4,8.5C4,6.6,5.6,5,7.5,5S11,6.6,11,8.5c0,1.9-1.6,3.5-3.5,3.5S4,10.4,4,8.5z M7.5,14C2.6,14,1,18,1,18v2h13v-2   C14,18,12.4,14,7.5,14z" />
                    </g>{" "}
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-200 rounded-full bg-blue-600 dark:text-gray-300">
                    Admin
                  </span>
                </a>
              </NavLink>
            </li>
          </ul>
          <div
            onClick={() => {
              resetAuth();
              resetMetrics();
              resetUsers();
            }}
            id="dropdown-cta"
            className="px-2 py-2 mt-6 rounded-lg bg-blue-gray-900 hover:bg-blue-gray-700 absolute inset-x-0 bottom-0 mb-4 mx-4 cursor-pointer"
            role="alert"
          >
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-6 h-6 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 15 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="px-2 font-small text-gray-300">
                  <div>{user.email}</div>
                </div>
              </div>
              <svg
                className="text-white"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                  fill=""
                />
                <path
                  d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                  fill=""
                />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64"></div>
    </>
  );
};

export default Sidebar;
