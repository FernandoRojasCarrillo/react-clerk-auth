import { OrganizationSwitcher } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function IndexPage() {
  const { getToken } = useAuth();

  const fetchDataFromBackend = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:3001/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("data ", data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="px-6 py-8 flex flex-col gap-8">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4 items-center w-fit">
          <h1 className="text-2xl font-bold text-blue-950">
            This is the index page
          </h1>
          <OrganizationSwitcher />
        </div>
        <button
          className="px-6 py-4 bg-blue-700 text-white rounded"
          onClick={fetchDataFromBackend}
        >
          Obtener Datos
        </button>
      </div>

      <div>
        <ul className="flex flex-col gap-3 list-none p-0">
          <li className="mb-2">
            <Link
              to="/sign-up"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/sign-in"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/contact"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Contact
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
