import {Router} from 'express'
import {adminAuthMiddleware} from '../../middlewares/admin-auth-middleware'
import {feedbacksService} from '../../domain/feedbacks-service'
import {superAdminAuthMiddleware} from "../../middlewares/superadmin-auth-middleware";

export const feedbacksRouter = Router({})

feedbacksRouter
    .post('/', adminAuthMiddleware,
        async (req, res) => {
            const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.admin!._id)
            res.status(201).send(newProduct)
        })
    /**
     * End point for superadmin
     */
    .get('/', superAdminAuthMiddleware, async (req, res) => {
        const users = await feedbacksService
            .allFeedbacks()
        res.send(users)
    })
