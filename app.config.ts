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
    "eas": {
        "projectId": "3a1fc994-7c88-4dcb-a09d-d2ddeb7655e2"
      }
  },
};