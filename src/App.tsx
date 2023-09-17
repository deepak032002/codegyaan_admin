import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import routes from "./partials/routes";
import "./App.scss";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Four0Four from "./components/ErrorPage/404";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) navigate("/auth");
  }, [token]);

  console.log(sidebarOpen)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

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

              <Route path="*" element={<Four0Four />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
