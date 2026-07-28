import { Router } from "express";
import getRoles from "../controllers/role.controller.js";

const router =Router ();

router.get('/', getRoles)

   
    export default router;