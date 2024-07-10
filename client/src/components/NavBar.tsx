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
            className="flex flex-row gap-2"
            >
                {
                    NavElement.map((content,key) => (
                        <NavLink
                        key={key} 
                        className={({isActive}) => `hover:text-blue-600 ${isActive ? 'border-b-2 border-blue-500' : ''}`}
                        to={content.path}
                        >{content.name}</NavLink>
                    ))
                }
            </ul>
        </div>
    </nav>
  )
}

export default NavBar