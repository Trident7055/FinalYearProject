import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { mockInventory, mockSales, mockMonthlySales, mockUser } from '@/utils/mockData';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { LiveMonitoring } from '@/app/components/LiveMonitoring';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  BarChart3,
  TrendingDown,
  Settings,
  Search,
  Bell,
  Globe,
  User,
  Menu,
  IndianRupee,
  Leaf,
  Download,
  Video,
} from 'lucide-react';

export function WebDashboard() {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'sales' | 'analytics' | 'forecast' | 'monitoring' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const totalStock = mockInventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalSalesValue = 15480;
  const profitPercent = 28;
  const wastageReduced = 15;

  const stockData = mockInventory.slice(0, 5).map(item => ({
    name: t(item.name as keyof typeof import('@/utils/translations').translations, language),
    value: item.quantity,
  }));

  const COLORS = ['#4CAF50', '#FFD65A', '#FF6B6B', '#4ECDC4', '#95E1D3'];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && <h2 className="text-xl">{t('appTitle', language)}</h2>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            {sidebarOpen && <span>{t('dashboard', language)}</span>}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'products' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5" />
            {sidebarOpen && <span>{t('products', language)}</span>}
          </button>

          <button
            onClick={() => setActiveTab('sales')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'sales' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            {sidebarOpen && <span>{t('sales', language)}</span>}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'analytics' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span>{t('analytics', language)}</span>}
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'forecast' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <TrendingDown className="w-5 h-5" />
            {sidebarOpen && <span>{t('forecast', language)}</span>}
          </button>

          <button
            onClick={() => setActiveTab('monitoring')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'monitoring' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Video className="w-5 h-5" />
            {sidebarOpen && <span>{t('liveMonitoring', language)}</span>}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'settings' ? 'bg-[#4CAF50] text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>{t('settings', language)}</span>}
          </button>
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t hover:bg-gray-50"
        >
          <Menu className="w-5 h-5 mx-auto" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
<div className="sticky top-0 z-40 bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder={language === 'en' ? 'Search...' : language === 'hi' ? 'खोजें...' : 'शोधा...'}
              className="border-0 focus:ring-0"
            />
            
          </div>

          <div className="flex items-center gap-4">
            
            {/* Language Selector */}
            <div className="flex gap-2 flex">
              <Button
                size="sm"
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-[#4CAF50]' : ''}
              >
                EN
              </Button>
              <Button
                size="sm"
                variant={language === 'hi' ? 'default' : 'outline'}
                onClick={() => setLanguage('hi')}
                className={language === 'hi' ? 'bg-[#4CAF50]' : ''}
              >
                HI
              </Button>
              <Button
                size="sm"
                variant={language === 'mr' ? 'default' : 'outline'}
                onClick={() => setLanguage('mr')}
                className={language === 'mr' ? 'bg-[#4CAF50]' : ''}
              >
                MR
              </Button>
            </div>

            <Button size="icon" variant="ghost" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>

            <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center text-white">
              {mockUser.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-3xl">
                {t('welcome', language)}, {mockUser.name} 👋
              </h1>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{t('totalStock', language)}</p>
                      <p className="text-4xl mt-2">{totalStock}</p>
                      <p className="text-sm text-gray-500 mt-1">{t('kg', language)}</p>
                    </div>
                    <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                      <Package className="w-7 h-7 text-[#4CAF50]" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{t('totalSales', language)}</p>
                      <p className="text-4xl mt-2">₹{totalSalesValue}</p>
                      <p className="text-sm text-green-600 mt-1">+12% {language === 'en' ? 'today' : language === 'hi' ? 'आज' : 'आज'}</p>
                    </div>
                    <div className="w-14 h-14 bg-[#FFD65A]/20 rounded-xl flex items-center justify-center">
                      <IndianRupee className="w-7 h-7 text-[#FFD65A]" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{t('profit', language)}</p>
                      <p className="text-4xl mt-2">{profitPercent}%</p>
                      <p className="text-sm text-green-600 mt-1">
                        <TrendingUp className="w-3 h-3 inline" /> {language === 'en' ? 'Good' : language === 'hi' ? 'अच्छा' : 'चांगले'}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{t('wastageReduced', language)}</p>
                      <p className="text-4xl mt-2">{wastageReduced}%</p>
                      <p className="text-sm text-gray-500 mt-1">{language === 'en' ? 'This month' : language === 'hi' ? 'इस महीने' : 'या महिन्यात'}</p>
                    </div>
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                      <Leaf className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl mb-4">{t('stockComposition', language)}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={stockData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => entry.name}
                        outerRadius={100}
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

                <Card className="p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl mb-4">{t('monthlySales', language)}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockMonthlySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#4CAF50" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Latest Transactions */}
              <Card className="p-6 rounded-2xl shadow-md">
                <h3 className="text-xl mb-4">{language === 'en' ? 'Latest Transactions' : language === 'hi' ? 'नवीनतम लेनदेन' : 'ताज्या व्यवहार'}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date', language)}</TableHead>
                      <TableHead>{t('item', language)}</TableHead>
                      <TableHead>{t('quantity', language)}</TableHead>
                      <TableHead className="text-right">{t('total', language)}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSales.slice(0, 5).map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>
                          {t(sale.item as keyof typeof import('@/utils/translations').translations, language)}
                        </TableCell>
                        <TableCell>
                          {sale.quantity} {t('kg', language)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          ₹{sale.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">{t('products', language)}</h1>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049]">
                  {t('addNewItem', language)}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockInventory.map(item => (
                  <Card key={item.id} className="p-6 rounded-2xl shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{item.emoji}</span>
                      <div className="text-right">
                        <p className="text-2xl">{item.quantity}</p>
                        <p className="text-sm text-gray-600">{t('kg', language)}</p>
                      </div>
                    </div>
                    <h3 className="text-xl mb-2">
                      {t(item.name as keyof typeof import('@/utils/translations').translations, language)}
                    </h3>
                    <p className="text-green-600 text-xl">₹{item.price}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">{t('sales', language)}</h1>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049]">
                  <Download className="w-4 h-4 mr-2" />
                  {t('exportCSV', language)}
                </Button>
              </div>

              <Card className="p-6 rounded-2xl shadow-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('date', language)}</TableHead>
                      <TableHead>{t('item', language)}</TableHead>
                      <TableHead>{t('quantity', language)}</TableHead>
                      <TableHead className="text-right">{t('total', language)}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>
                          {t(sale.item as keyof typeof import('@/utils/translations').translations, language)}
                        </TableCell>
                        <TableCell>
                          {sale.quantity} {t('kg', language)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          ₹{sale.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">{t('analytics', language)}</h1>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[#4CAF50]">{t('day', language)}</Button>
                  <Button size="sm" variant="outline">{t('week', language)}</Button>
                  <Button size="sm" variant="outline">{t('month', language)}</Button>
                </div>
              </div>

              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{language === 'en' ? 'Avg Daily Sales' : language === 'hi' ? 'औसत दैनिक बिक्री' : 'सरासरी दैनिक विक्री'}</p>
                      <p className="text-3xl mt-2">₹{Math.round(totalSalesValue / 7)}</p>
                      <p className="text-sm text-green-600 mt-1">+8.5% {language === 'en' ? 'vs last week' : language === 'hi' ? 'बनाम पिछला सप्ताह' : 'विरुद्ध मागील आठवडा'}</p>
                    </div>
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{language === 'en' ? 'Total Transactions' : language === 'hi' ? 'कुल लेनदेन' : 'एकूण व्यवहार'}</p>
                      <p className="text-3xl mt-2">{mockSales.length}</p>
                      <p className="text-sm text-gray-600 mt-1">{language === 'en' ? 'This week' : language === 'hi' ? 'इस हफ्ते' : 'या आठवड्यात'}</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{language === 'en' ? 'Best Seller' : language === 'hi' ? 'सबसे बेहतरीन विक्रेता' : 'सर्वोत्तम विक्रेता'}</p>
                      <p className="text-2xl mt-2">{t('apple', language)}</p>
                      <p className="text-sm text-gray-600 mt-1">12 {t('kg', language)}</p>
                    </div>
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                      🍎
                    </div>
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600">{language === 'en' ? 'Revenue Growth' : language === 'hi' ? 'राजस्व वृद्धि' : 'राजस्व वाढ'}</p>
                      <p className="text-3xl mt-2">24.5%</p>
                      <p className="text-sm text-green-600 mt-1">↑ {language === 'en' ? 'YoY' : language === 'hi' ? 'साल दर साल' : 'वर्षानुवर्षी'}</p>
                    </div>
                    <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <IndianRupee className="w-7 h-7 text-yellow-600" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl mb-4">{language === 'en' ? 'Daily Revenue Trend' : language === 'hi' ? 'दैनिक राजस्व प्रवृत्ति' : 'दैनिक राजस्व प्रवृत्ती'}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockMonthlySales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#4CAF50" strokeWidth={2} dot={{ fill: '#4CAF50' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl mb-4">{language === 'en' ? 'Product Performance' : language === 'hi' ? 'उत्पाद प्रदर्शन' : 'उत्पाद कार्यप्रणाली'}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: t('apple', language), sales: 45, profit: 24 },
                      { name: t('banana', language), sales: 30, profit: 13 },
                      { name: t('tomato', language), sales: 38, profit: 22 },
                      { name: t('mango', language), sales: 35, profit: 18 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#4CAF50" />
                      <Bar dataKey="profit" fill="#FFD65A" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Top Products Table */}
              <Card className="p-6 rounded-2xl shadow-md">
                <h3 className="text-xl mb-4">{language === 'en' ? 'Top Performing Products' : language === 'hi' ? 'शीर्ष प्रदर्शन करने वाली उत्पाद' : 'शीर्ष कार्यप्रदर्शन उत्पाद'}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('item', language)}</TableHead>
                      <TableHead>{language === 'en' ? 'Units Sold' : language === 'hi' ? 'बेची गई इकाई' : 'विक्री केलेली इकाई'}</TableHead>
                      <TableHead>{language === 'en' ? 'Revenue' : language === 'hi' ? 'राजस्व' : 'राजस्व'}</TableHead>
                      <TableHead>{language === 'en' ? 'Growth' : language === 'hi' ? 'वृद्धि' : 'वाढ'}</TableHead>
                      <TableHead className="text-right">{language === 'en' ? 'Rating' : language === 'hi' ? 'रेटिंग' : 'रेटिंग'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { item: 'apple', units: 45, revenue: 5400, growth: 12.5, rating: 4.8 },
                      { item: 'mango', units: 35, revenue: 5250, growth: 18.3, rating: 4.6 },
                      { item: 'tomato', units: 38, revenue: 1140, growth: 8.2, rating: 4.4 },
                      { item: 'banana', units: 30, revenue: 1200, growth: -5.2, rating: 4.2 },
                      { item: 'orange', units: 28, revenue: 2240, growth: 6.7, rating: 4.7 },
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {t(row.item as keyof typeof import('@/utils/translations').translations, language)}
                        </TableCell>
                        <TableCell>{row.units} kg</TableCell>
                        <TableCell className="text-green-600 font-medium">₹{row.revenue}</TableCell>
                        <TableCell className={row.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                          {row.growth > 0 ? '+' : ''}{row.growth}%
                        </TableCell>
                        <TableCell className="text-right">⭐ {row.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <h1 className="text-3xl">{t('forecast', language)}</h1>
              
              <Card className="p-6 rounded-2xl shadow-md">
                <h3 className="text-xl mb-4">{t('nextWeekDemand', language)}</h3>
                <div className="space-y-4">
                  {mockInventory.slice(0, 4).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4 flex-wrap justify-end">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <p className="font-medium">
                            {t(item.name as keyof typeof import('@/utils/translations').translations, language)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Current stock' : language === 'hi' ? 'वर्तमान स्टॉक' : 'सध्याचा स्टॉक'}: {item.quantity} {t('kg', language)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-[#4CAF50]">
                          {Math.round(item.quantity * 1.3)} {t('kg', language)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {language === 'en' ? 'Predicted demand' : language === 'hi' ? 'अनुमानित मांग' : 'अंदाजे मागणी'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <LiveMonitoring />
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-3xl">{t('settings', language)}</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl mb-4">{t('language', language)}</h3>
                  <div className="space-y-3">
                    {(['en', 'hi', 'mr'] as Language[]).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`w-full p-4 rounded-xl text-left flex items-center justify-between transition-colors ${
                          language === lang ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <span>
                          {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी (Hindi)' : 'मराठी (Marathi)'}
                        </span>
                        {language === lang && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl mb-4">
                    {language === 'en' ? 'IoT Device' : language === 'hi' ? 'IoT डिवाइस' : 'IoT उपकरण'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-[#4CAF50]">
                      <div>
                        <p className="font-medium">Smart Scale v2.0</p>
                        <p className="text-sm text-gray-600">
                          {language === 'en' ? 'Connected' : language === 'hi' ? 'कनेक्ट हो गया' : 'कनेक्ट झाले'}
                        </p>
                      </div>
                      <div className="w-3 h-3 bg-[#4CAF50] rounded-full animate-pulse" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}