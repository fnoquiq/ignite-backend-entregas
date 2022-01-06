import { Router } from 'express'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { AuthenticateClientController } from './modules/account/authenticateUser/AuthenticateClientController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/findAllAvailable/findAllAvailableUseCase'
import { UpdateDeliverymanController } from './modules/deliveries/updateDeliveryman/useCases/UpdateDeliverymanController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { ensureAuthenticateClient } from './modules/middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from './modules/middlewares/ensureAuthenticateDeliveryman'

const routes = Router() 

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()

routes.post('/client/', createClientController.handle)
routes.post('/client/authenticate/', authenticateClientController.handle)

routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate/', authenticateDeliverymanController.handle)

routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle)

routes.post('/delivery/available' , ensureAuthenticateDeliveryman, findAllAvailableController.handle)

routes.post('/delivery/updateDeliveryman/:id' , ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

export { routes }