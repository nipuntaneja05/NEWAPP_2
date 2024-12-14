declare module 'react-native-push-notification' {
    // Define the structure of the PushNotificationToken
    export interface PushNotificationToken {
      os: string;
      token: string;
    }
  
    // Define the structure of the ReceivedNotification
    export interface ReceivedNotification {
      foreground: boolean;
      userInteraction: boolean;
      message: string;
      data: any;
      badge: number;
      alert: any;
      sound: string;
    }
  
    // Define the permissions structure
    export interface PushNotificationPermissions {
      alert?: boolean;
      badge?: boolean;
      sound?: boolean;
    }
  
    // Declare the configure function
    export function configure(options: {
      onRegister: (token: PushNotificationToken) => void;
      onNotification: (notification: ReceivedNotification) => void;
      permissions?: PushNotificationPermissions;
      popInitialNotification?: boolean;
      requestPermissions?: boolean;
    }): void;
  
    export default {
      configure,
    };
  }
  