import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'codigoo',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    Splashscreen: {
      launchShowDuration: 2000,
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
      backgroundColor: '#ffffff',
    },
  },
};

export default config;
