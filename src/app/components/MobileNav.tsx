import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Home, Camera, BarChart3, Radio, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'dashboard' | 'detect' | 'sales' | 'connectivity' | 'profile';
  onTabChange: (tab: 'dashboard' | 'detect' | 'sales' | 'connectivity' | 'profile') => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="grid grid-cols-5 h-20">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'dashboard' ? 'text-[#4CAF50]' : 'text-gray-600'
          }`}
        >
          <Home className={`w-6 h-6 ${activeTab === 'dashboard' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">{t('dashboard', language)}</span>
          {activeTab === 'dashboard' && (
            <div className="absolute bottom-0 w-12 h-1 bg-[#4CAF50] rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => onTabChange('detect')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'detect' ? 'text-[#4CAF50]' : 'text-gray-600'
          }`}
        >
          <Camera className={`w-6 h-6 ${activeTab === 'detect' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">{t('detect', language)}</span>
          {activeTab === 'detect' && (
            <div className="absolute bottom-0 w-12 h-1 bg-[#4CAF50] rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => onTabChange('sales')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'sales' ? 'text-[#4CAF50]' : 'text-gray-600'
          }`}
        >
          <BarChart3 className={`w-6 h-6 ${activeTab === 'sales' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">{t('sales', language)}</span>
          {activeTab === 'sales' && (
            <div className="absolute bottom-0 w-12 h-1 bg-[#4CAF50] rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => onTabChange('connectivity')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'connectivity' ? 'text-[#4CAF50]' : 'text-gray-600'
          }`}
        >
          <Radio className={`w-6 h-6 ${activeTab === 'connectivity' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">{t('connectivity', language)}</span>
          {activeTab === 'connectivity' && (
            <div className="absolute bottom-0 w-12 h-1 bg-[#4CAF50] rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'profile' ? 'text-[#4CAF50]' : 'text-gray-600'
          }`}
        >
          <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">{t('profile', language)}</span>
          {activeTab === 'profile' && (
            <div className="absolute bottom-0 w-12 h-1 bg-[#4CAF50] rounded-t-full" />
          )}
        </button>
      </div>
    </div>
  );
}