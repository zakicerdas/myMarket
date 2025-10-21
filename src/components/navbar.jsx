import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/themeContext";

export default function Navbar() {
  const { dispatch: themeDispatch } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* === Left side: Logo + Links === */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <img
              src="https://preview.redd.it/does-anyone-have-uma-musume-versions-of-these-chibi-icons-v0-f8p9rccuz7if1.jpg?width=640&crop=smart&auto=webp&s=29f50e8b07ee8c55a47ac73b69373af0750171ad"
              alt="Logo"
              className="w-8 h-8 object-contain rounded-full"
            />
            <span className="text-lg font-bold tracking-wide">MyStore</span>
          </NavLink>

          <ul className="flex gap-6 text-sm md:text-base">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "font-bold underline underline-offset-4" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/productList"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "font-bold underline underline-offset-4" : ""
                  }`
                }
              >
                Product
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/checkout"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "font-bold underline underline-offset-4" : ""
                  }`
                }
              >
                Checkout
              </NavLink>
            </li>

                <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "font-bold underline underline-offset-4" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-yellow-400 text-blue-900 px-4 py-1.5 rounded hover:bg-yellow-500 transition"
            >
              Login
            </NavLink>
          )}

          <button
            onClick={() => themeDispatch({ type: "toggleButton" })}
            className="border border-white px-4 py-1.5 rounded hover:bg-white hover:text-blue-700 transition"
          >
            Set Theme
          </button>
        </div>
      </div>
    </nav>
  );
}
