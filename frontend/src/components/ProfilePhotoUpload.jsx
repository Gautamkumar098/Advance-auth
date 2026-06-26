import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useThemeStore } from "../store/themeStore";

const ProfilePhotoUpload = ({
  currentPhoto,
  onPhotoChange,
  isDarkMode = true,
}) => {
  const [preview, setPreview] = useState(currentPhoto || null);
  const fileInputRef = useRef(null);
  const { isDark } = useThemeStore();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const bgColor = isDark ? "bg-gray-700" : "bg-gray-300";
  const borderColor = isDark ? "border-gray-600" : "border-gray-400";
  const textColor = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <div className="flex flex-col items-center mb-6">
      <div
        className={`w-24 h-24 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center overflow-hidden mb-3 cursor-pointer hover:opacity-80 transition-opacity`}
        onClick={triggerFileInput}
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <Camera className={`w-10 h-10 ${textColor}`} />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        type="button"
        onClick={triggerFileInput}
        className={`text-sm px-4 py-2 rounded-lg bg-opacity-50 backdrop-blur transition-colors ${
          isDark
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
      >
        {preview ? "Change Photo" : "Upload Photo"}
      </button>
    </div>
  );
};

export default ProfilePhotoUpload;
