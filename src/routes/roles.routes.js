import { Router } from "express";

const router = Router ();

router.get('/', (req, res) => {
    res.json({
        msg: 'obtiene todos los roles'
    })
})

export default router;