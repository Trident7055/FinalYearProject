import { Notification } from '@/contexts/NotificationContext';

export const mockNotifications: Omit<Notification, 'id' | 'timestamp' | 'isRead'>[] = [
  // Inventory Alerts
  {
    category: 'inventory',
    title: 'Low Stock Warning',
    message: 'Tomatoes stock below threshold – 2 kg left',
  },
  {
    category: 'inventory',
    title: 'Out of Stock',
    message: 'Onions are out of stock',
  },
  {
    category: 'inventory',
    title: 'Spoilage Risk',
    message: 'Spinach likely to spoil in 1 day',
  },
  {
    category: 'inventory',
    title: 'Low Stock Alert',
    message: 'Coriander stock below 500g',
  },
  {
    category: 'inventory',
    title: 'Excess Stock',
    message: 'Potatoes overstock - consider discount promotions',
  },

  // AI Detection Alerts
  {
    category: 'ai',
    title: 'Spoilage Risk Detected',
    message: 'AI Alert: Coriander spoilage risk detected (85%)',
  },
  {
    category: 'ai',
    title: 'Abnormal Sales Pattern',
    message: 'Unusual sales pattern detected for Tomatoes - 45% drop from normal',
  },
  {
    category: 'ai',
    title: 'Low Movement Alert',
    message: 'Sudden drop in item movement for Brinjal (↓60%)',
  },
  {
    category: 'ai',
    title: 'Demand Spike Detected',
    message: 'Unexpected demand surge for Lettuce detected (↑120%)',
  },

  // System & Connectivity Alerts
  {
    category: 'system',
    title: 'Sensor Disconnected',
    message: 'Device Sensor-A2 in Storage 1 disconnected',
  },
  {
    category: 'system',
    title: 'Sync Failed',
    message: 'Last sync failed. Please check connectivity.',
  },
  {
    category: 'system',
    title: 'Data Update Overdue',
    message: 'No data update for 6 hours. Check device status.',
  },

  // Business Insights
  {
    category: 'insights',
    title: 'Daily Sales Summary',
    message: "Today's best-selling item: Potatoes (↑23%)",
  },
  {
    category: 'insights',
    title: 'Weekly Insights',
    message: 'Weekly profit increased by 15% - Vegetable mix is performing well',
  },
  {
    category: 'insights',
    title: 'Demand Suggestion',
    message: 'High-demand item suggestion: Stock more Tomatoes for weekend',
  },
  {
    category: 'insights',
    title: 'Revenue Milestone',
    message: 'Monthly revenue target reached 85% - On track to exceed goal',
  },
];
