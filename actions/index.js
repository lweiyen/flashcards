import { saveDeck, getDecks } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const UPDATE_DECK = 'UPDATE_DECK';

function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

function updateDeck (deck) {
  return {
    type: UPDATE_DECK,
    deck
  };
}

export function handleInitialData () {
  return (dispatch) =>
    getDecks().then((decks) => dispatch(receiveDecks(decks)));
}

export function handleNewDeck (title) {
  const newDeck = {
    title,
    questions: []
  }

  return (dispatch) =>
    saveDeck(newDeck).then(() => dispatch(updateDeck(newDeck)));
}

export function handleNewCard (newCard, title) {
  return (dispatch, getState) => {
    const oldDecks = getState();
    const newDeck = {
      title,
      questions: oldDecks[title].questions.concat([newCard])
    };

    return saveDeck(newDeck)
      .then(() => dispatch(updateDeck(newDeck)));
  }
}