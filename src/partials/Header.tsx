import React, { useState } from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import UserMenu from "./header/UserMenu";
import { HiOutlineSearch } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { useLocation } from "react-router-dom";

function Header({ sidebarOpen, setSidebarOpen }: any) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* back button */}
            {location.pathname === "/posts/create" ? (
              <BiArrowBack
                className="cursor-pointer"
                onClick={() => {
                  window.history.back();
                }}
              />
            ) : (
              <>
                {/* Hamburger button */}
                <button
                  className="text-slate-500 hover:text-slate-600 lg:hidden"
                  aria-controls="sidebar"
                  aria-expanded={sidebarOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(!sidebarOpen);
                  }}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="5" width="16" height="2" />
                    <rect x="4" y="11" width="16" height="2" />
                    <rect x="4" y="17" width="16" height="2" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <button
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && "bg-slate-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSearchModalOpen(true);
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <HiOutlineSearch />
            </button>
            <SearchModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            />
            <Notifications />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
