import { motion } from "framer-motion";
import Input from "../components/Input";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();
  const { isDark } = useThemeStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name, profilePhoto);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const bgClass = isDark ? "bg-gray-800" : "bg-white";
  const gradientClass = isDark
    ? "from-green-400 to-emerald-500"
    : "from-blue-400 to-purple-500";
  const buttonClass = isDark
    ? "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 focus:ring-offset-gray-900"
    : "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 focus:ring-offset-white";
  const bottomBgClass = isDark ? "bg-gray-900" : "bg-gray-100";
  const footerTextClass = isDark ? "text-gray-400" : "text-gray-700";
  const linkClass = isDark
    ? "text-green-400 hover:underline"
    : "text-blue-400 hover:underline";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-md w-full ${bgClass} bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-colors duration-300`}
    >
      <div className="p-8">
        <h2
          className={`text-3xl font-bold mb-6 text-center bg-linear-to-r ${gradientClass} text-transparent bg-clip-text`}
        >
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoUpload
            currentPhoto={profilePhoto}
            onPhotoChange={setProfilePhoto}
          />
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className={`mt-5 w-full py-3 px-4 bg-linear-to-r ${buttonClass} text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div
        className={`px-8 py-4 ${bottomBgClass} bg-opacity-50 flex justify-center transition-colors duration-300`}
      >
        <p className={`text-sm ${footerTextClass}`}>
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
export default SignUpPage;
