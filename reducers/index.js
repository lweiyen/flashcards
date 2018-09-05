import { RECEIVE_DECKS, UPDATE_DECK } from '../actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case UPDATE_DECK :
      return {
        ...state,
        [action.deck.title]:action.deck
      }
    default :
      return state;
  }
}