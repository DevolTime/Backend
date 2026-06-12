import { Router } from "express";
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { createPedido, deletePedido, getPedido, updatePedido } from "../controllers/pedidos.controller.js";
import { autorizationUser } from "../middlewares/authorization.middlewares.js";
import { ROLES } from "../config/global.config.js";

const pedidos = Router ();
pedidos.post("/",[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.AUTHOR,ROLES.EDITOR, ROLES.SUBSCRIBER])], createPedido );
pedidos.get ("/",[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.AUTHOR,ROLES.EDITOR, ROLES.SUBSCRIBER])], getPedido);
pedidos.delete ("/:id",[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.AUTHOR,ROLES.EDITOR, ROLES.SUBSCRIBER])], deletePedido);
pedidos.patch ("/:id",[authenticationUser,autorizationUser([ROLES.ADMIN, ROLES.AUTHOR,ROLES.EDITOR, ROLES.SUBSCRIBER])], updatePedido);

export default pedidos;