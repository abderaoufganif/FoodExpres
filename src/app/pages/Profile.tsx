import { motion } from "motion/react";
import { Camera, User, Mail, Phone, MapPin, CreditCard, Package, LogOut, Edit2, Save, X, ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import AddAddressDialog from "../components/AddAddressDialog";
import EditAddressDialog from "../components/EditAddressDialog";
import AddCardDialog from "../components/AddCardDialog";
import EditCardDialog from "../components/EditCardDialog";

export default function Profile() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses" | "payment">("profile");

  const [userInfo, setUserInfo] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY"
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const orderHistory = [
    {
      id: "ORD-2024-001",
      date: "April 8, 2026",
      items: 3,
      total: 4599,
      status: "Delivered"
    },
    {
      id: "ORD-2024-002",
      date: "April 5, 2026",
      items: 2,
      total: 2850,
      status: "Delivered"
    },
    {
      id: "ORD-2024-003",
      date: "April 2, 2026",
      items: 5,
      total: 6725,
      status: "Delivered"
    }
  ];

  // Dialog states
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isEditCardOpen, setIsEditCardOpen] = useState(false);

  // Addresses and Cards data
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      label: "Home",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      zipCode: "10001",
      isDefault: true
    },
    {
      id: "addr-2",
      label: "Work",
      street: "456 Business Ave, Suite 200",
      city: "New York",
      zipCode: "10002",
      isDefault: false
    }
  ]);

  const [cards, setCards] = useState([
    {
      id: "card-1",
      cardNumber: "•••• •••• •••• 4242",
      cardHolder: "SARAH JOHNSON",
      expiryDate: "12/26",
      cardType: "VISA",
      isDefault: true
    },
    {
      id: "card-2",
      cardNumber: "•••• •••• •••• 8888",
      cardHolder: "SARAH JOHNSON",
      expiryDate: "09/27",
      cardType: "MC",
      isDefault: false
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState<typeof addresses[0] | null>(null);
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);

  // Handlers
  const handleAddAddress = (newAddress: any) => {
    const address = {
      ...newAddress,
      id: `addr-${Date.now()}`
    };
    if (newAddress.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(address));
    } else {
      setAddresses(prev => [...prev, address]);
    }
  };

  const handleEditAddress = (editedAddress: any) => {
    if (editedAddress.isDefault) {
      setAddresses(prev => prev.map(a =>
        a.id === editedAddress.id ? editedAddress : { ...a, isDefault: false }
      ));
    } else {
      setAddresses(prev => prev.map(a =>
        a.id === editedAddress.id ? editedAddress : a
      ));
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleAddCard = (newCard: any) => {
    const lastFour = newCard.cardNumber.replace(/\s/g, "").slice(-4);
    const card = {
      ...newCard,
      id: `card-${Date.now()}`,
      cardNumber: `•••• •••• •••• ${lastFour}`
    };
    if (newCard.isDefault) {
      setCards(prev => prev.map(c => ({ ...c, isDefault: false })).concat(card));
    } else {
      setCards(prev => [...prev, card]);
    }
  };

  const handleEditCard = (editedCard: any) => {
    if (editedCard.isDefault) {
      setCards(prev => prev.map(c =>
        c.id === editedCard.id ? editedCard : { ...c, isDefault: false }
      ));
    } else {
      setCards(prev => prev.map(c =>
        c.id === editedCard.id ? editedCard : c
      ));
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            >
              FoodExpress
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</Link>
            <Link to="/profile" className="text-orange-500 font-semibold">Profile</Link>
          </div>
          <Link to="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">My Profile</h1>
            <p className="text-lg text-white/90">Manage your account and preferences</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-md sticky top-24"
            >
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Camera className="w-5 h-5" />
                  </motion.button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">{userInfo.name}</h2>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "profile"
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Info
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "orders"
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Order History
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "addresses"
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  Saved Addresses
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "payment"
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </motion.button>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full mt-6 flex items-center justify-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Info Tab */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg font-semibold hover:bg-orange-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </motion.button>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-200 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </motion.button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.name}
                        onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userInfo.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedInfo.email}
                        onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userInfo.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedInfo.phone}
                        onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userInfo.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.location}
                        onChange={(e) => setEditedInfo({ ...editedInfo, location: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      {orderHistory.length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      250
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Reward Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      $142
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Total Spent</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Order History Tab */}
            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

                <div className="space-y-4">
                  {orderHistory.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {order.items} items
                        </div>
                        <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                          {order.total.toLocaleString()} DA
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
                      >
                        Reorder
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === "addresses" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddAddressOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold"
                  >
                    Add New
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border-2 rounded-xl p-6 ${
                        address.isDefault
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-5 h-5 ${address.isDefault ? "text-orange-600" : "text-gray-600"}`} />
                          <span className="font-semibold text-gray-900">{address.label}</span>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-orange-200 text-orange-700 rounded-full text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        {address.street}<br />
                        {address.city}, {address.zipCode}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedAddress(address);
                            setIsEditAddressOpen(true);
                          }}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            address.isDefault
                              ? "bg-white text-orange-600 border border-orange-600 hover:bg-orange-50"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Edit
                        </motion.button>
                        {!address.isDefault && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteAddress(address.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </motion.button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddCardOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold"
                  >
                    Add Card
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {cards.map((card) => {
                    const cardColors = {
                      VISA: "from-blue-600 to-blue-400",
                      MC: "from-orange-600 to-orange-400",
                      AMEX: "from-green-600 to-green-400",
                      DISC: "from-purple-600 to-purple-400"
                    };

                    return (
                      <div
                        key={card.id}
                        className={`border-2 rounded-xl p-6 ${
                          card.isDefault
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-8 bg-gradient-to-r ${cardColors[card.cardType as keyof typeof cardColors]} rounded flex items-center justify-center text-white font-bold text-xs`}>
                              {card.cardType}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{card.cardNumber}</div>
                              <div className="text-sm text-gray-600">Expires {card.expiryDate}</div>
                            </div>
                          </div>
                          {card.isDefault && (
                            <span className="px-2 py-1 bg-orange-200 text-orange-700 rounded-full text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedCard(card);
                              setIsEditCardOpen(true);
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                              card.isDefault
                                ? "bg-white text-orange-600 border border-orange-600 hover:bg-orange-50"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Edit
                          </motion.button>
                          {!card.isDefault && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteCard(card.id)}
                              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </motion.button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddAddressDialog
        open={isAddAddressOpen}
        onOpenChange={setIsAddAddressOpen}
        onAdd={handleAddAddress}
      />
      <EditAddressDialog
        open={isEditAddressOpen}
        onOpenChange={setIsEditAddressOpen}
        address={selectedAddress}
        onSave={handleEditAddress}
      />
      <AddCardDialog
        open={isAddCardOpen}
        onOpenChange={setIsAddCardOpen}
        onAdd={handleAddCard}
      />
      <EditCardDialog
        open={isEditCardOpen}
        onOpenChange={setIsEditCardOpen}
        card={selectedCard}
        onSave={handleEditCard}
      />
    </div>
  );
}
