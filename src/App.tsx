import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import routes from "./partials/routes";
import "./App.scss";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    if (!token) navigate('/auth')
  }, [token])

  const location = useLocation();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {location.pathname !== "/posts/create" && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full h-full max-w-9xl mx-auto">
            <Routes>
              {routes.map((route, index) => {
                return (
                  <React.Fragment key={index}>
                    {route.element ? (
                      <Route path={route.path} element={<route.element />} />
                    ) : (
                      <>
                        {route.child?.map((child, index) => {
                          return (
                            <Route
                              key={index}
                              path={`${route.path}${child.path}`}
                              element={<child.element />}
                            />
                          );
                        })}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
