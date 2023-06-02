import React, { useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/userContext";
import { useRouter } from "next/router";
import axios from "axios";




axios.defaults.withCredentials = true;






export default function NavBar() {

  const { userid, setUserId, loggedIn, setLoggedIn, RoleName, setRoleName } =
    useGlobalContext();
    const [localStorage, setLocalStorage] = useState<Storage | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

      setIsOpen2(false);
    
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);

      setIsOpen(false);
 
  };
  function PushToQuotations() {
    setIsOpen(false);
    setIsOpen2(false);
    router.push("/quotationsIndex");
  }

  function PushToStatements() {
    setIsOpen(false);
    setIsOpen2(false);
    router.push("/statementslistindex");
  }

  function PushTotaxInvoice() {
    setIsOpen(false);
    setIsOpen2(false);
    router.push("/taxinvoiceslist");
  }

  
  function PushToUserRole() {
    setIsOpen(false);
    setIsOpen2(false);
    router.push("/listUserRoles");
  }

  function PushToHome() {
    setIsOpen(false);
    setIsOpen2(false);
    router.push("/");
  }

  async function LogOut() {
    try {
      debugger;
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "api/Users/auth/logout",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsOpen(false);
        setIsOpen2(false);
        setLoggedIn(false);
        if (typeof window !== undefined) {
          debugger;
        const storage = window.localStorage;
        storage?.clear();
        setLocalStorage(storage);
  
      }
        router.push("/login");
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div>
      <div className="">
        <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
          <div className="container px-4 mx-auto md:flex md:items-center">
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center flex-shrink-0">
                <h1
                  className="font-bold text-xl cursor-pointer"
                  onClick={PushToHome}
                >
                  SNL <span className="text-blue-500">Flooring</span>
                </h1>
              </div>
              {/* <button
                onClick={PushToHome}
                className="relative left-[28rem] bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-blue-500 hover:border border-blue-500"
              >
                Home
              </button> */}
            </div>
            <div
              className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
              id="navbar-collapse"
            >
              {loggedIn === true ? (
                <div className="relative right-96 hidden sm:ml-9 sm:block">
                  <div className="flex space-x-5">
                    <div className="relative inline-block text-left">
                      <button
                        id="dropdownDividerButton"
                        data-dropdown-toggle="dropdownDivider"
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 ${
                          isOpen ? "active" : ""
                        }`}
                        type="button"
                        onClick={toggleDropdown}
                      >
                        Transactions
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div
                          id="dropdownDivider"
                          className="absolute left-1 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="dropdownDividerButton"
                         
                        >
                          <ul className="py-1">
                            <li>
                              <a
                                onClick={PushToQuotations}
                                className="block px-4 py-2 rounded-md text-sm text-black hover:bg-blue-500 hover:text-white "
                                ria-current="page"
                              >
                                Quotations
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={PushToStatements}
                                className="block px-4 py-2 rounded-md text-sm text-black hover:bg-blue-500 hover:text-white "
                                ria-current="page"
                              >
                                Statements
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={PushTotaxInvoice}
                                className="block px-4 py-2 rounded-md text-sm text-black hover:bg-blue-500 hover:text-white "
                                ria-current="page"
                              >
                                Tax Invoice
                              </a>
                            </li>
                          </ul>
                       
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {loggedIn === true && RoleName.includes("super")  ? (
                <div className="relative right-96 hidden sm:ml-9 sm:block">
                  <div className="flex space-x-5">
                    <div className="relative inline-block text-left">
                      <button
                        id="dropdownDividerButton2"
                        data-dropdown-toggle="dropdownDivider2"
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 ${
                          isOpen ? "active" : ""
                        }`}
                        type="button"
                        onClick={toggleDropdown2}
                      >
                        Admin
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen2 && (
                        <div
                          id="dropdownDivider2"
                          className="absolute left-1 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="dropdownDividerButton"
                        
                        >
                          <ul className="py-1">
                            <li>
                            <a
                                onClick={PushToUserRole}
                                className="block px-4 py-2 rounded-md text-sm text-black hover:bg-blue-500 hover:text-white "
                                ria-current="page"
                              >
                               User / Roles
                              </a>
                            </li>
                          </ul>
                          <div className="py-1"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {loggedIn ? (
                <>
                  <div className="flex space-x-5">
                    <button
                      onClick={LogOut}
                      className="bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-blue-500 hover:border border-blue-500"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {!loggedIn && (
                    <>
                      <Link
                        href="/login"
                        className="p-2 lg:px-4 md:mx-3 text-blue-600 text-center border border-solid border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
                        ria-current="page"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
    
  );
}
