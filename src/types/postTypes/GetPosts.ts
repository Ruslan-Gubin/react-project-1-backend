

interface GetPostsQuery {
  categor: string
  search: string
  tags: string[]
  page: number 
  perpage: number
}

export type {GetPostsQuery}