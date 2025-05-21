import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, SmilePlus, Send, ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { getProfile } from "../services/UserService";
import { FaSearch } from "react-icons/fa";
// Dummy data
const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
    unread: 2,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    timestamp: "9:45 AM",
    unread: 0,
    online: false,
  },
  // Add more dummy chats...
];



const messages = [
  { id: 1, text: "Hey there!", sent: false, timestamp: "10:30 AM" },
  { id: 2, text: "Hi! How are you?", sent: true, timestamp: "10:31 AM" },
  // Add more dummy messages...
];
// Chat List Item Component
const ChatListItem = ({ chat, onSelect }) => (
  <div
    onClick={() => onSelect(chat)}
    className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b"
  >
    <div className="relative">
      <Avatar className="h-12 w-12">
        <AvatarImage src={chat.avatar} />
        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {chat.online && (
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
      )}
    </div>
    <div className="ml-4 flex-1">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{chat.name}</h3>
        <span className="text-sm text-muted-foreground">{chat.timestamp}</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
        {chat.unread > 0 && <Badge className="bg-green-500 text-white">{chat.unread}</Badge>}
      </div>
    </div>
  </div>
);

// Chat List Screen
const ChatList = ({ chats, onSelectChat, searchQuery, setSearchQuery }) => {
  const { setTitle } = useAppContext();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTitle("Chats");
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.user);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setTitle]);

  return (
    <div className="w-full md:w-1/3 border-r bg-white">
      <div className="p-4 border-b bg-primary-dark">
        <div className="flex items-center gap-4 w-full">
          {loading ? (
            <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Avatar>
              <AvatarImage
                src={error ? undefined : user?.profileImage}
                alt={user ? `${user.firstName} ${user.lastName}` : "User avatar"}
              />
              <AvatarFallback>
                {user?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex items-center bg-[#005399] rounded-full px-4 py-2 flex-1">
            <input
              type="text"
              placeholder="Search chats"
              className="bg-transparent text-white placeholder-white/60 flex-1 outline-none"
            />
            <FaSearch className="text-white text-lg" />
          </div>

        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-160px)]">
        {chats
          .filter(chat =>
            chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((chat) => (
            <ChatListItem key={chat.id} chat={chat} onSelect={onSelectChat} />
          ))}
      </ScrollArea>
    </div>
  );
};


// Single Chat Screen
const ChatWindow = ({ chat, onBack, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = React.useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b flex items-center gap-4 bg-primary-dark">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{chat.name}</h2>
          <p className="text-sm text-muted-foreground">
            {chat.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sent ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Button variant="ghost" size="icon">
          <SmilePlus className="h-5 w-5" />
        </Button>
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-5 w-5 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};

// Main Chat Page
export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedChat, setSelectedChat] = React.useState(null);
  const [chatMessages, setChatMessages] = React.useState(messages);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: chatMessages.length + 1,
      text: messageText,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Always show chat list on desktop */}
      <div className={`${!selectedChat ? 'flex' : 'hidden md:flex'} w-full md:w-1/3`}>
        <ChatList
          chats={chats}
          onSelectChat={setSelectedChat}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Chat window - hidden on mobile when not selected */}
      {selectedChat ? (
        <div className="flex-1">
          <ChatWindow
            chat={selectedChat}
            onBack={() => setSelectedChat(null)}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <p className="text-muted-foreground">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}