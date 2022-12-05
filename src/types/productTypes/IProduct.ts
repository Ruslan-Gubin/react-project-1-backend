
interface IProduct {
category: string
comments: string[]
createdAt: string
department:string
description: string
discount: number
images: {public_id: string, url: string}[]
oldPrice: number
price: number
quantity: number
title: string 
updatedAt: string 
viewsCount: number
__v: number
_id: string 
}

export type {IProduct}