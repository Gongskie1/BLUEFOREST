import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components';

const LandingPage = () => {
  return (
    <div className='className="flex flex-col"'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default LandingPage