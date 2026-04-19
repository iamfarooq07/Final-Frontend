import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createRequest } from "../api/requests";
import { Bot, Target, MessageCircle, Sparkles, Wand2, Tag } from "lucide-react";

export default function CreateRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "Medium",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const [showRewriteModal, setShowRewriteModal] = useState(false);
  const [rewrittenDescription, setRewrittenDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Enhanced AI suggestions
  const suggestedCategories = ["Frontend", "Backend", "Database", "DevOps", "AI/ML", "Mobile", "Other"];
  const suggestedTags = ["React", "Node.js", "JavaScript", "MongoDB", "Express", "TypeScript", "Python", "CSS", "HTML", "API", "Docker", "AWS", "Performance", "Security"];

  // AI Response suggestions based on category
  const getAIResponseSuggestions = (category) => {
    const suggestions = {
      Frontend: [
        "I can help you with React component optimization. Let's debug the performance issue together.",
        "For CSS layout problems, I'd recommend checking your flexbox/grid implementation first.",
        "JavaScript errors often stem from async operations. Have you tried using try/catch blocks?"
      ],
      Backend: [
        "API authentication issues usually involve middleware configuration. Let's check your JWT setup.",
        "Database connection problems often relate to environment variables or connection strings.",
        "For Node.js performance issues, consider implementing caching or optimizing database queries."
      ],
      Database: [
        "MongoDB schema design should follow your application's data access patterns.",
        "Query optimization often involves adding proper indexes to your collections.",
        "Data modeling decisions should balance read/write patterns with data consistency needs."
      ],
      DevOps: [
        "Deployment issues often involve environment configuration or build processes.",
        "Docker containerization can help with environment consistency across development stages.",
        "CI/CD pipeline failures usually indicate configuration or permission issues."
      ],
      "AI/ML": [
        "Machine learning model performance depends on data quality and feature engineering.",
        "Training time optimization often involves data preprocessing and algorithm selection.",
        "Model deployment requires careful consideration of inference latency and scalability."
      ]
    };
    return suggestions[category] || ["I'd be happy to help you with this technical challenge. Could you provide more details about the specific issue you're facing?"];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-categorization simulation
    if (name === "title" || name === "description") {
      // Simple keyword-based categorization
      const text = (name === "title" ? value : formData.title) + " " + (name === "description" ? value : formData.description);
      if (text.toLowerCase().includes("react") || text.toLowerCase().includes("frontend")) {
        setFormData(prev => ({ ...prev, category: "Frontend" }));
      } else if (text.toLowerCase().includes("node") || text.toLowerCase().includes("backend")) {
        setFormData(prev => ({ ...prev, category: "Backend" }));
      }
    }
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const improveDescription = () => {
    // Dummy AI rewrite
    const improved = formData.description
      .replace(/i need help/gi, "I'm seeking assistance")
      .replace(/please help/gi, "Could you please help me")
      .replace(/urgent/gi, "time-sensitive")
      + "\n\nI've tried the following approaches and encountered these issues...";
    setRewrittenDescription(improved);
    setShowRewriteModal(true);
  };

  const applyRewrite = () => {
    setFormData(prev => ({ ...prev, description: rewrittenDescription }));
    setShowRewriteModal(false);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formData.category) {
      setError("Category is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createRequest(formData, user.token);
      navigate("/feed");
    } catch (err) {
      setError(err.message || "Failed to create request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const urgencyColors = {
    Low: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    High: "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Help Request</h1>
          <p className="text-slate-600">Get assistance from our community of experts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Title */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">Request Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Need help with React component optimization"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
                required
              />
            </div>

            {/* Description */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <button
                  type="button"
                  onClick={improveDescription}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors flex items-center gap-1"
                  disabled={!formData.description}
                >
                  <Wand2 className="w-3 h-3" />
                  Improve with AI
                </button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your problem in detail. Include what you've tried, what you expect, and any error messages..."
                rows={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40 resize-none"
                required
              />
            </div>

            {/* Tags */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add tags (press Enter or comma to add)"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
              />
              <div className="mt-3">
                <p className="text-xs text-slate-500 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.filter(tag => !formData.tags.includes(tag)).slice(0, 6).map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200 transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category and Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
                  required
                >
                  <option value="">Select Category</option>
                  {suggestedCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                <div className="flex gap-2">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        formData.urgency === level
                          ? urgencyColors[level] + " border-current"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-end gap-3">
              {error && (
                <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-xl border border-red-200">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  "Create Request"
                )}
              </button>
            </div>
          </motion.form>
        </div>

        {/* AI Assistant Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-600" />
              AI Assistant
            </h3>
            <div className="space-y-4">
              <div className="bg-white/70 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Smart Categorization
                </h4>
                <p className="text-sm text-slate-600">
                  {formData.category ? (
                    <>Suggested category: <span className="font-medium text-blue-600">{formData.category}</span></>
                  ) : (
                    "I'll suggest the best category based on your content as you type."
                  )}
                </p>
              </div>

              <div className="bg-white/70 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-green-600" />
                  Tag Suggestions
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Intelligent tags based on your content analysis:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.slice(0, 4).map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => addTag(tag)}
                      disabled={formData.tags.includes(tag)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  Response Preview
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Here's how helpers might respond to your request:
                </p>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-700 italic">
                    "{getAIResponseSuggestions(formData.category || 'Other')[0]}"
                  </p>
                </div>
              </div>

              <div className="bg-white/70 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  Description Enhancement
                </h4>
                <p className="text-sm text-slate-600">
                  Use the "Improve with AI" button to get a more professional and detailed description that attracts better help.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rewrite Modal */}
      {showRewriteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">AI-Improved Description</h3>
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap">{rewrittenDescription}</pre>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRewriteModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyRewrite}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}