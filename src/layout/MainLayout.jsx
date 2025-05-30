import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
