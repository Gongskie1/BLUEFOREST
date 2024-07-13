import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AboutPage, AdminDashboard, HomePage, LoginPage, TreatmentPage, UserDashboard } from "./pages";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                path:"",
                element: <HomePage/>
            },
            {
                path:"about",
                element: <AboutPage/>
            },
            {
                path:"treatment",
                element: <TreatmentPage/>
            },
            
        ],
        
    },
    {
        path:"/login",
        element: <LoginPage/>
    },
    {
        path:"user-dashboard",
        element: <UserDashboard/>
    },
    {
        path:"admin-dashboard",
        element: <AdminDashboard/>
    }
])