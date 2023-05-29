import { IconType } from "react-icons";
import { HiOutlineHome, HiOutlinePencil, HiOutlineUsers } from "react-icons/hi";
import { Dashboard, PostCreate, Posts, Users } from "../pages";

interface Child {
  path: string;
  name: string;
  element: () => JSX.Element;
}

interface RouteWithoutChild {
  path: string;
  icon: IconType;
  name: string;
  isHaveChild: false;
  element: () => JSX.Element;
  child?: undefined;
}

interface RouteWithChild {
  path: string;
  icon?: IconType;
  name: string;
  isHaveChild: true;
  element?: undefined;
  child: Child[];
}

type Route = RouteWithoutChild | RouteWithChild;

let routes: Route[] = [
  {
    path: "/",
    icon: HiOutlineHome,
    name: "Dashboard",
    isHaveChild: false,
    element: Dashboard,
  },

  {
    path: "/posts",
    icon: HiOutlinePencil,
    name: "Posts",
    isHaveChild: true,
    child: [
      {
        path: "/all",
        name: "All Post",
        element: Posts,
      },
      {
        path: "/create",
        name: "Create Post",
        element: PostCreate,
      },
    ],
  },

  {
    path: "/users",
    icon: HiOutlineUsers,
    name: "Users",
    isHaveChild: true,
    child: [
      {
        path: "/all",
        name: "All User",
        element: Users,
      },
      {
        path: "/create",
        name: "Create User",
        element: Users,
      },
    ],
  },
];

export default routes;
