import { NextFunction, Request, Response } from "express";

type ExpressFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

type Controller = {
  [funcName: string]: ExpressFunction;
};

type Middleware = ExpressFunction;

type Guard = ExpressFunction;

type ExceptionHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
