import { Request, Response } from "express";

type Boat = {
  id: number;
  name?: string;
  description?: string;
};

type Error = {
  message: string;
};

interface BoatPostRequest extends Request {
  body?: Boat;
}

interface BoatPostResponse extends Response {
  body?: Boat;
}

interface BoatGetDetailRequest extends Request {
  params: {
    id: string;
  };
}

interface BoatGetDetailResponse extends Response {
  body?: Boat | Error;
}

interface BoatUpdateRequest extends Request {
  params: {
    id: string;
  };
  body: Omit<Boat, { id: string }>;
}

interface BoatUpdateResponse extends Response {
  body?: Boat | Error;
}

interface BoatDeleteRequest extends Request {
  params: {
    id: string;
  };
}

interface BoatDeleteResponse extends Response {
  body?: Boat | Error;
}
