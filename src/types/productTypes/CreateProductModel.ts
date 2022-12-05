

interface CreateProductModel {
  department: string
  title: string
  description: string
  price: number
  oldPrice?: number
  quantity?: number
  select: {value: string, laber: string}
  newCategory?: string
  images: string[]
}

interface CreateProductModelRespons {
  success: boolean
}

export type {CreateProductModel, CreateProductModelRespons}
