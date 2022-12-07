

interface GetUserPostsQuery {
  categor: string
  page: number
  perpage: number
  tags: string
  search: string
  searchUSer: string
  auth: string
}

export type {GetUserPostsQuery}