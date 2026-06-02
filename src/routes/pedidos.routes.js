import { Router } from "express";
import { createPedido, deletePedido, getPedido, updatePedido } from "../controllers/pedidos.controller.js";

const pedidos = Router ();
pedidos.post("/", createPedido );
pedidos.get ("/", getPedido);
pedidos.delete ("/:id", deletePedido);
pedidos.patch ("/:id", updatePedido);

export default pedidos;