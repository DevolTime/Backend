import { Router } from "express";
import authenticationUser from "../middlewares/authentication.middlewares.js";
import { createPedido, deletePedido, getPedido, updatePedido } from "../controllers/pedidos.controller.js";

const pedidos = Router ();
pedidos.post("/",authenticationUser, createPedido );
pedidos.get ("/",authenticationUser, getPedido);
pedidos.delete ("/:id",authenticationUser, deletePedido);
pedidos.patch ("/:id",authenticationUser, updatePedido);

export default pedidos;