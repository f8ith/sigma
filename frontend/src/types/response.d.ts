declare interface UserResponse {
  user: User
}
declare interface StudentResponse {
  student: Student
}


declare interface TagsResponse {
  tags: string[]
}

declare interface ProfileResponse {
  profile: Profile
}

declare interface ArticleResponse {
  article: Article
}

declare interface EventResponse {
  event: Event
}
declare interface ArticlesResponse {
  articles: Article[]
  articlesCount: number
}

declare interface CommentResponse {
  comment: ArticleComment
}

declare interface CommentsResponse {
  comments: ArticleComment[]
}
