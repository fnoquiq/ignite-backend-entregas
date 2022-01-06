import { Request, Response } from 'express';
import { FindAllAvailableUseCase } from './findAllAvailableController';

export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const findAllAvailable = new FindAllAvailableUseCase()

    const deliveries = await findAllAvailable.execute()

    return response.json(deliveries)
  }
}