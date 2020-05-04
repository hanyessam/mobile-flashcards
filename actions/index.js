export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function getDecks(data) {
  return {
    type: GET_DECKS,
    data,
  };
};

export function getDeck(key, data) {
  return {
    type: GET_DECK,
    key,
    data,
  };
};

export function addDeck(data) {
  return {
    type: ADD_DECK,
    data,
  };
};

export function addCard(data) {
  return {
    type: ADD_CARD,
    data,
  };
};
