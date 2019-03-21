let root = process.env.REACT_APP_ROOT_URL || ''

export let login = `${root}/api/login`
export let logout = `${root}/api/logout`
export let register = `${root}/api/register`
export let quizApps = {
  load: `${root}/api/load`
}
export let quizess = {
  list: `${root}/api/quizess`,
  retrieve: ({quizId}) => `${root}/api/quizess/${quizId}`,
  prepare: ({quizId}) => `${root}/api/quizess/${quizId}/prepare`,
}

export let quizEngagement = {
  create: ({quizId}) => `${root}/api/quizess/${quizId}/quiz-engagements`,
  sync: ({quizId}) => `${root}/api/quizess/${quizId}/quiz-engagements/sync`,
  resume: ({quizId, quizEngagementId}) => `${root}/api/quizess/${quizId}/quiz-engagements/${quizEngagementId}/resume`,
  retrieve: ({quizId, quizEngagementId}) => `${root}/api/quizess/${quizId}/quiz-engagements/${quizEngagementId}`,
  update: ({quizId, quizEngagementId}) => `${root}/api/quizess/${quizId}/quiz-engagements/${quizEngagementId}`,
  finish: ({quizId, quizEngagementId}) => `${root}/api/quizess/${quizId}/quiz-engagements/${quizEngagementId}/finish`,
  list: ({quizId}) => `${root}/api/quizess/${quizId}/quiz-engagements`
}
