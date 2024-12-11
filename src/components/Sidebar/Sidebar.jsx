import { NavLink } from 'react-router-dom'; // Using NavLink for better SPA navigation
import { UserIcon, CalendarIcon, CogIcon, FolderIcon, DocumentIcon, PhotoIcon, BuildingLibraryIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 transition-transform duration-300 ease-in-out transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-50`}
    >
      <div className="text-white mb-6">
        <h1 className="text-3xl font-bold">JOSHUA</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/formats" // Dynamic link to the first format step
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <DocumentIcon className="h-6 w-6 mr-2" />
              Formats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <FolderIcon className="h-6 w-6 mr-2" />
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/format/carousel/step/1"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <PhotoIcon className="h-6 w-6 mr-2" /> {/* Replaced with PhotoIcon for better clarity */}
              Caroussel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <UserIcon className="h-6 w-6 mr-2" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <CalendarIcon className="h-6 w-6 mr-2" />
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <BookOpenIcon className="h-6 w-6 mr-2" />
              Library
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <CogIcon className="h-6 w-6 mr-2" />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
