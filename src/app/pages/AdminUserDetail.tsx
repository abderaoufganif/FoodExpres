import { motion } from "motion/react";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingCart, DollarSign, Package, Ban, CheckCircle, Edit } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // In production, this would fetch from backend
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      address: "123 Main Street, Apt 4B, New York, NY 10001",
      orders: 24,
      totalSpent: 78950,
      joinDate: "Jan 15, 2024",
      lastOrder: "Apr 18, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
      orders: 18,
      totalSpent: 54300,
      joinDate: "Feb 3, 2024",
      lastOrder: "Apr 17, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      address: "789 Pine Road, Chicago, IL 60601",
      orders: 32,
      totalSpent: 95680,
      joinDate: "Dec 20, 2023",
      lastOrder: "Apr 16, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.wilson@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      address: "321 Elm Street, Houston, TX 77001",
      orders: 5,
      totalSpent: 12450,
      joinDate: "Mar 10, 2024",
      lastOrder: "Apr 10, 2024",
      status: "blocked",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      phone: "+1 (555) 567-8901",
      location: "Miami, FL",
      address: "654 Maple Drive, Miami, FL 33101",
      orders: 41,
      totalSpent: 125890,
      joinDate: "Nov 8, 2023",
      lastOrder: "Apr 18, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Liam Brown",
      email: "liam.brown@example.com",
      phone: "+1 (555) 678-9012",
      location: "Seattle, WA",
      address: "987 Cedar Lane, Seattle, WA 98101",
      orders: 15,
      totalSpent: 42300,
      joinDate: "Jan 28, 2024",
      lastOrder: "Apr 15, 2024",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"
    }
  ];

  const [user, setUser] = useState(users.find(u => u.id === Number(id)));
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showUnblockDialog, setShowUnblockDialog] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
          <Link to="/admin/manage-users">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold"
            >
              Back to Users
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const recentOrders = [
    {
      id: "ORD-2024-1234",
      date: "Apr 18, 2024",
      items: 3,
      total: 4599,
      status: "delivered"
    },
    {
      id: "ORD-2024-1230",
      date: "Apr 15, 2024",
      items: 2,
      total: 2850,
      status: "delivered"
    },
    {
      id: "ORD-2024-1225",
      date: "Apr 12, 2024",
      items: 4,
      total: 5498,
      status: "delivered"
    },
    {
      id: "ORD-2024-1220",
      date: "Apr 8, 2024",
      items: 1,
      total: 1299,
      status: "cancelled"
    }
  ];

  const handleBlock = () => {
    setUser({ ...user, status: "blocked" });
    setShowBlockDialog(false);
  };

  const handleUnblock = () => {
    setUser({ ...user, status: "active" });
    setShowUnblockDialog(false);
  };

  const getStatusBadge = (status: string) => {
    if (status === "delivered") return "bg-green-100 text-green-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/manage-users">
                <motion.button
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Users
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
        <div className="max-w-6xl mx-auto">
          {/* User Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-8 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {user.status === "active" ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Active
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4" /> Blocked
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {user.status === "active" ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowBlockDialog(true)}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <Ban className="w-5 h-5" />
                        Block User
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowUnblockDialog(true)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Unblock User
                      </motion.button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{user.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{user.orders}</div>
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{user.totalSpent.toLocaleString()} DA</div>
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{(user.totalSpent / user.orders).toLocaleString()} DA</div>
              </div>
              <div className="text-sm text-gray-600">Avg Order Value</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">{user.lastOrder}</div>
              </div>
              <div className="text-sm text-gray-600">Last Order</div>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{order.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{order.items} items</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">{order.total.toLocaleString()} DA</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Block Confirmation Dialog */}
      {showBlockDialog && (
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
              Are you sure you want to block <span className="font-semibold">{user.name}</span>? They will not be able to place orders.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBlockDialog(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBlock}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Block User
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Unblock Confirmation Dialog */}
      {showUnblockDialog && (
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
              Are you sure you want to unblock <span className="font-semibold">{user.name}</span>? They will be able to place orders again.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUnblockDialog(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnblock}
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
