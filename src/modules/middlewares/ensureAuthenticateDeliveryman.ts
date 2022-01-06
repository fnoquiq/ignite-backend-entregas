import { NextFunction, Request, response, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string
}

export async function ensureAuthenticateDeliveryman(request: Request, Response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing'
    })
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, 'secret_key_deliveryman') as IPayload

    request.id_deliveryman = sub

    return next()
  }catch(err){
    return response.status(401).json({
      message: 'Invalid token'
    })
  }
}