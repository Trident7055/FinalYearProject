import { useNotifications, NotificationCategory } from '@/contexts/NotificationContext';
import { Button } from '@/app/components/ui/button';
import { X, Check, Trash2, AlertCircle, Brain, Wifi, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const categoryConfig: Record<NotificationCategory, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  inventory: {
    label: 'Inventory',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    icon: <AlertCircle className="w-4 h-4" />,
  },
  ai: {
    label: 'AI Detection',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: <Brain className="w-4 h-4" />,
  },
  system: {
    label: 'System',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: <Wifi className="w-4 h-4" />,
  },
  insights: {
    label: 'Insights',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: <TrendingUp className="w-4 h-4" />,
  },
};

export function NotificationsPanel() {
  const { notifications, removeNotification, markAsRead, markAllAsRead, clearAllNotifications } = useNotifications();

  if (notifications.length === 0) {
    return (
      <div className="absolute right-0 top-12 w-96 max-w-[calc(100vw-16px)] bg-white rounded-lg shadow-xl z-50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      </div>
    );
  }

  const config = categoryConfig['inventory'];

  return (
    <div className="absolute right-0 top-12 w-96 max-w-[calc(100vw-16px)] bg-white rounded-lg shadow-xl z-50 max-h-[600px] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <div className="flex gap-2">
          {notifications.some((n) => !n.isRead) && (
            <Button
              size="sm"
              variant="ghost"
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={clearAllNotifications}
              className="text-xs h-7 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y">
        {notifications.map((notification) => {
          const cat = categoryConfig[notification.category];
          return (
            <div
              key={notification.id}
              className={`p-4 cursor-pointer transition-colors ${
                notification.isRead ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-blue-50'
              }`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className="flex gap-3">
                {/* Category Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${cat.bgColor} flex items-center justify-center ${cat.color}`}>
                  {cat.icon}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600 uppercase">{cat.label}</span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mt-1">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  {!notification.isRead && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="text-xs h-7"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Mark read
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
