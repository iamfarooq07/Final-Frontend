import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRequestById, updateRequestStatus } from "../api/requests";
import { Bot } from "lucide-react";

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchRequest = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRequestById(id, user.token);
      setRequest(data);
      setError("");
    } catch (err) {
      setError("Failed to load request");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, user.token]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const handleOfferHelp = () => {
    // Dummy action for now - in real app, this would send a help offer
    alert("Help offer sent!");
    setShowHelpModal(false);
    setHelpMessage("");
  };

  const handleMarkAsSolved = async () => {
    if (!request) return;

    try {
      setIsUpdating(true);
      await updateRequestStatus(request._id, "solved", user.token);
      // Update local state optimistically
      setRequest(prev => ({ ...prev, status: "solved", solvedAt: new Date(), helperId: user }));
    } catch (err) {
      setError("Failed to mark as solved");
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const urgencyColors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-green-100 text-green-700 border-green-200"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 bg-red-50 px-4 py-2 rounded-xl inline-block">{error}</p>
        </div>
      ) : request ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Help Request</h1>
              <p className="text-slate-600">Posted {new Date(request.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3">
              {request.status !== "solved" && (
                <button
                  onClick={() => setShowHelpModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  I Can Help
                </button>
              )}
              {request.status !== "solved" && (request.userId._id === user._id || request.helperId?._id === user._id) && (
                <button
                  onClick={handleMarkAsSolved}
                  disabled={isUpdating}
                  className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    "Mark as Solved"
                  )}
                </button>
              )}
            </div>
          </div>

      {/* Main Request Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{request.title}</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${urgencyColors[request.urgency]}`}>
                {request.urgency} Priority
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                {request.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.status === "solved" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              }`}>
                {request.status === "solved" ? "Solved" : "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
          {request.userId?.profilePicture ? (
            <img
              src={request.userId.profilePicture}
              alt="Author"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {request.userId?.fullName?.charAt(0) || "U"}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-medium text-slate-900">{request.userId?.fullName || "Unknown User"}</h3>
            <p className="text-sm text-slate-600">Role: {request.userId?.role || "N/A"}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-slate-700 whitespace-pre-line">{request.description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {request.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          AI Summary
        </h3>
        <p className="text-slate-700">
          {request.description.length > 100
            ? `${request.description.substring(0, 100)}...`
            : request.description
          } (Category: {request.category}, Priority: {request.urgency})
        </p>
      </motion.div>

        </>
      ) : null}

      {/* Help Offer Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Offer Your Help</h3>
            <textarea
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
              placeholder="Briefly explain how you can help..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 resize-none mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOfferHelp}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Send Offer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}