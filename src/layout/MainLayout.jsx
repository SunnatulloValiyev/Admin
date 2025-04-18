import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6 md:ml-64">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
