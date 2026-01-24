import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/components/ui/input-otp';
import { Smartphone, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface OTPLoginProps {
  onComplete: () => void;
}

export function OTPLogin({ onComplete }: OTPLoginProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setStep('otp');
      toast.success(language === 'en' ? 'OTP sent successfully!' : language === 'hi' ? 'OTP सफलतापूर्वक भेजा गया!' : 'OTP यशस्वीरित्या पाठवले!');
    } else {
      toast.error(language === 'en' ? 'Please enter a valid mobile number' : language === 'hi' ? 'कृपया एक वैध मोबाइल नंबर दर्ज करें' : 'कृपया वैध मोबाइल नंबर प्रविष्ट करा');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      toast.success(language === 'en' ? 'Login successful!' : language === 'hi' ? 'लॉगिन सफल!' : 'लॉगिन यशस्वी!');
      setTimeout(() => {
        onComplete();
      }, 500);
    } else {
      toast.error(language === 'en' ? 'Please enter complete OTP' : language === 'hi' ? 'कृपया पूर्ण OTP दर्ज करें' : 'कृपया संपूर्ण OTP प्रविष्ट करा');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-[#4CAF50] rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl">{t('welcomeBack', language)}</h2>
          </div>

          {/* Phone Number Step */}
          {step === 'phone' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg">{t('enterMobile', language)}</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-14 text-lg rounded-xl border-2"
                  maxLength={10}
                />
              </div>
              
              <Button
                onClick={handleSendOTP}
                className="w-full h-14 text-lg bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
              >
                {t('sendOTP', language)}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-gray-600">
                {t('newVendor', language)}
              </p>
            </div>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg">{t('enterOTP', language)}</label>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Sent to' : language === 'hi' ? 'भेजा गया' : 'पाठवले'} {phone}
                </p>
                <div className="flex justify-center py-4">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <Button
                onClick={handleVerifyOTP}
                className="w-full h-14 text-lg bg-[#4CAF50] hover:bg-[#45a049] rounded-xl"
              >
                {t('verifyAndContinue', language)}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => setStep('phone')}
                variant="ghost"
                className="w-full"
              >
                {language === 'en' ? 'Change number' : language === 'hi' ? 'नंबर बदलें' : 'नंबर बदला'}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
