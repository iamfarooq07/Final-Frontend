import { useState } from "react";
import { motion } from "framer-motion";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  // Dummy chat data
  const chats = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "SC",
        status: "online"
      },
      lastMessage: "Thanks for the help! The React optimization worked perfectly.",
      timestamp: "2 min ago",
      unread: 0
    },
    {
      id: 2,
      user: {
        name: "Mike Johnson",
        avatar: "MJ",
        status: "offline"
      },
      lastMessage: "Can you help me with the Node.js API?",
      timestamp: "1 hour ago",
      unread: 2
    },
    {
      id: 3,
      user: {
        name: "Alice Brown",
        avatar: "AB",
        status: "online"
      },
      lastMessage: "The database schema looks good!",
      timestamp: "3 hours ago",
      unread: 0
    },
    {
      id: 4,
      user: {
        name: "David Wilson",
        avatar: "DW",
        status: "away"
      },
      lastMessage: "Let me check the DevOps setup for you.",
      timestamp: "1 day ago",
      unread: 1
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: "Sarah Chen",
        content: "Hi! I saw your help request about React performance. I think I can help.",
        timestamp: "10:30 AM",
        isMine: false
      },
      {
        id: 2,
        sender: "You",
        content: "That would be great! I'm having issues with component re-rendering.",
        timestamp: "10:32 AM",
        isMine: true
      },
      {
        id: 3,
        sender: "Sarah Chen",
        content: "Let me take a look at your code. Can you share the component that's causing issues?",
        timestamp: "10:35 AM",
        isMine: false
      },
      {
        id: 4,
        sender: "You",
        content: "Sure, here's the component code...",
        timestamp: "10:37 AM",
        isMine: true
      },
      {
        id: 5,
        sender: "Sarah Chen",
        content: "Thanks for the help! The React optimization worked perfectly.",
        timestamp: "2 min ago",
        isMine: false
      }
    ],
    2: [
      {
        id: 1,
        sender: "Mike Johnson",
        content: "Can you help me with the Node.js API?",
        timestamp: "9:15 AM",
        isMine: false
      }
    ],
    3: [
      {
        id: 1,
        sender: "Alice Brown",
        content: "The database schema looks good!",
        timestamp: "Yesterday",
        isMine: false
      }
    ],
    4: [
      {
        id: 1,
        sender: "David Wilson",
        content: "Let me check the DevOps setup for you.",
        timestamp: "Yesterday",
        isMine: false
      }
    ]
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const selectedMessages = messages[selectedChat] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send to backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const statusColors = {
    online: "bg-green-400",
    offline: "bg-gray-400",
    away: "bg-yellow-400"
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Chat List */}
        <div className="w-80 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedChat === chat.id ? "bg-blue-50 border-r-2 border-r-blue-600" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                      {chat.user.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusColors[chat.user.status]}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{chat.user.name}</h3>
                    <p className="text-xs text-slate-500">{chat.timestamp}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {chat.unread}
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-600 truncate">{chat.lastMessage}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {selectedChatData && (
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                  {selectedChatData.user.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusColors[selectedChatData.user.status]}`}></div>
              </div>
              <div>
                <h3 className="font-medium text-slate-900">{selectedChatData.user.name}</h3>
                <p className="text-xs text-slate-500 capitalize">{selectedChatData.user.status}</p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isMine
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isMine ? "text-blue-100" : "text-slate-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/40"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}