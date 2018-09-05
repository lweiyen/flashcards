import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const FLASHCARD_STORAGE_KEY = 'MyFlashcardApp:flashcard';
const NOTIFICATION_KEY = 'MyFlashcardApp:notification';

export const getDecks = () =>
  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => JSON.parse(results));


export const saveDeck = (deck) =>
  AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }));

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification () {
  return {
    title: 'Mobile Flashcards',
    body: "Don't forget to study today!",
    ios: {
      sound: true,
    }
  };
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(18);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}