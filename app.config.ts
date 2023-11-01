import 'dotenv/config';

export default {
    expo: {
      extra: {
        apiKey: process.env.APIKEY || 'fallback-api-key',
        authDomain: process.env.AUTHDOMAIN || 'fallback-auth-domain',
        projectId: process.env.PROJECTID || 'fallback-project-id',
        storageBucket: process.env.STORAGEBUCKET || 'fallback-storage-bucket',
        messagingSenderId: process.env.MESSAGESENDERID || 'fallback-messaging-sender-id',
        appId: process.env.APPID || 'fallback-app-id',
    },
  },
};