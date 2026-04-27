import { motion } from "motion/react";
import { ArrowLeft, Search, Filter, Download, CheckCircle, Clock, XCircle, AlertCircle, Eye, X, MapPin, User, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function AdminAllOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "preparing" | "delivered" | "cancelled">("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const allOrders = [
    {
      id: "ORD-2024-1234",
      customer: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      items: 3,
      total: 4599,
      status: "delivered",
      date: "2024-04-18",
      time: "10:30 AM",
      address: "123 Main St, New York, NY 10001",
      orderItems: [
        { name: "Chicken Burger", quantity: 2, price: 999 },
        { name: "Margherita Pizza", quantity: 1, price: 1299 },
        { name: "Chocolate Dessert", quantity: 2, price: 799 }
      ],
      deliveryFee: 299,
      tax: 460
    },
    {
      id: "ORD-2024-1233",
      customer: "Michael Chen",
      email: "michael.chen@example.com",
      items: 2,
      total: 2850,
      status: "preparing",
      date: "2024-04-18",
      time: "11:15 AM",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      orderItems: [
        { name: "Beef Steak", quantity: 1, price: 2499 }
      ],
      deliveryFee: 299,
      tax: 250
    },
    {
      id: "ORD-2024-1232",
      customer: "Emma Davis",
      email: "emma.davis@example.com",
      items: 5,
      total: 6725,
      status: "pending",
      date: "2024-04-18",
      time: "11:45 AM",
      address: "789 Pine Rd, Chicago, IL 60601",
      orderItems: [
        { name: "Chicken Pasta", quantity: 2, price: 1399 },
        { name: "Fish & Chips", quantity: 1, price: 1599 },
        { name: "Vegetarian Bowl", quantity: 2, price: 1199 }
      ],
      deliveryFee: 299,
      tax: 613
    },
    {
      id: "ORD-2024-1231",
      customer: "James Wilson",
      email: "james.wilson@example.com",
      items: 1,
      total: 1299,
      status: "cancelled",
      date: "2024-04-18",
      time: "09:20 AM",
      address: "321 Elm St, Houston, TX 77001",
      orderItems: [
        { name: "Margherita Pizza", quantity: 1, price: 1299 }
      ],
      deliveryFee: 0,
      tax: 0
    },
    {
      id: "ORD-2024-1230",
      customer: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      items: 4,
      total: 5498,
      status: "delivered",
      date: "2024-04-17",
      time: "08:45 PM",
      address: "654 Maple Dr, Miami, FL 33101",
      orderItems: [
        { name: "Chicken Burger", quantity: 2, price: 999 },
        { name: "Beef Pizza", quantity: 1, price: 1499 },
        { name: "Chicken Tacos", quantity: 1, price: 1099 }
      ],
      deliveryFee: 299,
      tax: 500
    },
    {
      id: "ORD-2024-1229",
      customer: "Liam Brown",
      email: "liam.brown@example.com",
      items: 2,
      total: 2598,
      status: "delivered",
      date: "2024-04-17",
      time: "07:30 PM",
      address: "987 Cedar Ln, Seattle, WA 98101",
      orderItems: [
        { name: "Chicken Caesar Salad", quantity: 1, price: 899 },
        { name: "Fish & Chips", quantity: 1, price: 1599 }
      ],
      deliveryFee: 0,
      tax: 250
    },
    {
      id: "ORD-2024-1228",
      customer: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      items: 6,
      total: 7894,
      status: "preparing",
      date: "2024-04-17",
      time: "06:15 PM",
      address: "246 Birch Way, Boston, MA 02101",
      orderItems: [
        { name: "Beef Steak", quantity: 2, price: 2499 },
        { name: "Chicken Pasta", quantity: 1, price: 1399 },
        { name: "Chocolate Dessert", quantity: 3, price: 799 }
      ],
      deliveryFee: 299,
      tax: 719
    },
    {
      id: "ORD-2024-1227",
      customer: "Noah Anderson",
      email: "noah.anderson@example.com",
      items: 3,
      total: 3897,
      status: "delivered",
      date: "2024-04-17",
      time: "05:00 PM",
      address: "135 Spruce St, Denver, CO 80201",
      orderItems: [
        { name: "Beef Kebab", quantity: 1, price: 1999 },
        { name: "Chicken Burger", quantity: 1, price: 999 },
        { name: "Chocolate Dessert", quantity: 1, price: 799 }
      ],
      deliveryFee: 0,
      tax: 380
    }
  ];

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  const stats = {
    total: allOrders.length,
    pending: allOrders.filter(o => o.status === "pending").length,
    preparing: allOrders.filter(o => o.status === "preparing").length,
    delivered: allOrders.filter(o => o.status === "delivered").length,
    cancelled: allOrders.filter(o => o.status === "cancelled").length
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
            <p className="text-gray-600">View and manage all customer orders</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Orders</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.pending}</div>
            <div className="text-gray-600 text-sm">Pending</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.preparing}</div>
            <div className="text-gray-600 text-sm">Preparing</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.delivered}</div>
            <div className="text-gray-600 text-sm">Delivered</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.cancelled}</div>
            <div className="text-gray-600 text-sm">Cancelled</div>
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
                placeholder="Search by order ID, customer name, or email..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {["all", "pending", "preparing", "delivered", "cancelled"].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    filterStatus === status
                      ? status === "all"
                        ? "bg-purple-600 text-white"
                        : status === "pending"
                        ? "bg-yellow-600 text-white"
                        : status === "preparing"
                        ? "bg-blue-600 text-white"
                        : status === "delivered"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{order.date}</div>
                        <div className="text-sm text-gray-500">{order.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{order.items} items</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">{order.total.toLocaleString()} DA</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOrder(order.id)}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-purple-600"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-2">No orders found</div>
              <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (() => {
        const order = allOrders.find(o => o.id === selectedOrder);
        if (!order) return null;

        const subtotal = order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-3xl w-full my-8"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-sm text-gray-600 mt-1">Order ID: {order.id}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Customer Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{order.customer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{order.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700 md:col-span-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{order.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <div className="font-semibold text-gray-900">{order.date}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <div className="font-semibold text-gray-900">{order.time}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} DA</div>
                          <div className="text-xs text-gray-500">{item.price.toLocaleString()} DA each</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">{subtotal.toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Fee</span>
                      <span className="font-semibold">{order.deliveryFee.toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">{order.tax.toLocaleString()} DA</span>
                    </div>
                    <div className="border-t border-purple-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                          {order.total.toLocaleString()} DA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-200 flex gap-3">
                {order.status === "pending" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Accept Order
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Cancel Order
                    </motion.button>
                  </>
                )}
                {order.status === "preparing" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Mark as Ready
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedOrder(null)}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </div>
  );
}
