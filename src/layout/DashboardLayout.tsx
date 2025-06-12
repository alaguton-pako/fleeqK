import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import laptop from "../assets/laptop.png";
import notification from "../assets/Notification.png";
import user from "../assets/userImage.png";

const DashboardLayout = () => {
  const [collapsedMenus, setCollapsedMenus] = useState<Record<string, boolean>>(
    {
      home: true,
      appComponents: true,
      userSetup: true,
      vrs: true,
      appUserManagement: true,
      bookingOrderManagement: true,
      marketingPromotions: true,
      advancedAnalytics: true,
      auditTrain: true,
      transactions: true,
    }
  );

  const toggleMenu = (menu: string) => {
    setCollapsedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    { key: "home", title: "Home" },
    { key: "appComponents", title: "App Components" },
    { key: "userSetup", title: "User Setup" },
    { key: "vrs", title: "V.R.S" },
    { key: "appUserManagement", title: "App User Management" },
    { key: "bookingOrderManagement", title: "Booking & Order Management" },
    { key: "marketingPromotions", title: "Marketing & Promotions" },
    { key: "advancedAnalytics", title: "Advanced Analytics" },
    { key: "auditTrain", title: "Audit Train" },
    { key: "transactions", title: "Transactions" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-white border-r border-gray-100 relative shadow-2xl">
        {/* Organization Logo */}
        <div className="flex items-center justify-center h-20">
          <div className="h-full w-full py-2">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>

        {/* Scrollable Sidebar Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* General Section Title (non-collapsible) */}
          <div className="px-4 py-3">
            <h3 className="text-[#9A9A9A]">General</h3>
          </div>

          {/* Collapsible Menu Items */}
          <div className="px-2 py-2">
            {menuItems.map((item) => (
              <div key={item.key} className="mb-1">
                <button
                  onClick={() => toggleMenu(item.key)}
                  className="flex items-center justify-between w-full px-3 py-2 text-left rounded bg-[#FAFAFC] hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm text-[#1E1E1E] font-normal">
                    {item.title}
                  </span>
                  {collapsedMenus[item.key] ? (
                    <FiChevronRight size={16} className="text-gray-500" />
                  ) : (
                    <FiChevronDown size={16} className="text-gray-500" />
                  )}
                </button>

                {!collapsedMenus[item.key] && (
                  <div className="ml-4 mt-1 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-1.5 text-xs rounded hover:bg-gray-100 text-gray-600"
                    >
                      Submenu Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-1.5 text-xs rounded hover:bg-gray-100 text-gray-600"
                    >
                      Submenu Item 2
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Others Section - Fixed at bottom inside sidebar */}
        <div className="w-[90%] mb-6 rounded-lg sticky bottom-0 left-0 right-0 bg-primary mt-auto mx-auto">
          <div className="p-4">
            <h3 className="pl-4 text-white">Others</h3>
            <div className="mt-1 space-y-1">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-primary-dark text-white"
              >
                <MdSettings fontSize={20} />
                Organization Settings
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-primary-dark text-white"
              >
                <HiOutlineLogout fontSize={20} />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-end px-6">
          <div className="py-2 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-[#FAFAFC] p-2">
              <div className="h-8 w-8">
                <img
                  src={laptop}
                  alt="icon"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="capitalize text-sm font-semibold text-[#555555]">
                Visit Website
              </span>
            </div>
            <div className="flex items-center">
              <span className="h-10 w-10 rounded-full bg-[#FFF4F4] flex items-center justify-center text-primary font-semibold text-sm">
                C.O
              </span>
              <span className="h-10 w-10 rounded-full bg-[#FFF4F4] flex items-center justify-center text-primary font-semibold -ml-2 text-sm">
                D.A
              </span>
            </div>
            <div className="h-6 w-6">
              <img
                src={notification}
                alt="icon"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10">
                <img
                  src={user}
                  alt="icon"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <h1 className="font-semibold text-sm text-[#555555]">Deji</h1>
                  <h6 className="font-semibold text-[#9A9A9A] text-xs">
                    Vendor manager
                  </h6>
                </div>
                <div>
                  <FiChevronDown size={15} className="text-[#565656]" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#FFFF]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
