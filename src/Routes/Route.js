import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home";
import Media from "../Pages/Media/Media";
import Message from "../Pages/Message/Message";
import Signin from "../Pages/Signin/Signin";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: '/home',
                element: <PrivateRoute><Home /></PrivateRoute>,
            },
            {
                path: '/message',
                element: <PrivateRoute><Message /></PrivateRoute>,
            },
            {
                path: '/media',
                element: <PrivateRoute><Media /></PrivateRoute>,
            },
            {
                path: '/about',
                element: < PrivateRoute > <About /></ PrivateRoute>,
            },
            {
                path: '/signin',
                element: <Signin />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ]
    }
])