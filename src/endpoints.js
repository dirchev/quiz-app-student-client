let root = process.env.REACT_APP_ROOT_URL || ''

export let login = `${root}/api/login`
export let register = `${root}/api/register`
export let quizApps = {
  load: `${root}/api/load`
}
export let quizess = {
  list: `${root}/api/quizess`,
  prepare: ({quizId}) => `${root}/api/quizess/${quizId}/prepare`,
}

export let quizEngagement = {
  create: ({quizId}) => `${root}/api/quizess/${quizId}/quiz-engagements`,
  update: ({quizId, quizEngagementId}) => `${root}/api/quizess/${quizId}/quiz-engagements/${quizEngagementId}`,
  finish: ({quizId, quizEngagementId}) => `${root}/api/quizess/${quizId}/quiz-engagements/${quizEngagementId}/finish`,
  list: ({quizId}) => `${root}/api/quizess/${quizId}/quiz-engagements`
}
