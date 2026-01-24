import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { t } from '@/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, Store, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface VendorRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export function VendorRegistration({ onBack, onComplete }: VendorRegistrationProps) {
  const { language } = useLanguage();
  const { setUser } = useUser();
  const [step, setStep] = useState<'details' | 'verification'>('details');
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [otp, setOtp] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.storeName.trim()) {
      toast.error(t('pleaseEnterStoreName', language));
      return false;
    }
    if (!formData.ownerName.trim()) {
      toast.error(t('pleaseEnterOwnerName', language));
      return false;
    }
    if (formData.phone.length < 10) {
      toast.error(t('pleaseEnterValidPhone', language));
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error(t('pleaseEnterValidEmail', language));
      return false;
    }
    if (!formData.address.trim()) {
      toast.error(t('pleaseEnterAddress', language));
      return false;
    }
    return true;
  };

  const handleSendOTP = () => {
    if (validateForm()) {
      setStep('verification');
      toast.success(t('otpSentSuccessfully', language));
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      toast.success(t('registrationSuccessful', language));
      // Save user data
      setUser(formData);
      
      // Store registered phone number for future logins
      const registeredVendors = JSON.parse(localStorage.getItem('registeredVendors') || '{}');
      registeredVendors[formData.phone] = formData;
      localStorage.setItem('registeredVendors', JSON.stringify(registeredVendors));
      
      setTimeout(() => {
        onComplete();
      }, 500);
    } else {
      toast.error(t('pleaseEnterCompleteOTP', language));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="p-0 h-auto text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="text-center flex-1">
              <div className="w-14 h-14 mx-auto bg-[#4CAF50] rounded-full flex items-center justify-center mb-3">
                <Store className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('registerStore', language)}
              </h2>
            </div>
            <div className="w-6" />
          </div>

          {/* Details Step */}
          {step === 'details' && (
            <div className="space-y-4">
              {/* Store Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('storeName', language)}
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="e.g., Fresh Fruits Store"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                    className="h-12 pl-10 rounded-lg border-2 focus:border-[#4CAF50]"
                  />
                </div>
              </div>

              {/* Owner Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('ownerName', language)}
                </label>
                <Input
                  placeholder="Full name"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className="h-12 rounded-lg border-2 focus:border-[#4CAF50]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('phoneNumber', language)}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="h-12 pl-10 rounded-lg border-2 focus:border-[#4CAF50]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('emailAddress', language)}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="vendor@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 pl-10 rounded-lg border-2 focus:border-[#4CAF50]"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('address', language)}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Street address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="h-12 pl-10 rounded-lg border-2 focus:border-[#4CAF50]"
                  />
                </div>
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('city', language)}
                  </label>
                  <Input
                    placeholder={t('city', language)}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="h-12 rounded-lg border-2 focus:border-[#4CAF50]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('pincode', language)}
                  </label>
                  <Input
                    placeholder="123456"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12 rounded-lg border-2 focus:border-[#4CAF50]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSendOTP}
                className="w-full h-12 text-lg bg-[#4CAF50] hover:bg-[#45a049] rounded-xl font-medium mt-6"
              >
                {t('verifyAndContinueBtn', language)}
              </Button>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'verification' && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-gray-600">
                  {t('enterOTPSentTo', language)}
                </p>
                <p className="text-lg font-semibold text-gray-800">{formData.phone}</p>
              </div>

              {/* OTP Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 block">
                  {language === 'en' ? '6-Digit OTP' : language === 'hi' ? '6-अंकीय OTP' : '6-अंकीय OTP'}
                </label>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[index] = e.target.value.replace(/\D/g, '');
                        setOtp(newOtp.join(''));
                        
                        // Auto-focus to next field if digit entered
                        if (e.target.value && index < 5) {
                          const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`) as HTMLInputElement;
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace to move to previous field
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`) as HTMLInputElement;
                          if (prevInput) {
                            prevInput.focus();
                            // Clear the previous field
                            const newOtp = otp.split('');
                            newOtp[index - 1] = '';
                            setOtp(newOtp.join(''));
                          }
                        }
                      }}
                      data-otp-index={index}
                      className="w-10 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#4CAF50] focus:outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerifyOTP}
                className="w-full h-12 text-lg bg-[#4CAF50] hover:bg-[#45a049] rounded-xl font-medium mt-6"
              >
                {t('completeRegistration', language)}
              </Button>

              {/* Back Button */}
              <Button
                onClick={() => setStep('details')}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800"
              >
                {t('back', language)}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
