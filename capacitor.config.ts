import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'agricolum',
  webDir: 'dist',
  plugins: {
    Camera: {
      permissions: ["camera", "photos"], 
    },
  },
};

export default config;

