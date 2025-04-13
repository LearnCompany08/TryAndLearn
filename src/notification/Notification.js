
import notifee, { AndroidImportance } from '@notifee/react-native';

 export const requestPermission=async()=>{
    await notifee.requestPermission()
 } 

async function onDisplayNotification(message) {
    const channelId = await notifee.createChannel({
      id: 'suzuki@123',
      name: 'Suzuki',
      importance: AndroidImportance.HIGH,
      sound: 'default'
    });

    await notifee.displayNotification({
      title: 'Suzuki',
      body: message,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        showTimestamp: true,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  export default onDisplayNotification