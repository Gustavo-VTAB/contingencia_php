import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <button
        onClick={toggleTheme}
        className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
      >
        Modo: {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
