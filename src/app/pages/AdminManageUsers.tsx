import { motion } from "motion/react";
import { ArrowLeft, Search, UserPlus, MoreVertical, Mail, Phone, MapPin, Calendar, Ban, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function AdminManageUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "blocked">("all");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showUnblockDialog, setShowUnblockDialog] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      orders: 24,
      totalSpent: 78950,
      joinDate: "Jan 15, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      orders: 18,
      totalSpent: 54300,
      joinDate: "Feb 3, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      orders: 32,
      totalSpent: 95680,
      joinDate: "Dec 20, 2023",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.wilson@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      orders: 5,
      totalSpent: 12450,
      joinDate: "Mar 10, 2024",
      status: "blocked",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      phone: "+1 (555) 567-8901",
      location: "Miami, FL",
      orders: 41,
      totalSpent: 125890,
      joinDate: "Nov 8, 2023",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    },
    {
      id: 6,
      name: "Liam Brown",
      email: "liam.brown@example.com",
      phone: "+1 (555) 678-9012",
      location: "Seattle, WA",
      orders: 15,
      totalSpent: 42300,
      joinDate: "Jan 28, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
    }
  ]);

  const handleBlockUser = (userId: number) => {
    setSelectedUser(userId);
    setShowBlockDialog(true);
  };

  const handleUnblockUser = (userId: number) => {
    setSelectedUser(userId);
    setShowUnblockDialog(true);
  };

  const confirmBlock = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser ? { ...u, status: "blocked" } : u));
    }
    setShowBlockDialog(false);
    setSelectedUser(null);
  };

  const confirmUnblock = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser ? { ...u, status: "active" } : u));
    }
    setShowUnblockDialog(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    blocked: users.filter(u => u.status === "blocked").length,
    newThisMonth: 3
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <motion.button
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Dashboard
                </motion.button>
              </Link>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              FoodExpress
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
          <p className="text-gray-600">View and manage all registered users</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Users</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.active}</div>
            <div className="text-gray-600 text-sm">Active Users</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.blocked}</div>
            <div className="text-gray-600 text-sm">Blocked Users</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.newThisMonth}</div>
            <div className="text-gray-600 text-sm">New This Month</div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus("all")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  filterStatus === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus("active")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  filterStatus === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterStatus("blocked")}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  filterStatus === "blocked"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Blocked
              </motion.button>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-6 shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {user.status === "active" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Ban className="w-3 h-3" /> Blocked
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinDate}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{user.orders}</div>
                  <div className="text-xs text-gray-500">Orders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{user.totalSpent.toLocaleString()} DA</div>
                  <div className="text-xs text-gray-500">Total Spent</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Link to={`/admin/user/${user.id}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </motion.button>
                </Link>
                {user.status === "active" ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBlockUser(user.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                  >
                    Block
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleUnblockUser(user.id)}
                    className="px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors"
                  >
                    Unblock
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-gray-400 mb-4">No users found</div>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Block Confirmation Dialog */}
      {showBlockDialog && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ban className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Block User?</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to block <span className="font-semibold">{users.find(u => u.id === selectedUser)?.name}</span>? They will not be able to place orders.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setShowBlockDialog(false); setSelectedUser(null); }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmBlock}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Block User
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Unblock Confirmation Dialog */}
      {showUnblockDialog && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Unblock User?</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to unblock <span className="font-semibold">{users.find(u => u.id === selectedUser)?.name}</span>? They will be able to place orders again.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setShowUnblockDialog(false); setSelectedUser(null); }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmUnblock}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Unblock User
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
