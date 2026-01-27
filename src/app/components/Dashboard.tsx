import React, { useEffect, useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { t } from '@/utils/translations';
import { mockInventory, mockMonthlySales, mockUser } from '@/utils/mockData';
import { mockNotifications } from '@/utils/mockNotifications';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Package, IndianRupee, Leaf, Plus, Search, Bell, ChevronDown } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { toast } from 'sonner';

export function Dashboard() {
  const { language, setLanguage } = useLanguage();
  const { user } = useUser();
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    emoji: '',
    quantity: '',
    unit: 'kg',
    price: '',
  });

  const emojiCategories = {
    fruits: {
      apple: { name: 'Apple', emojis: ['🍎', '🍏', '🍐'] },
      banana: { name: 'Banana', emojis: ['🍌'] },
      orange: { name: 'Orange', emojis: ['🍊'] },
      grapes: { name: 'Grapes', emojis: ['🍇'] },
    },
    vegetables: {
      tomato: { name: 'Tomato', emojis: ['🍅'] },
      potato: { name: 'Potato', emojis: ['🥔'] },
      carrot: { name: 'Carrot', emojis: ['🥕'] },
      broccoli: { name: 'Broccoli', emojis: ['🥦'] },
      onion: { name: 'Onion', emojis: ['🧅'] },
      spinach: { name: 'Spinach', emojis: ['🥬'] },
    },
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.emoji || !newItem.quantity || !newItem.price) {
      toast.error(
        language === 'en'
          ? 'Please fill all fields'
          : language === 'hi'
          ? 'कृपया सभी फील्ड भरें'
          : 'कृपया सर्व फील्ड भरा'
      );
      return;
    }

    const item = {
      id: inventory.length + 1,
      name: newItem.name.toLowerCase() as any,
      emoji: newItem.emoji,
      quantity: parseInt(newItem.quantity),
      unit: newItem.unit,
      price: parseInt(newItem.price),
    };

    try {
      setInventory((prevInventory) => [...prevInventory, item]);
      setNewItem({ name: '', emoji: '', quantity: '', unit: 'kg', price: '' });
      setIsAddItemOpen(false);
      toast.success(
        language === 'en'
          ? 'Item added successfully!'
          : language === 'hi'
          ? 'वस्तु सफलतापूर्वक जोड़ी गई!'
          : 'वस्तू यशस्वीरित्या जोडली गई!'
      );
    } catch (error) {
      toast.error(
        language === 'en'
          ? 'Failed to add item'
          : language === 'hi'
          ? 'वस्तु जोड़ने में विफल'
          : 'वस्तू जोडण्यात अयशस्वी'
      );
    }
  };

  const displayName = user?.ownerName || mockUser.name;
  const displayShopName = user?.storeName || mockUser.shopName;

  // Add initial notifications on component mount
  useEffect(() => {
    const hasNotifications = localStorage.getItem('notificationsLoaded');
    if (!hasNotifications) {
      mockNotifications.slice(0, 8).forEach((notif) => {
        addNotification(notif);
      });
      localStorage.setItem('notificationsLoaded', 'true');
    }
  }, [addNotification]);

  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalSalesValue = 15480;
  const profitPercent = 28;
  const wastageReduced = 15;

  const stockData = inventory.slice(0, 5).map(item => ({
    name: t(item.name as keyof typeof import('@/utils/translations').translations, language),
    value: item.quantity,
  }));

  const COLORS = ['#4CAF50', '#FFD65A', '#FF6B6B', '#4ECDC4', '#95E1D3'];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Sticky Header - Web-like Style */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo/Branding */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              🌿
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-gray-900">Smart Inventory</span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-sm relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500 text-sm rounded-lg"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center justify-end gap-2">
            {/* Mobile Search Icon (Mobile only) */}
            <button className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switch */}
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="text-xs h-9 px-2 text-gray-700 border-gray-300"
              >
                {language.toUpperCase()}
              </Button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-t-lg ${
                      language === 'en' ? 'bg-[#4CAF50] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm ${
                      language === 'hi' ? 'bg-[#4CAF50] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    HI
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('mr');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-b-lg ${
                      language === 'mr' ? 'bg-[#4CAF50] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    MR
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <NotificationBell />

            {/* Profile Button */}
            <button className="w-9 h-9 bg-[#4CAF50] rounded-full flex items-center justify-center text-white hover:bg-[#45a049] font-semibold text-sm">
              {displayName.charAt(0)}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Visible on mobile only) */}
        <div className="sm:hidden mt-3 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500 text-sm rounded-lg"
          />
        </div>
      </div>

      {/* Greeting Section */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('welcome', language)}, {displayName} 👋
        </h1>
        <p className="text-gray-600 text-sm mt-1">{displayShopName}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalStock', language)}</p>
                <p className="text-3xl mt-1">{totalStock}</p>
                <p className="text-xs text-gray-500 mt-1">{t('kg', language)}</p>
              </div>
              <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-[#4CAF50]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalSales', language)}</p>
                <p className="text-3xl mt-1">₹{totalSalesValue}</p>
                <p className="text-xs text-green-600 mt-1">+12% {language === 'en' ? 'today' : language === 'hi' ? 'आज' : 'आज'}</p>
              </div>
              <div className="w-12 h-12 bg-[#FFD65A]/20 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-[#FFD65A]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('profit', language)}</p>
                <p className="text-3xl mt-1">{profitPercent}%</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 inline" /> {language === 'en' ? 'Good' : language === 'hi' ? 'अच्छा' : 'चांगले'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('wastageReduced', language)}</p>
                <p className="text-3xl mt-1">{wastageReduced}%</p>
                <p className="text-xs text-gray-500 mt-1">{language === 'en' ? 'This month' : language === 'hi' ? 'इस महीने' : 'या महिन्यात'}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Inventory Items Grid */}
        {inventory.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{language === 'en' ? 'Your Inventory' : language === 'hi' ? 'आपका इन्वेंटरी' : 'आपचे इन्व्हेंटरी'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inventory.map(item => {
                const allCategories = { ...emojiCategories.fruits, ...emojiCategories.vegetables };
                const translatedName = allCategories[item.name]?.name || item.name.charAt(0).toUpperCase() + item.name.slice(1);
                return (
                  <Card key={item.id} className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{item.emoji}</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{item.quantity}</p>
                        <p className="text-xs text-gray-600">{t('kg', language)}</p>
                      </div>
                    </div>
                    <h3 className="text-lg mb-1 font-semibold text-gray-900">
                      {translatedName}
                    </h3>
                    <p className="text-green-600 text-lg font-bold">₹{item.price}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Stock Composition Chart */}
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl mb-4">{t('stockComposition', language)}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Sales Chart */}
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl mb-4">{t('monthlySales', language)}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockMonthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Expandable Analytics Section */}
        <Card className="p-4 rounded-2xl shadow-md bg-white">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">{t('analytics', language)}</h3>
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showAnalytics ? 'rotate-180' : ''}`} />
          </button>
          
          {showAnalytics && (
            <div className="mt-4 pt-4 border-t space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Avg Daily Sales' : language === 'hi' ? 'औसत दैनिक बिक्री' : 'सरासरी दैनिक विक्री'}</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">₹2,210</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Growth Rate' : language === 'hi' ? 'वृद्धि दर' : 'वृद्धी दर'}</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">+15.2%</p>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Avg Order Value' : language === 'hi' ? 'औसत आदेश मूल्य' : 'सरासरी ऑर्डर मूल्य'}</p>
                  <p className="text-2xl font-bold text-purple-600 mt-2">₹3,240</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Best Seller' : language === 'hi' ? 'सर्वश्रेष्ठ विक्रेता' : 'सर्वश्रेष्ठ विक्रेता'}</p>
                  <p className="text-2xl font-bold text-orange-600 mt-2">🍎 Apple</p>
                </Card>
              </div>
            </div>
          )}
        </Card>

        {/* Expandable Forecast Section */}
        <Card className="p-4 rounded-2xl shadow-md bg-white">
          <button
            onClick={() => setShowForecast(!showForecast)}
            className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">{language === 'en' ? 'Demand Forecast' : language === 'hi' ? 'मांग पूर्वानुमान' : 'मागणी पूर्वानुमान'}</h3>
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showForecast ? 'rotate-180' : ''}`} />
          </button>
          
          {showForecast && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {inventory.slice(0, 4).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-medium text-sm">{t(item.name as keyof typeof import('@/utils/translations').translations, language)}</p>
                      <p className="text-xs text-gray-600">{language === 'en' ? 'Current' : language === 'hi' ? 'वर्तमान' : 'सध्या'}: {item.quantity} {t('kg', language)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#4CAF50]">{Math.round(item.quantity * 1.3)}</p>
                    <p className="text-xs text-gray-600">{language === 'en' ? 'Pred.' : language === 'hi' ? 'अनु.' : 'अंदा.'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Floating Add Button */}
      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <button
          onClick={() => setIsAddItemOpen(true)}
          className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-[#4CAF50] hover:bg-[#45a049] shadow-2xl flex items-center justify-center text-white transition-all"
        >
          <Plus className="w-8 h-8" />
        </button>

        <DialogContent className="sm:max-w-[500px] w-11/12">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Add New Item' : language === 'hi' ? 'नई वस्तु जोड़ें' : 'नवीन वस्तू जोडा'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Item Name */}
            <div>
              <Label>{language === 'en' ? 'Item Name' : language === 'hi' ? 'वस्तु का नाम' : 'वस्तूचे नाव'}</Label>
              <Input
                placeholder={language === 'en' ? 'e.g., Apple' : language === 'hi' ? 'उदा. सेब' : 'उदा. सेब'}
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>

            {/* Emoji Selection */}
            <div>
              <Label>{language === 'en' ? 'Emoji' : language === 'hi' ? 'इमोजी' : 'इमोजी'}</Label>
              <div className="space-y-3">
                {/* Fruits */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    {language === 'en' ? '🍎 Fruits' : language === 'hi' ? '🍎 फल' : '🍎 फळ'}
                  </p>
                  <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 rounded-lg border">
                    {Object.entries(emojiCategories.fruits).map(([key, category]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedEmojiCategory(key);
                          setNewItem({ ...newItem, emoji: category.emojis[0] });
                        }}
                        className={`text-2xl p-2 rounded-lg transition-all ${
                          selectedEmojiCategory === key
                            ? 'bg-[#4CAF50] ring-2 ring-[#4CAF50] scale-110'
                            : 'bg-white hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {category.emojis[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vegetables */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    {language === 'en' ? '🥬 Vegetables' : language === 'hi' ? '🥬 सब्जियां' : '🥬 भाज्या'}
                  </p>
                  <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 rounded-lg border">
                    {Object.entries(emojiCategories.vegetables).map(([key, category]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedEmojiCategory(key);
                          setNewItem({ ...newItem, emoji: category.emojis[0] });
                        }}
                        className={`text-2xl p-2 rounded-lg transition-all ${
                          selectedEmojiCategory === key
                            ? 'bg-[#4CAF50] ring-2 ring-[#4CAF50] scale-110'
                            : 'bg-white hover:bg-gray-200 border border-gray-200'
                        }`}
                      >
                        {category.emojis[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Selected: ' : language === 'hi' ? 'चयनित: ' : 'निवडलेले: '}{newItem.emoji || '🍎'}
                </p>
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'en' ? 'Quantity' : language === 'hi' ? 'मात्रा' : 'प्रमाण'}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'en' ? 'Price (₹)' : language === 'hi' ? 'कीमत (₹)' : 'किंमत (₹)'}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-[#4CAF50] hover:bg-[#45a049]"
                onClick={handleAddItem}
              >
                {language === 'en' ? 'Add Item' : language === 'hi' ? 'वस्तु जोड़ें' : 'वस्तू जोडा'}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsAddItemOpen(false)}
              >
                {language === 'en' ? 'Cancel' : language === 'hi' ? 'रद्द करें' : 'रद्द करा'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
