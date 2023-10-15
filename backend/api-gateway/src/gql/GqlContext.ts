import { Response } from "express";
import { PubSub } from "apollo-server-express";

export interface GqlContext {
  req: any;
  res: Response;
  pubsub: PubSub;
}