import { Router } from "express";
import { getRoles } from "mongoose";

const router = Router ();

router.get('/', (req, res) => {
    res.json({
        msg: 'obtiene todos los roles'
    })
})

export default router;