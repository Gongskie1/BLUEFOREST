import { createBrowserRouter } from "react-router-dom";
import { AboutPage, AdminDashboard, HomePage, LandingPage, LoginPage, ProtectedRoutes, TreatmentPage, UserDashboard } from "./pages";
import CreateAccountPage from "./pages/CreateAccountPage";

const router = createBrowserRouter([
    // Public routes
    {
        path: "/",
        element: <LandingPage />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "treatment",
                element: <TreatmentPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/create-account",
        element: <CreateAccountPage />
    },
    {
        path: "/dashboard",
        element: <ProtectedRoutes children={<UserDashboard />} />
    },
    {
        path: "/admin",
        element: <ProtectedRoutes children={<AdminDashboard />} />
    },
    {
        path: "*",
        element: <div>Page not found</div>
    }
]);



export default router;
