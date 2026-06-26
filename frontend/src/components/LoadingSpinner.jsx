import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

const LoadingSpinner = () => {
  const { isDark } = useThemeStore();

  const bgClass = isDark
    ? "from-gray-900 via-green-900 to-emerald-900"
    : "from-blue-50 via-purple-50 to-pink-50";

  const spinnerColorClass = isDark
    ? "border-t-green-500 border-green-200"
    : "border-t-blue-500 border-blue-200";

  return (
    <div
      className={`min-h-screen bg-linear-to-br ${bgClass} flex items-center justify-center relative overflow-hidden transition-colors duration-300`}
    >
      {/* Simple Loading Spinner */}
      <motion.div
        className={`w-16 h-16 border-4 border-t-4 ${spinnerColorClass} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
