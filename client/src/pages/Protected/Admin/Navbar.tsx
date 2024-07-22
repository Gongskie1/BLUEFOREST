import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Admin Panel</div>
        <div className="space-x-4">
          <Link to="/admin" className="hover:bg-gray-700 px-3 py-2 rounded-md">Admin Dashboard</Link>
          <Link to="/admin/audit" className="hover:bg-gray-700 px-3 py-2 rounded-md">Audit Logs</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;