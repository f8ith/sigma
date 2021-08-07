import { request } from '../index'

interface Result {
    id: string,
    time: string
}

interface PostScoreForm {
  results: Result[]
}

/* export function postArticle (form: PostScoreForm): Promise<Event> {
  return request.post<ArticleResponse>('/events', { article: form })
    .then(res => res.article)
}

 */

export function putArticle (id: string, form: PostScoreForm): Promise<Event> {
  return request.put<EventResponse>(`/events/${id}`, { results: form })
    .then(res => res.event)
}
