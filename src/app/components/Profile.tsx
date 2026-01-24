import { useLanguage, Language } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { mockUser } from '@/utils/mockData';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { User, Globe, HelpCircle, LogOut, ChevronRight, Store, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    toast.success(
      lang === 'en'
        ? 'Language changed to English'
        : lang === 'hi'
        ? 'भाषा हिंदी में बदल गई'
        : 'भाषा मराठीमध्ये बदलली'
    );
  };

  const handleLogout = () => {
    toast.success(
      language === 'en'
        ? 'Logged out successfully'
        : language === 'hi'
        ? 'सफलतापूर्वक लॉग आउट हो गए'
        : 'यशस्वीरित्या लॉग आउट झाले'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl">{t('profile', language)}</h1>
        <p className="text-white/90 text-sm mt-1">
          {language === 'en'
            ? 'Manage your account settings'
            : language === 'hi'
            ? 'अपने खाते की सेटिंग प्रबंधित करें'
            : 'तुमच्या खात्याची सेटिंग्ज व्यवस्थापित करा'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card className="p-6 rounded-2xl shadow-md bg-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center text-white text-3xl">
              {mockUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl">{mockUser.name}</h2>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Phone className="w-4 h-4" />
                <p className="text-sm">{mockUser.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3 text-gray-700">
              <Store className="w-5 h-5 text-[#4CAF50]" />
              <div>
                <p className="text-xs text-gray-500">{language === 'en' ? 'Shop Name' : language === 'hi' ? 'दुकान का नाम' : 'दुकानाचे नाव'}</p>
                <p className="font-medium">{mockUser.shopName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-[#4CAF50]" />
              <div>
                <p className="text-xs text-gray-500">{language === 'en' ? 'Location' : language === 'hi' ? 'स्थान' : 'स्थान'}</p>
                <p className="font-medium">{mockUser.location}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings Section */}
        <div className="space-y-3">
          <h3 className="text-lg px-2">{t('settings', language)}</h3>
          
          {/* Edit Profile */}
          <Card className="rounded-2xl shadow-md overflow-hidden">
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <p className="font-medium text-lg">{t('editProfile', language)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          {/* Language Selection */}
          <Card className="rounded-2xl shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#FFD65A]/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#FFD65A]" />
                </div>
                <p className="font-medium text-lg">{t('language', language)}</p>
              </div>
              
              <div className="space-y-2 pl-16">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-colors ${
                    language === 'en' ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">🇬🇧</span>
                  <span>English</span>
                  {language === 'en' && <span className="ml-auto">✓</span>}
                </button>
                
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-colors ${
                    language === 'hi' ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">🇮🇳</span>
                  <span>हिंदी (Hindi)</span>
                  {language === 'hi' && <span className="ml-auto">✓</span>}
                </button>
                
                <button
                  onClick={() => handleLanguageChange('mr')}
                  className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-colors ${
                    language === 'mr' ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xl">🇲🇭</span>
                  <span>मराठी (Marathi)</span>
                  {language === 'mr' && <span className="ml-auto">✓</span>}
                </button>
              </div>
            </div>
          </Card>

          {/* Help & Support */}
          <Card className="rounded-2xl shadow-md overflow-hidden">
            <button className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-lg">{t('helpAndSupport', language)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          {/* Logout */}
          <Card className="rounded-2xl shadow-md overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full p-5 flex items-center justify-between hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-red-600" />
                </div>
                <p className="font-medium text-lg text-red-600">{t('logout', language)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 pt-6">
          Smart Inventory v2.0.1
          <br />
          {language === 'en' ? 'Made with' : language === 'hi' ? 'से बनाया गया' : 'सह बनवले'} 💚 {language === 'en' ? 'for vendors' : language === 'hi' ? 'विक्रेताओं के लिए' : 'विक्रेत्यांसाठी'}
        </div>
      </div>
    </div>
  );
}
