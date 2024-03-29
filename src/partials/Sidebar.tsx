import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import SidebarLinkGroup from "./SidebarLinkGroup";
import { TfiAngleDown } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import routes from "./routes";
import "./sidebar.scss";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [openTab, setOpenTab] = useState<string>("");

  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const handleTab = (tab: string) => {
    setOpenTab(tab === openTab ? "" : tab);
  };

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(sidebarExpanded));
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-10 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen((prev) => !prev)}
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col bg-white border z-40 border-r-[#eee] overflow-x-hidden absolute left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto w-64 lg:w-20 lg:sidebar-expanded:!w-64 shrink-0 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-cyan-900 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Menu
              </span>
            </h3>
            <ul className="mt-3">
              {routes.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.isHaveChild ? (
                      <li
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                          pathname.includes(item.path) && !sidebarExpanded
                            ? "bg-[#00ccff] active_close"
                            : ""
                        }`}
                        onClick={() => {
                          handleTab(`path${index}`);
                          setSidebarExpanded(true);
                        }}
                      >
                        <Accordion
                          className={`accordion ${
                            pathname.includes(item.path) && sidebarExpanded
                              ? "active"
                              : ""
                          }`}
                          open={
                            openTab === `path${index}` ||
                            (pathname.includes(item.path) && sidebarExpanded)
                          }
                          icon={
                            <TfiAngleDown
                              className={`${
                                openTab === `path${index}` ||
                                (pathname.includes(item.path) &&
                                  sidebarExpanded)
                                  ? "rotate-180"
                                  : ""
                              } h-5 w-5 transition-transform`}
                            />
                          }
                        >
                          <AccordionHeader
                            onClick={() => handleTab(`path${index}`)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {item.icon && (
                                  <item.icon className="shrink-0 h-6 w-6" />
                                )}
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </AccordionHeader>

                          <AccordionBody>
                            <ul className={`pl-9 mt-1 listCircle`}>
                              {item.child?.map((child, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    {child.name && (
                                      <li
                                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                                          pathname ===
                                            `${item.path}${child.path}` &&
                                          "active"
                                        }`}
                                      >
                                        <NavLink
                                          to={`${item.path}${child.path}`}
                                          className={`block truncate transition duration-150 ${
                                            pathname.includes(child.path) &&
                                            "hover"
                                          }`}
                                        >
                                          <div className="flex items-center">
                                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              {child.name}
                                            </span>
                                          </div>
                                        </NavLink>
                                      </li>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </ul>
                          </AccordionBody>
                        </Accordion>
                      </li>
                    ) : (
                      <li
                        key={index}
                        onClick={() => handleTab("")}
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                          pathname === item.path && "bg-[#00ccff]"
                        }`}
                      >
                        <NavLink
                          to={item.path}
                          className={`block hover:text-blue-gray-900 text-blue-gray-700 truncate transition duration-150 ${
                            pathname === item.path &&
                            "text-white hover:text-white"
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <item.icon className="shrink-0 h-6 w-6" />
                            )}
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                              {item.name}
                            </span>
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
          {/* More group */}
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex justify-end mt-auto">
          <div className="px-3 py-2">
            <button
              onClick={() => {
                setSidebarExpanded(!sidebarExpanded);
                handleTab("");
              }}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <FiLogOut className="w-6 h-6 sidebar-expanded:rotate-180 text-blue-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
