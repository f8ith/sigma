import { request } from '../index'

export function getArticle (id: number): Promise<Event> {
  return request.get<EventResponse>(`/event/${id}`).then(res => res.event)
}