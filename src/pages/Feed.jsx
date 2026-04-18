import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getRequests } from "../api/requests";
import { Link } from "react-router-dom";

export default function Feed() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    category: "",
    urgency: "",
    skills: "",
    location: "",
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRequests(filters, user.token);
      setRequests(data);
      setError("");
    } catch (err) {
      setError("Failed to load requests");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, user.token]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const urgencyColors = {
    High: "bg-red-50 text-red-700 border-red-200",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Low: "bg-green-50 text-green-700 border-green-200",
  };

  const categoryOptions = ["Frontend", "Backend", "Database", "DevOps", "AI/ML", "Mobile", "Other"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Explore Help Requests</h1>
          <p className="text-slate-600 mt-1">Discover opportunities to help or get help from the community</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            {requests.length} requests
          </div>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">🔍</span>
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            >
              <option value="">All Categories</option>
              {categoryOptions.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
            <select
              name="urgency"
              value={filters.urgency}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            >
              <option value="">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              placeholder="e.g., React, Node.js"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ category: "", urgency: "", skills: "", location: "" })}
              className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            >
              <option value="">All Categories</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
            <select
              name="urgency"
              value={filters.urgency}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            >
              <option value="">All Urgencies</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              placeholder="e.g., React, Node.js"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="e.g., Remote, New York"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
            />
          </div>
        </div>
      </motion.div>

      {/* Requests List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 bg-red-50 px-4 py-2 rounded-xl inline-block">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                  {request.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[request.urgency]}`}>
                  {request.urgency}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {request.description}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Category:</span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                    {request.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {request.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">By {request.userId?.fullName || 'Unknown'}</span>
                <Link
                  to={`/request/${request._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No requests match your filters.</p>
        </div>
      )}
    </div>
  );
}