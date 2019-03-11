import { loadQuizApp } from "./quizApp";
import { loadQuizess } from "./quiz";

export let hydrateState = () => async (dispatch, getState) => {
  dispatch(loadQuizApp())
  if (getState()) {
    dispatch(loadQuizess())
  }
}
