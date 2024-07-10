import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AboutPage, ContactPage, HomePage, TreatmentPage } from "./pages";

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
            {
                path:"contact",
                element: <ContactPage/>
            },
        ]
    }
])