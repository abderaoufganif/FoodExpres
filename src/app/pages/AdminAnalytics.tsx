import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  const revenueData = {
    week: { current: 45890, previous: 38920, change: 17.9 },
    month: { current: 178450, previous: 165300, change: 8.0 },
    year: { current: 2145600, previous: 1987200, change: 8.0 }
  };

  const ordersData = {
    week: { current: 342, previous: 298, change: 14.8 },
    month: { current: 1456, previous: 1342, change: 8.5 },
    year: { current: 17893, previous: 16234, change: 10.2 }
  };

  const currentRevenue = revenueData[timeRange];
  const currentOrders = ordersData[timeRange];

  const topCategories = [
    { name: "Burgers", revenue: 245670, orders: 1234, percentage: 28 },
    { name: "Pizza", revenue: 198450, orders: 987, percentage: 23 },
    { name: "Seafood", revenue: 156230, orders: 543, percentage: 18 },
    { name: "Steaks", revenue: 134560, orders: 432, percentage: 15 },
    { name: "Others", revenue: 112890, orders: 678, percentage: 16 }
  ];

  const salesByHour = [
    { hour: "6 AM", orders: 12 },
    { hour: "9 AM", orders: 45 },
    { hour: "12 PM", orders: 156 },
    { hour: "3 PM", orders: 89 },
    { hour: "6 PM", orders: 234 },
    { hour: "9 PM", orders: 178 },
    { hour: "12 AM", orders: 34 }
  ];

  const maxOrders = Math.max(...salesByHour.map(s => s.orders));

  const customerMetrics = [
    { label: "Total Customers", value: "3,567", change: "+12.5%", trend: "up" },
    { label: "New Customers", value: "234", change: "+8.3%", trend: "up" },
    { label: "Returning Rate", value: "68%", change: "+5.2%", trend: "up" },
    { label: "Avg Order Value", value: "2,340 DA", change: "-2.1%", trend: "down" }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Track your business performance</p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange("week")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                timeRange === "week"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Week
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange("month")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                timeRange === "month"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Month
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange("year")}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                timeRange === "year"
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Year
            </motion.button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Total Revenue</h3>
                  <p className="text-3xl font-bold text-gray-900">{currentRevenue.current.toLocaleString()} DA</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${currentRevenue.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {currentRevenue.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="font-bold">{Math.abs(currentRevenue.change)}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Previous {timeRange}:</span>
              <span className="font-semibold">{currentRevenue.previous.toLocaleString()} DA</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Total Orders</h3>
                  <p className="text-3xl font-bold text-gray-900">{currentOrders.current.toLocaleString()}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${currentOrders.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {currentOrders.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="font-bold">{Math.abs(currentOrders.change)}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Previous {timeRange}:</span>
              <span className="font-semibold">{currentOrders.previous.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>

        {/* Customer Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {customerMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                metric.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {metric.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Revenue by Category</h2>
            </div>
            <div className="p-6 space-y-4">
              {topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{category.revenue.toLocaleString()} DA</div>
                      <div className="text-xs text-gray-500">{category.orders} orders</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sales by Hour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Orders by Time of Day</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {salesByHour.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-semibold text-gray-600">{data.hour}</div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-8 bg-gray-200 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.orders / maxOrders) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-end pr-2"
                        >
                          {data.orders > 50 && (
                            <span className="text-xs font-bold text-white">{data.orders}</span>
                          )}
                        </motion.div>
                      </div>
                      {data.orders <= 50 && (
                        <span className="text-sm font-bold text-gray-900 w-10">{data.orders}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
