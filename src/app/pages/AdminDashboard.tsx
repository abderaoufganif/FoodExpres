import { motion } from "motion/react";
import {
  LayoutDashboard, ShoppingBag, Users, Package,
  TrendingUp, DollarSign, Clock, Star,
  LogOut, Settings, Bell, Search, ChevronDown,
  ShoppingCart, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products" | "users">("overview");

  const handleLogout = () => {
    navigate("/admin/signin");
  };

  const stats = [
    {
      label: "Total Revenue",
      value: "567,890 DA",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-green-500 to-green-600"
    },
    {
      label: "Total Orders",
      value: "1,234",
      change: "+8.3%",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600"
    },
    {
      label: "Active Users",
      value: "3,567",
      change: "+15.2%",
      icon: Users,
      color: "from-purple-500 to-purple-600"
    },
    {
      label: "Menu Items",
      value: "142",
      change: "+3.1%",
      icon: Package,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-2024-1234",
      customer: "Sarah Johnson",
      items: 3,
      total: 4599,
      status: "delivered",
      time: "10 mins ago"
    },
    {
      id: "ORD-2024-1233",
      customer: "Michael Chen",
      items: 2,
      total: 2850,
      status: "preparing",
      time: "25 mins ago"
    },
    {
      id: "ORD-2024-1232",
      customer: "Emma Davis",
      items: 5,
      total: 6725,
      status: "pending",
      time: "35 mins ago"
    },
    {
      id: "ORD-2024-1231",
      customer: "James Wilson",
      items: 1,
      total: 1299,
      status: "cancelled",
      time: "1 hour ago"
    }
  ];

  const topProducts = [
    { name: "Chicken Burger", orders: 156, revenue: 155844 },
    { name: "Margherita Pizza", orders: 134, revenue: 174066 },
    { name: "Beef Steak", orders: 89, revenue: 222311 },
    { name: "Chicken Pasta", orders: 78, revenue: 109122 },
    { name: "Fish & Chips", orders: 67, revenue: 107133 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "preparing":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      delivered: "bg-green-100 text-green-700",
      preparing: "bg-blue-100 text-blue-700",
      pending: "bg-yellow-100 text-yellow-700",
      cancelled: "bg-red-100 text-red-700"
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  FoodExpress
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                <LayoutDashboard className="w-3 h-3" />
                ADMIN PANEL
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, products, users..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link to="/admin/notifications">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </motion.button>
              </Link>

              <Link to="/admin/settings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-700" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:block">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-6 shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  <Link to="/admin/orders" className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                    View All
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-900">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{order.customer}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{order.items} items</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">{order.total.toLocaleString()} DA</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{order.time}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
              </div>

              <div className="p-6 space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">{product.revenue.toLocaleString()} DA</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden mt-6"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>

              <div className="p-6 space-y-3">
                <Link to="/admin/add-product">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Add New Product
                  </motion.button>
                </Link>

                <Link to="/admin/manage-users">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Manage Users
                  </motion.button>
                </Link>

                <Link to="/admin/analytics">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-5 h-5" />
                    View Analytics
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
