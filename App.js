import React, {useEffect} from 'react';
import {View} from 'react-native';
import messaging from '@react-native-firebase/messaging';

function App() {
  useEffect(() => {
    async function registerAppWithFCM() {
      await messaging().registerDeviceForRemoteMessages();
    }

    async function getFcmToken() {
      const fcmToken = await messaging().getToken();
      console.log('Token::' + fcmToken);
      return fcmToken;
    }

    async function requestUserPermission() {
      const settings = await messaging().requestPermission();

      if (settings) {
        console.log('Permission settings:', settings);
      }
    }

    //Must be called each time app boots.
    registerAppWithFCM().then((result) => {
      console.log('Firebase::' + JSON.stringify(result));
    });

    requestUserPermission().then((result) => {
      console.log('requestUserPermission::' + JSON.stringify(result));
    });

    //Fetching FCM token
    getFcmToken().then((data) => {
      console.log('Token::' + JSON.stringify(data));
    });

    //On message in foreground
    const unsubscribeForegroundMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log('onMessage::' + JSON.stringify(remoteMessage));
      },
    );

    //On message in background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log(
        'setBackgroundMessageHandler::' + JSON.stringify(remoteMessage),
      );
    });

    return () => {
      unsubscribeForegroundMessage();
    };
  });

  return <View></View>;
}

export default App;
