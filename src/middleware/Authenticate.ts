import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JwtSecret } from "../keys";

interface Payload {
  sub: string;
}

export function Authenticate(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    console.log("Auth token vazio");
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, JwtSecret) as Payload;
    //é necessário declarar o tipo user_id no request; no @types express
    req.uid = Number(sub);

    return next();
  } catch (err) {
    console.log(err);
    res.status(401).end();
  }
}
