const express = require('express');
const router = express.Router()

const userRouter = require('./user.router');
const todoRouter = require('./todo.router');

router.use("/user", userRouter)
router.use("/todo", todoRouter)
// router.use("/psikolog")
// router.use("/aarticle")

module.exports = router
