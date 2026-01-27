import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Leaf, Cpu } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center animate-bounce">
            <Leaf className="w-16 h-16 text-[#4CAF50]" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#FFD65A] rounded-full flex items-center justify-center shadow-lg">
            <Cpu className="w-6 h-6 text-gray-800" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl text-white">{t('appTitle', language)}</h1>
          <p className="text-lg text-white/90 max-w-sm mx-auto">
            {t('appSubtext', language)}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
