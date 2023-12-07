import { useContext, useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Blog</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </NavLink>
            </>
          )}
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Blog App</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {user ? (
                  <></>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
              <div className="py-6"></div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
