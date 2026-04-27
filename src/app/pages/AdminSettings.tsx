import { motion } from "motion/react";
import { ArrowLeft, Save, Bell, Mail, Lock, Globe, DollarSign, Truck, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "payment" | "delivery">("general");
  const [settings, setSettings] = useState({
    // General
    siteName: "FoodExpress",
    siteEmail: "admin@foodexpress.com",
    sitePhone: "+1 (555) 000-0000",
    currency: "DA",
    timezone: "UTC+1",
    language: "en",

    // Notifications
    emailNotifications: true,
    orderNotifications: true,
    userNotifications: true,
    stockAlerts: true,
    dailyReport: false,

    // Payment
    taxRate: 10,
    deliveryFee: 299,
    freeDeliveryThreshold: 3000,
    minOrderAmount: 500,

    // Delivery
    estimatedDeliveryTime: "30-45",
    maxDeliveryRadius: "15",
    enableScheduledDelivery: true,
    enableContactlessDelivery: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log("Settings saved:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payment", label: "Payment", icon: DollarSign },
    { id: "delivery", label: "Delivery", icon: Truck }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your application settings and preferences</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              saved
                ? "bg-green-600 text-white"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            <Save className="w-5 h-5" />
            {saved ? "Saved!" : "Save Changes"}
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-4 space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md p-8">
              {/* General Settings */}
              {activeTab === "general" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">General Settings</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Email
                      </label>
                      <input
                        type="email"
                        value={settings.siteEmail}
                        onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.sitePhone}
                        onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="DA">Algerian Dinar (DA)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="UTC+1">UTC+1 (Algeria)</option>
                        <option value="UTC-5">UTC-5 (EST)</option>
                        <option value="UTC-8">UTC-8 (PST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="ar">Arabic</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                      { key: "orderNotifications", label: "Order Notifications", desc: "Get notified about new orders" },
                      { key: "userNotifications", label: "User Notifications", desc: "Get notified about new user registrations" },
                      { key: "stockAlerts", label: "Stock Alerts", desc: "Receive alerts when products are low in stock" },
                      { key: "dailyReport", label: "Daily Report", desc: "Receive daily sales and analytics report" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-block w-14 h-8">
                          <input
                            type="checkbox"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-purple-600 transition-colors cursor-pointer"></span>
                          <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 cursor-pointer"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Payment Settings */}
              {activeTab === "payment" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Settings</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Fee (DA)
                      </label>
                      <input
                        type="number"
                        value={settings.deliveryFee}
                        onChange={(e) => setSettings({ ...settings, deliveryFee: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Free Delivery Threshold (DA)
                      </label>
                      <input
                        type="number"
                        value={settings.freeDeliveryThreshold}
                        onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Order Amount (DA)
                      </label>
                      <input
                        type="number"
                        value={settings.minOrderAmount}
                        onChange={(e) => setSettings({ ...settings, minOrderAmount: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Delivery Settings */}
              {activeTab === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Settings</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Delivery Time (minutes)
                      </label>
                      <input
                        type="text"
                        value={settings.estimatedDeliveryTime}
                        onChange={(e) => setSettings({ ...settings, estimatedDeliveryTime: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                        placeholder="30-45"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Delivery Radius (km)
                      </label>
                      <input
                        type="text"
                        value={settings.maxDeliveryRadius}
                        onChange={(e) => setSettings({ ...settings, maxDeliveryRadius: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "enableScheduledDelivery", label: "Scheduled Delivery", desc: "Allow customers to schedule delivery times" },
                      { key: "enableContactlessDelivery", label: "Contactless Delivery", desc: "Enable contactless delivery option" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-block w-14 h-8">
                          <input
                            type="checkbox"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-purple-600 transition-colors cursor-pointer"></span>
                          <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 cursor-pointer"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
