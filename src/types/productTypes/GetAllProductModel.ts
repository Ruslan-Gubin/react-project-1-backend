 

interface GetAllProductModelQuery {
  category: string        
  select: string
  department: string 
  textSearch: string
  page: number
  perPage: number
}



export type {GetAllProductModelQuery}