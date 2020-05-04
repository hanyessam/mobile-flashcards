import { GET_DECKS, ADD_DECK, GET_DECK, ADD_CARD } from '../actions';

function decks(state = {}, action) {
  const { data, key } = action;

  switch (action.type) {
    case GET_DECKS: {
      return {
        ...state,
        ...data,
      };
    }

    case GET_DECK: {
      return {
        ...state,
        [key]: data,
      };
    }

    case ADD_DECK: {
      const { title } = data;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    }

    case ADD_CARD: {
      const { question, answer, deck } = data;
      const previousState = { ...state };
      const titleValue = previousState[deck].title;
      let questions  = previousState[deck].questions;
      questions.push({
        question,
        answer,
      });
      return {
        ...state,
        [deck]: {
          title: titleValue,
          questions,
        },
      };
    }

    default:
      return state;
  };
};

export default decks;
