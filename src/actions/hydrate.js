import { loadQuizApp } from "./quizApp";
import { values } from "lodash"
import { syncQuizEngagement } from "./quizEngagement";

export let hydrateState = () => async (dispatch, getState) => {
  dispatch(loadQuizApp())
  // get quiz engagements to sync
  let quizEngagementsToSync = values(getState().entities.quizEngagements).filter(({__meta}) => {
    return __meta && __meta.startedOffline && !__meta.synced
  })
  quizEngagementsToSync.forEach((quizEngagement) => {
    dispatch(syncQuizEngagement(quizEngagement))
  })
}
