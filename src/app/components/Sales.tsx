import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { mockSales } from '@/utils/mockData';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export function Sales() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('week');

  const salesTrendData = [
    { date: '18 Jan', amount: 600 },
    { date: '19 Jan', amount: 640 },
    { date: '20 Jan', amount: 495 },
    { date: '21 Jan', amount: 540 },
    { date: '22 Jan', amount: 620 },
  ];

  const handleExport = () => {
    toast.success(
      language === 'en'
        ? 'Report downloaded successfully!'
        : language === 'hi'
        ? 'रिपोर्ट सफलतापूर्वक डाउनलोड हुई!'
        : 'अहवाल यशस्वीरित्या डाउनलोड झाला!'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl">{t('sales', language)} & {t('analytics', language)}</h1>
        <p className="text-white/90 text-sm mt-1">
          {language === 'en'
            ? 'Track your sales performance'
            : language === 'hi'
            ? 'अपनी बिक्री प्रदर्शन ट्रैक करें'
            : 'तुमची विक्री कामगिरी ट्रॅक करा'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Filter Tabs */}
        <Card className="p-2 rounded-2xl shadow-md bg-white">
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setFilter('day')}
              variant={filter === 'day' ? 'default' : 'ghost'}
              className={`rounded-xl ${filter === 'day' ? 'bg-[#4CAF50] text-white' : ''}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('day', language)}
            </Button>
            <Button
              onClick={() => setFilter('week')}
              variant={filter === 'week' ? 'default' : 'ghost'}
              className={`rounded-xl ${filter === 'week' ? 'bg-[#4CAF50] text-white' : ''}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('week', language)}
            </Button>
            <Button
              onClick={() => setFilter('month')}
              variant={filter === 'month' ? 'default' : 'ghost'}
              className={`rounded-xl ${filter === 'month' ? 'bg-[#4CAF50] text-white' : ''}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('month', language)}
            </Button>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 rounded-2xl shadow-md bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <p className="text-sm opacity-90">{t('totalSales', language)}</p>
              </div>
              <p className="text-3xl">₹2,895</p>
              <p className="text-xs opacity-75">
                {language === 'en' ? 'This week' : language === 'hi' ? 'इस सप्ताह' : 'या आठवड्यात'}
              </p>
            </div>
          </Card>

          <Card className="p-5 rounded-2xl shadow-md bg-gradient-to-br from-[#FFD65A] to-[#FFC947] text-gray-900">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <p className="text-sm opacity-90">{language === 'en' ? 'Transactions' : language === 'hi' ? 'लेनदेन' : 'व्यवहार'}</p>
              </div>
              <p className="text-3xl">45</p>
              <p className="text-xs opacity-75">
                {language === 'en' ? 'This week' : language === 'hi' ? 'इस सप्ताह' : 'या आठवड्यात'}
              </p>
            </div>
          </Card>
        </div>

        {/* Sales Trend Chart */}
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <h3 className="text-xl mb-4">{t('salesTrend', language)}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4CAF50" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales Table */}
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl">{language === 'en' ? 'Recent Transactions' : language === 'hi' ? 'हाल के लेनदेन' : 'अलीकडील व्यवहार'}</h3>
            <Button
              onClick={handleExport}
              size="sm"
              variant="outline"
              className="rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('exportCSV', language)}
            </Button>
          </div>
          
          <div className="overflow-x-auto">
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
                {mockSales.slice(0, 8).map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.date}</TableCell>
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
          </div>
        </Card>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          className="w-full h-14 text-lg bg-[#4CAF50] hover:bg-[#45a049] rounded-2xl shadow-lg"
        >
          <Download className="mr-2 w-5 h-5" />
          {t('downloadReport', language)}
        </Button>
      </div>
    </div>
  );
}
