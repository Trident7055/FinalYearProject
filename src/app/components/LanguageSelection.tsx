import { useLanguage, Language } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onComplete: () => void;
}

export function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto bg-[#4CAF50] rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl">
            {t('selectLanguage', language)} / भाषा चुनें / भाषा निवडा
          </h2>

          {/* Language Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => handleLanguageSelect('en')}
              className="w-full h-16 text-xl bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-2xl shadow-md transition-all"
              variant="outline"
            >
              <span className="mr-3 text-2xl">🇬🇧</span>
              English
            </Button>
            
            <Button
              onClick={() => handleLanguageSelect('hi')}
              className="w-full h-16 text-xl bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-2xl shadow-md transition-all"
              variant="outline"
            >
              <span className="mr-3 text-2xl">🇮🇳</span>
              हिंदी (Hindi)
            </Button>
            
            <Button
              onClick={() => handleLanguageSelect('mr')}
              className="w-full h-16 text-xl bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-2xl shadow-md transition-all"
              variant="outline"
            >
              <span className="mr-3 text-2xl">🇲🇭</span>
              मराठी (Marathi)
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
