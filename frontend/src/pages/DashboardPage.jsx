import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";
import { formatDate } from "../utils/date";
import toast from "react-hot-toast";
const DashboardPage = () => {
	const { user, logout, updateProfile, isLoading } = useAuthStore();
	const { isDark } = useThemeStore();
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(user?.name || "");
	const [editPhoto, setEditPhoto] = useState(user?.profilePhoto || null);

	const handleLogout = () => {
		logout();
	};

	const handleSaveProfile = async () => {
		try {
			await updateProfile(editName, editPhoto);
			setIsEditing(false);
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error("Failed to update profile");
		}
	};

	const bgClass = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-300";
	const cardBgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300";
	const textClass = isDark ? "text-gray-300" : "text-gray-700";
	const gradientClass = isDark ? "from-green-400 to-emerald-600" : "from-blue-400 to-purple-600";
	const headingClass = isDark ? "text-green-400" : "text-blue-400";
	const buttonClass = isDark
		? "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 focus:ring-offset-gray-900"
		: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 focus:ring-offset-white";

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className={`max-w-md w-full mx-auto mt-10 p-8 ${bgClass} bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border transition-colors duration-300`}
		>
			<h2 className={`text-3xl font-bold mb-6 text-center bg-linear-to-r ${gradientClass} text-transparent bg-clip-text`}>
				Dashboard
			</h2>

			<div className='space-y-6'>
			{!isEditing && user?.profilePhoto && (
				<motion.div
					className={`p-4 ${cardBgClass} bg-opacity-50 rounded-lg border transition-colors duration-300 flex flex-col items-center`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<img
						src={user.profilePhoto}
						alt='Profile'
						className='w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-500'
					/>
					<h3 className={`text-xl font-semibold ${headingClass}`}>Profile Photo</h3>
				</motion.div>
			)}

			<motion.div
				className={`p-4 ${cardBgClass} bg-opacity-50 rounded-lg border transition-colors duration-300`}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				{!isEditing ? (
					<>
						<h3 className={`text-xl font-semibold ${headingClass} mb-3`}>Profile Information</h3>
						<p className={textClass}>Name: {user.name}</p>
						<p className={textClass}>Email: {user.email}</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsEditing(true)}
							className={`mt-4 px-4 py-2 bg-linear-to-r ${buttonClass} text-white text-sm font-bold rounded-lg`}
						>
							Edit Profile
						</motion.button>
					</>
				) : (
					<>
						<h3 className={`text-xl font-semibold ${headingClass} mb-4`}>Edit Profile</h3>
						<ProfilePhotoUpload
							currentPhoto={editPhoto}
							onPhotoChange={setEditPhoto}
						/>
						<input
							type='text'
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
							placeholder='Name'
							className={`w-full px-3 py-2 rounded mb-3 ${
								isDark
									? "bg-gray-700 text-white border border-gray-600"
									: "bg-gray-100 text-gray-900 border border-gray-300"
							}`}
						/>
						<div className='flex gap-2'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleSaveProfile}
								disabled={isLoading}
								className={`flex-1 px-4 py-2 bg-linear-to-r ${buttonClass} text-white font-bold rounded-lg`}
							>
								{isLoading ? "Saving..." : "Save"}
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => {
									setIsEditing(false);
									setEditName(user.name);
									setEditPhoto(user.profilePhoto);
								}}
								className={`flex-1 px-4 py-2 ${
									isDark ? "bg-gray-700 text-gray-200" : "bg-gray-300 text-gray-800"
								} font-bold rounded-lg`}
							>
								Cancel
							</motion.button>
						</div>
					</>
				)}
					</motion.div>
				<motion.div
					className={`p-4 ${cardBgClass} bg-opacity-50 rounded-lg border transition-colors duration-300`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className={`text-xl font-semibold ${headingClass} mb-3`}>Account Activity</h3>
					<p className={textClass}>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className={textClass}>
						<span className='font-bold'>Last Login: </span>

						{formatDate(user.lastLogin)}
					</p>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className='mt-4'
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className={`w-full py-3 px-4 bg-linear-to-r ${buttonClass} text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200`}
				>
					Logout
				</motion.button>
			</motion.div>
	
		</motion.div>
	);
};

export default DashboardPage;