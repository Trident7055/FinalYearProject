import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { mockInventory, mockMonthlySales, mockUser } from '@/utils/mockData';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Package, IndianRupee, Leaf, Plus } from 'lucide-react';

export function Dashboard() {
  const { language } = useLanguage();

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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white p-6 rounded-b-3xl shadow-lg">
        <div className="space-y-2">
          <h1 className="text-2xl">
            {t('welcome', language)}, {mockUser.name} 👋
          </h1>
          <p className="text-white/90">{mockUser.shopName}</p>
        </div>
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

        {/* Current Stock */}
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl mb-4">{language === 'en' ? 'Current Stock' : language === 'hi' ? 'वर्तमान स्टॉक' : 'सध्याचा स्टॉक'}</h3>
          <div className="space-y-3">
            {mockInventory.slice(0, 4).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <p className="font-medium">{t(item.name as keyof typeof import('@/utils/translations').translations, language)}</p>
                    <p className="text-sm text-gray-600">{item.quantity} {t('kg', language)}</p>
                  </div>
                </div>
                <p className="text-green-600">₹{item.price}</p>
              </div>
            ))}
          </div>
        </Card>

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
      </div>

      {/* Floating Add Button */}
      <Button className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-[#4CAF50] hover:bg-[#45a049] shadow-2xl">
        <Plus className="w-8 h-8" />
      </Button>
    </div>
  );
}
