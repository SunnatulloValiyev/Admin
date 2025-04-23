import { Link, NavLink } from "react-router-dom";
import {
  Home,
  ArrowDownUp,
  BarChart3,
  LayoutGrid,
  Receipt,
  Volume2,
} from "lucide-react";
import { useState, useEffect } from "react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {

  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  return (
    <div
      className={`
        ${
          isMobile
            ? "fixed bottom-0 left-0 right-0 h-16 flex-row z-50"
            : `h-screen ${isCollapsed ? "w-16" : "w-64"}`
        } 
        bg-gray-900 text-white flex transition-all duration-300 ease-in-out
      `}
    >
      <div
        className={`flex flex-col flex-1 rounded-bl-4xl rounded-br-4xl ${
          isMobile ? "flex-row w-full justify-around" : ""
        }`}
      >
        {!isCollapsed && !isMobile && (
          <div className="p-6">
            <h1 className="text-2xl font-bold">finance</h1>
          </div>
        )}

        <nav
          className={`
          flex flex-[0.5]
          ${
            isMobile ? "flex-row justify-around w-full" : "flex-col justify-center  gap-2 px-3"
          } 
          ${isCollapsed && !isMobile ? "items-center" : ""}
        `}
        >
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              `flex items-center mb-4 ${
                !isCollapsed ? "pl-4" : "justify-center"
              } py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-white font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home
                  size={18}
                  className={isActive ? "text-gray-900" : "text-white"}
                />
                {!isCollapsed && <span className="ml-3">Overview</span>}
              </>
            )}
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              `flex items-center mb-4 ${
                !isCollapsed ? "pl-4" : "justify-center"
              } py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-white font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <ArrowDownUp
                  size={18}
                  className={isActive ? "text-gray-900" : "text-white"}
                />
                {!isCollapsed && <span className="ml-3">Transactions</span>}
              </>
            )}
          </NavLink>
          <NavLink
            to="/budgets"
            className={({ isActive }) =>
              `flex items-center mb-4 ${
                !isCollapsed ? "pl-4" : "justify-center"
              } py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-white font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <BarChart3
                  size={18}
                  className={isActive ? "text-gray-900" : "text-white"}
                />
                {!isCollapsed && <span className="ml-3">Budgets</span>}
              </>
            )}
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `flex items-center mb-4 ${
                !isCollapsed ? "pl-4" : "justify-center"
              } py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-white font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutGrid
                  size={18}
                  className={isActive ? "text-gray-900" : "text-white"}
                />
                {!isCollapsed && <span className="ml-3">Pots</span>}
              </>
            )}
          </NavLink>
          <NavLink
            to="/recurringBills"
            className={({ isActive }) =>
              `flex items-center mb-4 ${
                !isCollapsed ? "pl-4" : "justify-center"
              } py-3 rounded-lg hover:bg-gray-800 transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-white font-normal"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Receipt
                  size={18}
                  className={isActive ? "text-gray-900" : "text-white"}
                />
                {!isCollapsed && <span className="ml-3">Recurring Bills</span>}
              </>
            )}
          </NavLink>
        </nav>

        {!isMobile && (
          <div className="mt-auto mb-4">
            <button
              onClick={toggleSidebar}
              className={`flex items-center mb-4 ${
                !isCollapsed ? "pl-4" : "justify-center"
              } py-3 text-white text-sm hover:bg-gray-800 w-full rounded-lg transition-colors`}
              aria-label={isCollapsed ? "Expand menu" : "Minimize menu"}
            >
              {/* <Volume2 size={18} />  */}
              {!isCollapsed && <span className="ml-3">Minimize Menu</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
