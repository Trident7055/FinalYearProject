import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SplashScreen } from '@/app/components/SplashScreen';
import { LanguageSelection } from '@/app/components/LanguageSelection';
import { OTPLogin } from '@/app/components/OTPLogin';
import { Dashboard } from '@/app/components/Dashboard';
import { AIDetection } from '@/app/components/AIDetection';
import { Sales } from '@/app/components/Sales';
import { Profile } from '@/app/components/Profile';
import { SmartConnectivity } from '@/app/components/SmartConnectivity';
import { MobileNav } from '@/app/components/MobileNav';
import { WebDashboard } from '@/app/components/WebDashboard';
import { Toaster } from '@/app/components/ui/sonner';
import { Button } from '@/app/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';

type Screen = 'splash' | 'language' | 'login' | 'main';
type MobileTab = 'dashboard' | 'detect' | 'sales' | 'connectivity' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<MobileTab>('dashboard');
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('web');

  // Auto-detect screen size for initial view mode

  return (
    <LanguageProvider>
      <div className="w-full min-h-screen bg-gray-50">
        {/* View Mode Toggle (only show after login) */}
        {currentScreen === 'main' && (
<div className="fixed top-4 right-26 md:top-3 md:right-75 z-50 flex gap-2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow">
            <Button
              size="sm"
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              onClick={() => setViewMode('mobile')}
              className={`rounded-full ${viewMode === 'mobile' ? 'bg-[#4CAF50]' : ''}`}
            >
              <Smartphone className="w-4 h-4 mr-1" />
              Mobile
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'web' ? 'default' : 'outline'}
              onClick={() => setViewMode('web')}
              className={`rounded-full ${viewMode === 'web' ? 'bg-[#4CAF50]' : ''}`}
            >
              <Monitor className="w-4 h-4 mr-1" />
              Web
            </Button>
          </div>
        )}

        {/* Mobile View */}
        {viewMode === 'mobile' && (
          <>
            {currentScreen === 'splash' && (
              <SplashScreen onComplete={() => setCurrentScreen('language')} />
            )}

            {currentScreen === 'language' && (
              <LanguageSelection onComplete={() => setCurrentScreen('login')} />
            )}

            {currentScreen === 'login' && (
              <OTPLogin onComplete={() => setCurrentScreen('main')} />
            )}

            {currentScreen === 'main' && (
              <>
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'detect' && <AIDetection />}
                {activeTab === 'sales' && <Sales />}
                {activeTab === 'connectivity' && <SmartConnectivity />}
                {activeTab === 'profile' && <Profile />}
                
                <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
              </>
            )}
          </>
        )}

        {/* Web View */}
        {viewMode === 'web' && currentScreen === 'main' && (
          <WebDashboard />
        )}

        {/* Web View - Before Login */}
        {viewMode === 'web' && currentScreen !== 'main' && (
          <div className="flex items-center justify-center min-h-screen">
            {currentScreen === 'splash' && (
              <SplashScreen onComplete={() => setCurrentScreen('language')} />
            )}

            {currentScreen === 'language' && (
              <LanguageSelection onComplete={() => setCurrentScreen('login')} />
            )}

            {currentScreen === 'login' && (
              <OTPLogin onComplete={() => setCurrentScreen('main')} />
            )}
          </div>
        )}

        <Toaster />
      </div>
    </LanguageProvider>
  );
}