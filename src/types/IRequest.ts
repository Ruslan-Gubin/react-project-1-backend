import  { Request } from "express";

interface IRequestBody<T> extends Request {body: T}

type IRequestParams<T> = Request<T>
type IRequestQuery<T> = Request<{},{},{},T>
type IRequestParamsBody<P,T> = Request<P,{},T>

export type {IRequestBody ,IRequestParams, IRequestQuery, IRequestParamsBody}
