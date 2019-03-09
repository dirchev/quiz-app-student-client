import arrayToEntities from "utils/arrayToEntities";

const DEFAULT_STATE = {}

const questionsEntities = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_RETRIEVE_SUCCESS':
      return {
        ...state,
        ...arrayToEntities(action.payload.quiz.questions)
      }
    case 'QUIZ_PREPARE_SUCCESS':
      return {
        ...state,
        ...arrayToEntities(action.payload.questions)
      }
    case 'QUIZ_LIST_SUCCESS':
      let questions = []
      action.payload.quizess.forEach(function (quiz) {
        if (!quiz.questions) return
        quiz.questions.forEach(function (question) {
          if (!question._id) return
          questions.push(question)
        })
      })
      return {
        ...state,
        ...arrayToEntities(questions)
      }
    default:
      return state
  }
}

export default questionsEntities
