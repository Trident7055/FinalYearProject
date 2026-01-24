import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  Bluetooth, 
  Wifi, 
  AlertCircle, 
  Check, 
  Loader2,
  Signal,
  ArrowLeft,
  Radio
} from 'lucide-react';

type ConnectionType = 'bluetooth' | 'wifi' | null;
type ConnectionStatus = 'not-connected' | 'connecting' | 'connected';
type Screen = 'main' | 'permission' | 'scanning' | 'devices';

interface Device {
  id: string;
  name: string;
  type: 'scale' | 'camera';
  signal: 'strong' | 'medium' | 'weak';
  status: ConnectionStatus;
}

export function SmartConnectivity() {
  const { language } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [connectionType, setConnectionType] = useState<ConnectionType>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  // Mock devices
  const [bluetoothDevices, setBluetoothDevices] = useState<Device[]>([
    { id: 'bt-001', name: 'Smart Scale Pro v2.0', type: 'scale', signal: 'strong', status: 'not-connected' },
    { id: 'bt-002', name: 'IoT Scale Module', type: 'scale', signal: 'medium', status: 'not-connected' },
    { id: 'bt-003', name: 'Vendor Scale BT', type: 'scale', signal: 'weak', status: 'not-connected' },
  ]);

  const [wifiDevices, setWifiDevices] = useState<Device[]>([
    { id: 'wifi-001', name: 'RaspberryPi-Camera', type: 'camera', signal: 'strong', status: 'not-connected' },
    { id: 'wifi-002', name: 'AI-Vision-Cam-01', type: 'camera', signal: 'strong', status: 'not-connected' },
    { id: 'wifi-003', name: 'Smart-Cam-IoT', type: 'camera', signal: 'medium', status: 'not-connected' },
  ]);

  const handleEnableConnect = (type: ConnectionType) => {
    setConnectionType(type);
    setCurrentScreen('permission');
  };

  const handleAllowPermission = () => {
    setCurrentScreen('scanning');
    // Simulate scanning delay
    setTimeout(() => {
      setCurrentScreen('devices');
    }, 2000);
  };

  const handleConnectDevice = (deviceId: string) => {
    setSelectedDevice(deviceId);
    
    if (connectionType === 'bluetooth') {
      setBluetoothDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'connecting' }
          : device
      ));
    } else {
      setWifiDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'connecting' }
          : device
      ));
    }

    // Simulate connection delay
    setTimeout(() => {
      if (connectionType === 'bluetooth') {
        setBluetoothDevices(prev => prev.map(device => 
          device.id === deviceId 
            ? { ...device, status: 'connected' }
            : device
        ));
      } else {
        setWifiDevices(prev => prev.map(device => 
          device.id === deviceId 
            ? { ...device, status: 'connected' }
            : device
        ));
      }
    }, 2000);
  };

  const handleDisconnect = (deviceId: string) => {
    if (connectionType === 'bluetooth') {
      setBluetoothDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'not-connected' }
          : device
      ));
    } else {
      setWifiDevices(prev => prev.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'not-connected' }
          : device
      ));
    }
    setSelectedDevice(null);
  };

  const handleBack = () => {
    if (currentScreen === 'devices' || currentScreen === 'permission') {
      setCurrentScreen('main');
      setConnectionType(null);
    } else if (currentScreen === 'scanning') {
      setCurrentScreen('permission');
    }
  };

  const getSignalIcon = (signal: 'strong' | 'medium' | 'weak') => {
    const bars = signal === 'strong' ? 3 : signal === 'medium' ? 2 : 1;
    return (
      <div className="flex items-end gap-0.5 h-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className={`w-1 rounded-t ${
              i < bars ? 'bg-[#4CAF50]' : 'bg-gray-300'
            }`}
            style={{ height: `${(i + 1) * 33}%` }}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  // Main Screen
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 pt-8">
            <div className="w-20 h-20 bg-[#4CAF50] rounded-3xl mx-auto flex items-center justify-center mb-4">
              <Radio className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl text-gray-900">{t('connectYourDevices', language)}</h1>
            <p className="text-gray-600 text-lg leading-relaxed px-4">
              {t('connectDevicesDesc', language)}
            </p>
          </div>

          {/* Connection Cards */}
          <div className="space-y-4 pt-4">
            {/* Bluetooth Card */}
            <Card className="p-6 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-[#4CAF50] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bluetooth className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2 text-gray-900">
                    {t('bluetoothConnection', language)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('bluetoothDesc', language)}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => handleEnableConnect('bluetooth')}
                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white h-14 text-lg rounded-xl shadow-md"
              >
                {t('enableAndConnect', language)}
              </Button>
            </Card>

            {/* Wi-Fi Card */}
            <Card className="p-6 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-[#4CAF50] transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Wifi className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2 text-gray-900">
                    {t('wifiConnection', language)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('wifiDesc', language)}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => handleEnableConnect('wifi')}
                className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white h-14 text-lg rounded-xl shadow-md"
              >
                {t('enableAndConnect', language)}
              </Button>
            </Card>
          </div>

          {/* Info Footer */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-relaxed">
              {language === 'en' 
                ? 'Your phone stays in control. We never turn on Bluetooth or Wi-Fi automatically.' 
                : language === 'hi' 
                ? 'आपका फोन नियंत्रण में रहता है। हम स्वचालित रूप से ब्लूटूथ या वाई-फाई कभी नहीं चालू करते हैं।'
                : 'तुमचा फोन नियंत्रणात राहतो. आम्ही आपोआप ब्लूटूथ किंवा वाय-फाय कधीही चालू करत नाही.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Permission Screen
  if (currentScreen === 'permission') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('cancel', language)}</span>
          </button>

          {/* Icon */}
          <div className="w-24 h-24 bg-yellow-100 rounded-3xl mx-auto flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-yellow-600" />
          </div>

          {/* Content */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl text-gray-900">
              {t('permissionRequired', language)}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed px-4">
              {connectionType === 'bluetooth' 
                ? t('bluetoothPermissionDesc', language)
                : t('wifiPermissionDesc', language)}
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900 mb-1">
                  {language === 'en' 
                    ? 'You Stay in Control' 
                    : language === 'hi' 
                    ? 'आप नियंत्रण में रहें'
                    : 'तुम्ही नियंत्रणात राहा'}
                </p>
                <p className="text-sm text-green-800 leading-relaxed">
                  {language === 'en' 
                    ? `We do not turn on ${connectionType === 'bluetooth' ? 'Bluetooth' : 'Wi-Fi'} automatically. You remain in control.`
                    : language === 'hi' 
                    ? `हम स्वचालित रूप से ${connectionType === 'bluetooth' ? 'ब्लूटूथ' : 'वाई-फाई'} चालू नहीं करते हैं। आप नियंत्रण में रहते हैं।`
                    : `आम्ही आपोआप ${connectionType === 'bluetooth' ? 'ब्लूटूथ' : 'वाय-फाय'} चालू करत नाही. तुम्ही नियंत्रणात आहात.`}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleAllowPermission}
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white h-14 text-lg rounded-xl shadow-md"
            >
              {t('allowPermission', language)}
            </Button>
            <Button 
              onClick={handleBack}
              variant="outline"
              className="w-full h-14 text-lg rounded-xl border-2"
            >
              {t('cancel', language)}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Scanning Screen
  if (currentScreen === 'scanning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Animated Scanner */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-[#4CAF50] rounded-full opacity-20 animate-ping" />
            <div className="absolute inset-4 bg-[#4CAF50] rounded-full opacity-40 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
              {connectionType === 'bluetooth' ? (
                <Bluetooth className="w-12 h-12 text-white animate-pulse" />
              ) : (
                <Wifi className="w-12 h-12 text-white animate-pulse" />
              )}
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h2 className="text-2xl text-gray-900">
              {t('scanningDevices', language)}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('scanningDesc', language)}
            </p>
          </div>

          {/* Loader */}
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-[#4CAF50] animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // Devices List Screen
  if (currentScreen === 'devices') {
    const devices = connectionType === 'bluetooth' ? bluetoothDevices : wifiDevices;
    const Icon = connectionType === 'bluetooth' ? Bluetooth : Wifi;

    return (
      <div className="min-h-screen bg-gray-50 pb-6">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 sticky top-0 z-10">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back' : language === 'hi' ? 'वापस' : 'मागे'}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-gray-900">{t('nearbyDevices', language)}</h2>
              <p className="text-gray-600">
                {devices.length} {language === 'en' ? 'found' : language === 'hi' ? 'मिला' : 'सापडले'}
              </p>
            </div>
          </div>
        </div>

        {/* Devices List */}
        <div className="px-6 pt-4 space-y-3">
          {devices.map((device) => (
            <Card 
              key={device.id} 
              className={`p-5 rounded-2xl shadow-md transition-all ${
                device.status === 'connected' 
                  ? 'border-2 border-[#4CAF50] bg-green-50' 
                  : 'border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Device Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  device.status === 'connected' 
                    ? 'bg-[#4CAF50]' 
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-7 h-7 ${
                    device.status === 'connected' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>

                {/* Device Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-gray-900 text-lg">
                      {device.name}
                    </h3>
                    {getSignalIcon(device.signal)}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getStatusColor(device.status)}>
                      {device.status === 'connected' && <Check className="w-3 h-3 mr-1" />}
                      {device.status === 'connecting' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                      {t(device.status === 'connected' ? 'connected' : device.status === 'connecting' ? 'connecting' : 'notConnected', language)}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {t('signalStrength', language)}: {t(device.signal, language)}
                    </span>
                  </div>

                  {/* Action Button */}
                  {device.status === 'connected' ? (
                    <Button 
                      onClick={() => handleDisconnect(device.id)}
                      variant="outline"
                      className="w-full h-12 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      {t('disconnect', language)}
                    </Button>
                  ) : device.status === 'connecting' ? (
                    <Button 
                      disabled
                      className="w-full h-12 rounded-xl bg-yellow-100 text-yellow-700"
                    >
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('connecting', language)}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleConnectDevice(device.id)}
                      className="w-full h-12 rounded-xl bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-md"
                    >
                      {t('connectToDevice', language)}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Footer */}
        <div className="px-6 pt-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-3">
            <Signal className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 leading-relaxed">
              <p className="font-medium mb-1">
                {language === 'en' 
                  ? 'Connection Tips' 
                  : language === 'hi' 
                  ? 'कनेक्शन टिप्स'
                  : 'कनेक्शन टिप्स'}
              </p>
              <p>
                {language === 'en' 
                  ? 'Make sure your device is powered on and within range. Strong signal ensures better connection.' 
                  : language === 'hi' 
                  ? 'सुनिश्चित करें कि आपका डिवाइस चालू है और रेंज में है। मजबूत सिग्नल बेहतर कनेक्शन सुनिश्चित करता है।'
                  : 'तुमचे डिव्हाइस चालू आहे आणि रेंजमध्ये आहे याची खात्री करा. मजबूत सिग्नल चांगले कनेक्शन सुनिश्चित करते.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
