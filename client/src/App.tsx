import { Outlet } from "react-router-dom"
import { NavBar } from "./components"

const App = () => {
  return (
    <div className="flex flex-col">
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default App