import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 w-screen top-0 fixed px-52">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-semibold">SciAstra</h1>
        <div className="space-x-8">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/blog">Blog</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
