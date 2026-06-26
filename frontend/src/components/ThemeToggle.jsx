import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

const ThemeToggle = () => {
	const { isDark, toggleTheme } = useThemeStore();

	return (
		<button
			onClick={toggleTheme}
			className={`fixed top-4 right-4 p-2 rounded-lg transition-all duration-300 z-50 ${
				isDark
					? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
					: "bg-gray-200 text-blue-600 hover:bg-gray-300"
			}`}
			title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
		>
			{isDark ? <Sun size={24} /> : <Moon size={24} />}
		</button>
	);
};

export default ThemeToggle;
