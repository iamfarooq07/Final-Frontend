import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { updateProfilePicture } from "../api/auth";
import { User, Users, FileText, Star, Award, CheckCircle, Camera } from "lucide-react";

export default function Profile() {
  const { user, login } = useAuth();
  const [showPicModal, setShowPicModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleUpdateProfilePicture = async () => {
    if (!selectedFile) return;
    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const updatedUser = await updateProfilePicture(formData, user.token);
      login({ ...updatedUser, token: user.token });
      setShowPicModal(false);
      setSelectedFile(null);
      // Show success message
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      alert('Failed to update profile picture. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Real user data from context
  const userStats = {
    requestsCreated: 0,
    requestsSolved: 0,
    helpsGiven: 0,
    trustScore: user?.trustScore || 3.5
  };

  const skills = user?.skills?.length > 0 ? user.skills : ["JavaScript", "React", "Node.js"];

  const badges = [
    { name: "Community Member", description: "Active participant", icon: User, earned: true },
    { name: "Helper", description: "Helped other users", icon: Users, earned: userStats.helpsGiven > 0 },
    { name: "Contributor", description: "Created requests", icon: FileText, earned: userStats.requestsCreated > 0 }
  ];

  const trustScorePercentage = (userStats.trustScore / 5) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600">Manage your profile and view your contributions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            {user?.profilePicture ? (
              <img
                src={`${import.meta.env.VITE_URL || "http://localhost:5000"}${user.profilePicture}`}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 ${user?.profilePicture ? 'hidden' : ''}`}>
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <button
              onClick={() => setShowPicModal(true)}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{user?.fullName || "User Name"}</h2>
            <p className="text-slate-600 mb-2">{user?.email || "user@example.com"}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {user?.role || "Role"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Requests Created", value: userStats.requestsCreated, icon: FileText },
          { label: "Requests Solved", value: userStats.requestsSolved, icon: CheckCircle },
          { label: "Helps Given", value: userStats.helpsGiven, icon: Users },
          { label: "Trust Score", value: userStats.trustScore, icon: Star, special: true }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {stat.special ? `${stat.value}/5` : stat.value}
            </h3>
            <p className="text-slate-600 text-sm">{stat.label}</p>
            {stat.special && (
              <div className="mt-3">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trustScorePercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                badge.earned
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <badge.icon className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className={`font-medium ${badge.earned ? "text-slate-900" : "text-slate-500"}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm ${badge.earned ? "text-slate-600" : "text-slate-400"}`}>
                  {badge.description}
                </p>
              </div>
              {badge.earned && (
                <span className="ml-auto text-yellow-600">✓</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Profile Picture Modal */}
      {showPicModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Update Profile Picture</h3>
              <button
                onClick={() => {
                  setShowPicModal(false);
                  setSelectedFile(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Validate file size (max 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                        return;
                      }
                      // Validate file type
                      if (!file.type.startsWith('image/')) {
                        alert('Please select an image file');
                        return;
                      }
                      setSelectedFile(file);
                    }
                  }}
                  className="hidden"
                  id="profile-picture-input"
                />
                <label
                  htmlFor="profile-picture-input"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <Camera className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-slate-600 font-medium">Click to select image</p>
                  <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>

              {selectedFile && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 text-sm">{selectedFile.name}</p>
                      <p className="text-slate-500 text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowPicModal(false);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfilePicture}
                disabled={updating || !selectedFile}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {updating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4" />
                    Update Picture
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}