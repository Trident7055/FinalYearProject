import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { t } from '@/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/components/ui/input-otp';
import { Smartphone, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface OTPLoginProps {
  onComplete: () => void;
  onRegister?: () => void;
}

export function OTPLogin({ onComplete, onRegister }: OTPLoginProps) {
  const { language } = useLanguage();
  const { setUser } = useUser();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isRegisteredVendor, setIsRegisteredVendor] = useState(false);

  const handleSendOTP = () => {
    if (phone.trim().length !== 10) {
      toast.error(t('pleaseEnterValidMobile', language));
      return;
    }

    const registeredVendors = JSON.parse(
      localStorage.getItem('registeredVendors') || '{}'
    );

    const vendorData = registeredVendors[phone];

    // ❌ NOT REGISTERED → BLOCK LOGIN
    if (!vendorData) {
      toast.error('User not registered. Please register first.');
      return;
    }

    // ✅ REGISTERED → ALLOW OTP
    setIsRegisteredVendor(true);
    toast.success(t('otpSentSuccessfully', language));

    setTimeout(() => {
      setStep('otp');
    }, 500);
  };

  const handleVerifyOTP = () => {
    if (!isRegisteredVendor) {
      toast.error('User not registered');
      return;
    }

    if (otp.length !== 6) {
      toast.error(t('pleaseEnterCompleteOTP', language));
      return;
    }

    const registeredVendors = JSON.parse(
      localStorage.getItem('registeredVendors') || '{}'
    );

    const vendorData = registeredVendors[phone];

    if (!vendorData) {
      toast.error('User data not found');
      return;
    }

    setUser(vendorData);
    toast.success(t('loginSuccessful', language));

    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex flex-col items-center justify-center px-2 sm:px-4">
      <Card className="w-full sm:max-w-lg bg-[#4CAF50] rounded-3xl shadow-2xl p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <h2 className="text-3xl font-bold text-white">{t('welcomeBack', language)}</h2>
          </div>

          {/* Phone Number Step */}
          {step === 'phone' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg font-medium text-white">{t('enterMobile', language)}</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="h-14 text-lg rounded-xl border-2 focus:border-white"
                />
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full h-14 text-lg bg-white text-[#4CAF50] hover:bg-gray-100 rounded-xl font-medium"
              >
                {t('sendOTP', language)}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-white">
                {t('newVendor', language)}
                <Button
                  onClick={onRegister}
                  variant="link"
                  className="pl-1 text-white hover:text-gray-100 font-semibold"
                >
                  {t('registerHere', language)}
                </Button>
              </p>
            </div>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-lg font-medium text-white">{t('enterOTP', language)}</label>
                <p className="text-sm text-white">
                  {t('sentTo', language)} {phone}
                </p>
                <div className="flex justify-center py-4">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="gap-2 flex">
                      <InputOTPSlot index={0} className="w-12 h-14 text-xl border-2 rounded-lg bg-white" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-xl border-2 rounded-lg bg-white" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-xl border-2 rounded-lg bg-white" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-xl border-2 rounded-lg bg-white" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-xl border-2 rounded-lg bg-white" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-xl border-2 rounded-lg bg-white" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full h-14 text-lg bg-white text-[#4CAF50] hover:bg-gray-100 rounded-xl font-medium"
              >
                {t('verifyAndContinue', language)}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                }}
                variant="ghost"
                className="w-full text-white hover:text-gray-100"
              >
                {t('changeNumber', language)}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
