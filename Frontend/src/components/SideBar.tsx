import { NavLink } from "react-router-dom";
import {
  HiHome,
  HiCalculator,
  HiDocument,
  HiMail,
  HiNewspaper,
  HiInformationCircle,
  HiOutlineClipboardList
} from "react-icons/hi";

const SideBar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-500 text-white h-full w-40 flex flex-col fixed top-0 left-0">
      <div className="p-4 items-center rounded-md md my-3 justify-center mx-3">
        <NavLink
          to="/"
          className="text-xl font-bold font-serif text-white shadow-lg "
        >
          Techarc
        </NavLink>
      </div>
      <hr className="border-gray-600 shadow-md" />
      <nav className="flex-1  space-y-2 mt-4 font-nunito">
        <NavLink
          to="/Home"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <HiHome className="mr-2" /> Home
        </NavLink>
        <NavLink
          to="/calculator"
          className={({ isActive }) =>
            `flex items-center  px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <HiCalculator className="mr-2" /> Calculator
        </NavLink>
        <NavLink
          to="/comparison" // Added NavLink for "/comparison" here
          className={({ isActive }) =>
            `flex items-center px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <HiOutlineClipboardList className="mr-2" />
          Comparison
        </NavLink>
        <NavLink
          to="/document"
          className={({ isActive }) =>
            `flex items-center  px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <HiDocument className="mr-2" /> Loan Progress
        </NavLink>
        <NavLink
          to="/contactus"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <HiMail className="mr-2" /> Contact Us
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
        <HiNewspaper className="mr-2" /> News
        </NavLink>
        
        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            `flex items-center  px-4 py-2 ${
              isActive
                ? "bg-gray-800 text-gray-400"
                : "text-white hover:bg-gray-800"
            }`
          }
        >
          <HiInformationCircle className="mr-2" /> About Us
        </NavLink>
      </nav>
      <NavLink
        to="/"
        className="flex items-center px-4 text-xs mt-auto my-2 hover:underline"
      >
        privacy
      </NavLink>
      <NavLink
        to="/"
        className="flex items-center px-4 text-xs mt-auto mb-4 hover:underline"
      >
        Terms
      </NavLink>
    </div>
  );
};

export default SideBar;
