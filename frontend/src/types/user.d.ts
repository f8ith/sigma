declare interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

declare interface User {
  id: number
  email: string
  username: string
  bio: string | undefined
  image: string | undefined
  token: string
}
declare interface Student {
  id: number
  class: string
  classNumber: number
  name: string
  bio: string | undefined
  image: string | undefined
  exempt: boolean
  power: boolean
  token: string
}
