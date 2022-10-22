import { Router } from "express";
import { getUsers } from "../controllers/usersControllers.js"

const routerusers = Router()

routerusers.get("/users", getUsers)

export default routerusers