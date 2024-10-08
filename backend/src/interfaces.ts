import { type Request, type Response } from "express";
import type { Boat } from "./types.js";

export interface BoatCreateRequest extends Request {
  body: Boat;
}

export interface BoatCreateResponse extends Response {
  body?: Boat;
}

export interface BoatGetDetailRequest extends Request {
  params: {
    id: string;
  };
}

export interface BoatGetDetailResponse extends Response {
  body?: Boat | Error;
}

export interface BoatUpdateRequest extends Request {
  params: {
    id: string;
  };
  body: Omit<Boat, "id">;
}

export interface BoatUpdateResponse extends Response {
  body?: Boat | Error;
}

export interface BoatDeleteRequest extends Request {
  params: {
    id: string;
  };
}

export interface BoatDeleteResponse extends Response {
  body?: Boat | Error;
}
