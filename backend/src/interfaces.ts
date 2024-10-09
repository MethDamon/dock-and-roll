import {
  type Response as ExpressResponse,
  type Request as ExpressRequest,
} from "express";
import { type Send } from "express-serve-static-core";

export interface TypedRequest<T> extends ExpressRequest {
  body: T;
}

export interface TypedResponse<T> extends ExpressResponse {
  json: Send<T, this>;
}
