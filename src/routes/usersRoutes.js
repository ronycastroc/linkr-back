import { Router } from "express";
import { getUsers, userMe } from "../controllers/usersControllers.js"

const routerusers = Router()

routerusers.get("/users", getUsers)
routerusers.get("/user/:id", userMe)

export default routerusers