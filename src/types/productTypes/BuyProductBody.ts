
interface IProductTypeBody {
  id: string
  counter: number
}

interface IBuyerTypeBody {
  firstName: string
    lastName: string
    email: string
    address: string
    options: string
    city: string
    phone: string
    bayer: string
}

interface BuyProductBody {
product: IProductTypeBody[]
buyer: IBuyerTypeBody
}

export type {BuyProductBody}