import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Camera, Check, RotateCcw, X } from 'lucide-react';
import { toast } from 'sonner';

export function AIDetection() {
  const { language } = useLanguage();
  const [isDetecting, setIsDetecting] = useState(false);
  const [detected, setDetected] = useState<{ item: string; weight: number; emoji: string } | null>(null);

  const mockDetection = () => {
    setIsDetecting(true);
    setTimeout(() => {
      const items = [
        { item: 'apple', weight: 2.5, emoji: '🍎' },
        { item: 'banana', weight: 1.8, emoji: '🍌' },
        { item: 'tomato', weight: 3.2, emoji: '🍅' },
        { item: 'mango', weight: 1.5, emoji: '🥭' },
      ];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setDetected(randomItem);
      setIsDetecting(false);
    }, 2000);
  };

  const handleAddToStock = () => {
    if (detected) {
      toast.success(
        language === 'en'
          ? `${detected.weight}kg added to stock!`
          : language === 'hi'
          ? `${detected.weight} किलो स्टॉक में जोड़ा गया!`
          : `${detected.weight} किलो स्टॉकमध्ये जोडले!`
      );
      setDetected(null);
    }
  };

  const handleCancel = () => {
    setDetected(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl">{t('detect', language)}</h1>
        <p className="text-white/90 text-sm mt-1">
          {language === 'en'
            ? 'AI-powered automatic detection'
            : language === 'hi'
            ? 'AI-संचालित स्वचालित पहचान'
            : 'AI-संचालित स्वयंचलित ओळख'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Camera Preview */}
        <Card className="rounded-3xl shadow-lg overflow-hidden bg-gray-900">
          <div className="aspect-[4/3] relative flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            {!detected && !isDetecting && (
              <div className="text-center text-white/70">
                <Camera className="w-20 h-20 mx-auto mb-4" />
                <p className="text-lg">
                  {language === 'en'
                    ? 'Point camera at produce'
                    : language === 'hi'
                    ? 'उत्पाद पर कैमरा इंगित करें'
                    : 'उत्पादनावर कॅमेरा लक्ष्य करा'}
                </p>
              </div>
            )}

            {isDetecting && (
              <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg">
                  {language === 'en' ? 'Detecting...' : language === 'hi' ? 'पहचान रही है...' : 'शोधत आहे...'}
                </p>
              </div>
            )}

            {detected && !isDetecting && (
              <div className="text-center space-y-4">
                <div className="text-8xl animate-bounce">{detected.emoji}</div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mx-4">
                  <p className="text-gray-600 text-sm">{t('detected', language)}</p>
                  <p className="text-2xl text-gray-900 mt-1">
                    {t(detected.item as keyof typeof import('@/utils/translations').translations, language)}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <p className="text-gray-600">{t('weight', language)}:</p>
                    <p className="text-3xl text-[#4CAF50]">
                      {detected.weight} {t('kg', language)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scanner overlay */}
            {!detected && !isDetecting && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-2 border-[#4CAF50] rounded-2xl">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#4CAF50] rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#4CAF50] rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#4CAF50] rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#4CAF50] rounded-br-2xl" />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* IoT Scale Connection */}
        <Card className="p-4 rounded-2xl shadow-md bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <p className="font-medium">
                {language === 'en'
                  ? 'IoT Scale Connected'
                  : language === 'hi'
                  ? 'IoT स्केल कनेक्ट हो गया'
                  : 'IoT स्केल कनेक्ट झाले'}
              </p>
            </div>
            <p className="text-sm text-white/80">Smart Scale v2.0</p>
          </div>
        </Card>

        {/* Action Buttons */}
        {!detected ? (
          <Button
            onClick={mockDetection}
            disabled={isDetecting}
            className="w-full h-16 text-xl bg-[#4CAF50] hover:bg-[#45a049] rounded-2xl shadow-lg"
          >
            <Camera className="mr-2 w-6 h-6" />
            {t('detectAndWeigh', language)}
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="h-16 text-lg border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-2xl"
            >
              <X className="mr-2 w-5 h-5" />
              {t('cancel', language)}
            </Button>
            <Button
              onClick={handleAddToStock}
              className="h-16 text-lg bg-[#4CAF50] hover:bg-[#45a049] rounded-2xl"
            >
              <Check className="mr-2 w-5 h-5" />
              {t('addToStock', language)}
            </Button>
          </div>
        )}

        {detected && (
          <Button
            onClick={mockDetection}
            variant="outline"
            className="w-full h-14 text-lg border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-2xl"
          >
            <RotateCcw className="mr-2 w-5 h-5" />
            {t('reDetect', language)}
          </Button>
        )}

        {/* Instructions */}
        <Card className="p-6 rounded-2xl shadow-md bg-[#FFD65A]/10 border-2 border-[#FFD65A]">
          <h3 className="font-medium mb-3">
            {language === 'en' ? '💡 Tips for better detection' : language === 'hi' ? '💡 बेहतर पहचान के लिए सुझाव' : '💡 चांगल्या ओळखीसाठी टिपा'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• {language === 'en' ? 'Ensure good lighting' : language === 'hi' ? 'अच्छी रोशनी सुनिश्चित करें' : 'चांगली प्रकाश सुनिश्चित करा'}</li>
            <li>• {language === 'en' ? 'Place item on IoT scale' : language === 'hi' ? 'IoT स्केल पर वस्तु रखें' : 'IoT स्केलवर वस्तू ठेवा'}</li>
            <li>• {language === 'en' ? 'Keep camera steady' : language === 'hi' ? 'कैमरा स्थिर रखें' : 'कॅमेरा स्थिर ठेवा'}</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
