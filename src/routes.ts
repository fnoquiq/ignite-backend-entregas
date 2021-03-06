import { Router } from 'express'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { AuthenticateClientController } from './modules/account/authenticateUser/AuthenticateClientController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController'
import { CreateDeliveryController } from './modules/deliveries/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/findAllAvailable/findAllAvailableUseCase'
import { UpdateDeliverymanController } from './modules/deliveries/updateDeliveryman/useCases/UpdateDeliverymanController'
import { UpdateEndDateController } from './modules/deliveries/updateEndDate/UpdateEndDateController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController'
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
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post('/client/', createClientController.handle)
routes.post('/client/authenticate/', authenticateClientController.handle)
routes.get('/client/deliveries/', ensureAuthenticateClient, findAllDeliveriesController.handle)

routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate/', authenticateDeliverymanController.handle)
routes.get('/deliveryman/deliveries/', ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)

routes.post('/delivery/', ensureAuthenticateClient, createDeliveryController.handle)
routes.get('/delivery/available' , ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put('/delivery/updateDeliveryman/:id' , ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.put('/delivery/updateEndDate/:id', ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes }