import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export function fetchDecks() {
  // return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}));
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
    return JSON.parse(data);
  });
};

export function fetchDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
    return JSON.parse(data)[id];
  });
};

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [],
    },
  }));
};

export function addCardToDeck(data) {
  const { question, answer, deck } = data;

  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let data = JSON.parse(results)[deck];
      data.questions.push({
        question,
        answer,
      });
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck]: data,
      }));
    });
};
