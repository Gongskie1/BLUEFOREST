import { NavLink } from "react-router-dom"
import { NavElement } from "../Constants/NavElment"

const NavBar = () => {
  return (
    <nav className="sticky top-0 w-full bg-white shadow-md">
        <div className="flex flex-row items-center justify-between w-full border-b-[1px] px-5">
            <div>
                <NavLink to={"/"}>
                    <img
                    className="w-[80px] h-[80px]" 
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=138,fit=crop/AR0exKV0xehn8xZJ/blue-forest-logo-YX42vKzbyrFG5883.png" 
                    alt="image" />
                </NavLink>
            </div>
            <ul
            className="flex flex-row gap-5 items-center"
            >
                {
                    NavElement.map((content,key) => (
                        <NavLink
                        key={key} 
                        className={({isActive}) => `hover:text-blue-600 ${isActive ? 'border-b-2 border-blue-500' : ''} px-3`}
                        to={content.path}
                        >{content.name}</NavLink>
                    ))
                }

                <NavLink 
                className={`hover:text-blue-600 border-green-400 border p-[6px_16px_6px_16px] rounded-md`}
                to={"/login"}
                >Sign In</NavLink>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar