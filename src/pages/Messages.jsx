import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  getConversations,
  getMessages,
  sendMessage,
  markConversationAsRead
} from "../api/messages";

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getConversations(user.token);
      setConversations(data);

      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user.token, selectedConversation]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (!selectedConversation?._id) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(selectedConversation._id, user.token);
        setMessages(data);
        await markConversationAsRead(selectedConversation._id, user.token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedConversation, user.token]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await sendMessage(selectedConversation._id, newMessage, user.token);
      setNewMessage("");

      const data = await getMessages(selectedConversation._id, user.token);
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex">
      
      {/* SIDEBAR */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 font-semibold text-slate-900">Messages</div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-slate-500 text-sm">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">No conversations yet</div>
          ) : (
            conversations.map((chat) => (
              <motion.div
                key={chat._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedConversation(chat)}
                className={`p-4 cursor-pointer border-b border-slate-200 hover:bg-slate-100 transition-colors ${
                  selectedConversation?._id === chat._id ? "bg-blue-50 border-r-2 border-r-blue-600" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                    {getInitials(chat.user?.name || chat.otherParticipant?.fullName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 truncate">
                      {chat.user?.name || chat.otherParticipant?.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {new Date(chat.lastMessageTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-600 truncate">{chat.lastMessage || "No messages"}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* HEADER */}
        {selectedConversation ? (
          <div className="p-4 border-b border-slate-200 font-medium text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              {getInitials(selectedConversation.user?.name || selectedConversation.otherParticipant?.fullName)}
            </div>
            <div>
              <h3 className="font-semibold">
                {selectedConversation.user?.name || selectedConversation.otherParticipant?.fullName}
              </h3>
              <p className="text-xs text-slate-500">Connected</p>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-slate-200 text-slate-500">Select a conversation</div>
        )}

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.senderId._id === user._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.senderId._id === user._id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-900"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.senderId._id === user._id ? "text-blue-100" : "text-slate-600"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* INPUT */}
        {selectedConversation && (
          <div className="p-4 border-t border-slate-200 bg-white flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border border-slate-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}