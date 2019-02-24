export let login = 'http://p1.lvh.me:8080/api/login'
export let register = 'http://p1.lvh.me:8080/api/register'
export let quizApps = {
  load: 'http://p1.lvh.me:8080/api/load'
}
export let quizess = {
  list: `http://p1.lvh.me:8080/api/quizess`,
  prepare: ({quizId}) => `http://p1.lvh.me:8080/api/quizess/${quizId}/prepare`,
}

export let quizEngagement = {
  create: `http://p1.lvh.me:8080/api/quiz-engagements`,
  update: ({quizEngagementId}) => `http://p1.lvh.me:8080/api/quiz-engagements/${quizEngagementId}`,
  finish: ({quizEngagementId}) => `http://p1.lvh.me:8080/api/quiz-engagements/${quizEngagementId}/finish`,
  list: ({quizId}) => `http://p1.lvh.me:8080/api/quiz-engagements/${quizId}`
}
