import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Video, Thermometer, Droplets, Activity, MapPin, Clock } from 'lucide-react';

interface DetectionRecord {
  id: number;
  time: string;
  item: string;
  emoji: string;
  confidence: number;
  risk: 'low' | 'medium' | 'high';
}

export function LiveMonitoring() {
  const { language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDetection, setCurrentDetection] = useState({
    item: 'tomato',
    emoji: '🍅',
    confidence: 94.5,
    weight: 2.3,
    risk: 'low' as 'low' | 'medium' | 'high',
    lastDetectedTime: '14:32:18',
  });

  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(62);

  const recentDetections: DetectionRecord[] = [
    { id: 1, time: '14:32:18', item: 'tomato', emoji: '🍅', confidence: 94.5, risk: 'low' },
    { id: 2, time: '14:29:45', item: 'apple', emoji: '🍎', confidence: 97.2, risk: 'low' },
    { id: 3, time: '14:26:12', item: 'banana', emoji: '🍌', confidence: 91.8, risk: 'medium' },
    { id: 4, time: '14:22:33', item: 'potato', emoji: '🥔', confidence: 89.3, risk: 'low' },
    { id: 5, time: '14:18:56', item: 'onion', emoji: '🧅', confidence: 96.1, risk: 'low' },
    { id: 6, time: '14:15:27', item: 'carrot', emoji: '🥕', confidence: 93.7, risk: 'medium' },
  ];

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate environmental data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => Math.min(Math.max(prev + (Math.random() - 0.5) * 0.5, 22), 26));
      setHumidity(prev => Math.min(Math.max(prev + (Math.random() - 0.5) * 2, 58), 68));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getRiskBadgeColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">{t('liveMonitoring', language)}</h1>
          <p className="text-gray-600 mt-1">
            {language === 'en'
              ? 'Real-time AI-powered monitoring system'
              : language === 'hi'
              ? 'वास्तविक समय AI-संचालित निगरानी प्रणाली'
              : 'रिअल-टाइम AI-संचालित मॉनिटरिंग प्रणाली'}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 font-medium">{t('live', language)}</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Camera Feed */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow-lg overflow-hidden">
            {/* Camera Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5" />
                <div>
                  <h3 className="font-medium">{t('liveCameraFeed', language)}</h3>
                  <p className="text-xs text-gray-300">{t('raspberryPiCamera', language)}</p>
                </div>
              </div>
              <Badge className="bg-red-600 text-white border-0 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block" />
                REC
              </Badge>
            </div>

            {/* Camera Feed Display */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 via-gray-900 to-black relative flex items-center justify-center">
              {/* Simulated camera feed with detection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Detection Box */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="text-8xl animate-pulse">{currentDetection.emoji}</div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#4CAF50] rounded-lg animate-pulse" />
                </div>
              </div>

              {/* Detection Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 mt-8">
                <div className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="font-medium">
                    {t(currentDetection.item as keyof typeof import('@/utils/translations').translations, language)} - {currentDetection.confidence}%
                  </p>
                </div>
              </div>

              {/* Grid overlay for professional look */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-white/20" />
                  ))}
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-between text-white text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Status Cards */}
        <div className="space-y-6">
          {/* Detection Status Card */}
          <Card className="rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl">{t('detectionStatus', language)}</h3>
              <Badge className="bg-green-100 text-green-700 border-green-300">
                {t('live', language)}
              </Badge>
            </div>

            <div className="space-y-4">
              {/* Detected Item */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-4xl">{currentDetection.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{t('detectedItem', language)}</p>
                  <p className="text-lg font-medium">
                    {t(currentDetection.item as keyof typeof import('@/utils/translations').translations, language)}
                  </p>
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t('confidence', language)}</span>
                  <span className="text-sm font-medium">{currentDetection.confidence}%</span>
                </div>
                <Progress value={currentDetection.confidence} className="h-2" />
              </div>

              {/* Weight */}
              <div className="flex items-center justify-between p-3 bg-[#4CAF50]/10 rounded-xl">
                <span className="text-sm text-gray-700">{t('weight', language)}</span>
                <span className="text-xl font-medium text-[#4CAF50]">
                  {currentDetection.weight} {t('kg', language)}
                </span>
              </div>

              {/* Spoilage Risk */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-700">{t('spoilageRisk', language)}</span>
                <Badge className={getRiskBadgeColor(currentDetection.risk)}>
                  {t(currentDetection.risk, language)}
                </Badge>
              </div>

              {/* Last Detected */}
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm text-gray-600">{t('lastDetected', language)}</span>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {currentDetection.lastDetectedTime}
                </div>
              </div>
            </div>
          </Card>

          {/* Environmental Data Card */}
          <Card className="rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl">{t('environmentalData', language)}</h3>
            </div>

            <div className="space-y-4">
              {/* Temperature */}
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{t('temperature', language)}</p>
                    <p className="text-2xl font-medium text-orange-700">
                      {temperature.toFixed(1)}°C
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                  {t('optimal', language)}
                </Badge>
              </div>

              {/* Humidity */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{t('humidity', language)}</p>
                    <p className="text-2xl font-medium text-blue-700">
                      {humidity.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                  {t('optimal', language)}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Recent Detections */}
      <Card className="rounded-2xl shadow-lg p-6">
        <h3 className="text-xl mb-4">{t('recentDetections', language)}</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('time', language)}</TableHead>
                <TableHead>{t('detectedItem', language)}</TableHead>
                <TableHead>{t('confidence', language)}</TableHead>
                <TableHead>{t('riskLevel', language)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDetections.map((detection) => (
                <TableRow key={detection.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {detection.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{detection.emoji}</span>
                      <span>
                        {t(detection.item as keyof typeof import('@/utils/translations').translations, language)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={detection.confidence} className="h-2 w-20" />
                      <span className="text-sm font-medium">{detection.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskBadgeColor(detection.risk)}>
                      {t(detection.risk, language)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Footer - AI Detection Engine Info */}
      <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium mb-1">{t('aiDetectionEngine', language)}</h3>
            <p className="text-white/90 text-sm">
              {t('runningOnRaspberryPi', language)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'Running' : language === 'hi' ? 'चल रहा है' : 'चालू आहे'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
