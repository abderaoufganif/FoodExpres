import { motion } from "motion/react";
import { ArrowLeft, Bell, CheckCheck, Trash2, ShoppingCart, Users, Package, AlertCircle, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function AdminNotifications() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      title: "New Order Received",
      message: "Order #ORD-2024-1234 from Sarah Johnson",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "user",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      title: "New User Registration",
      message: "Michael Chen just signed up",
      time: "15 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "product",
      icon: Package,
      color: "from-orange-500 to-orange-600",
      title: "Low Stock Alert",
      message: "Chicken Burger is running low on inventory",
      time: "1 hour ago",
      read: false
    },
    {
      id: 4,
      type: "order",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      title: "Order Delivered",
      message: "Order #ORD-2024-1230 has been delivered",
      time: "2 hours ago",
      read: true
    },
    {
      id: 5,
      type: "alert",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      title: "Payment Failed",
      message: "Payment failed for order #ORD-2024-1229",
      time: "3 hours ago",
      read: true
    },
    {
      id: 6,
      type: "analytics",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      title: "Revenue Milestone",
      message: "You've reached 200,000 DA in revenue this month!",
      time: "5 hours ago",
      read: true
    },
    {
      id: 7,
      type: "user",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      title: "User Feedback",
      message: "Emma Davis left a 5-star review",
      time: "6 hours ago",
      read: true
    },
    {
      id: 8,
      type: "order",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      title: "Order Cancelled",
      message: "Order #ORD-2024-1227 was cancelled by customer",
      time: "8 hours ago",
      read: true
    }
  ]);

  const filteredNotifications = filter === "all"
    ? notifications
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <CheckCheck className="w-5 h-5" />
              Mark All as Read
            </motion.button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              filter === "all"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
            }`}
          >
            All Notifications
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("unread")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              filter === "unread"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl shadow-md overflow-hidden ${
                !notification.read ? "border-l-4 border-purple-600" : ""
              }`}
            >
              <div className="p-6 flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <notification.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className={`font-bold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{notification.time}</span>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markAsRead(notification.id)}
                          className="px-3 py-1 text-purple-600 hover:bg-purple-50 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Mark as Read
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-md"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
