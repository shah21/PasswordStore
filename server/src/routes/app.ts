/* Routes file of passwords endpoints */

import { Router } from 'express';
import { body } from "express-validator";

import { postCreatApp,getApps,getApp,deleteApp, updateApp } from '../controllers/app';
import isAuth from '../middlewares/is-auth';
import App from '../models/app';

const router = Router();

router.get('/',isAuth,getApps);

router.get('/:appName',isAuth,getApp);

router.delete('/delete/:appName',isAuth,deleteApp);

router.patch('/update/:appName',isAuth,[
    body('app').custom(async (value,{req})=>{
        /* Check app is already existed or not */
        const userId = req.userId;
        const app = await App.findByApp(value,userId);
        if (app) {
            return Promise.reject("App already exists!");
        }
    }).trim(),
],updateApp);

router.post('/create-app',isAuth,[
    body('password').not().isEmpty().withMessage('Password is empty'),
    body('app').not().isEmpty().withMessage('Appname is empty').custom(async (value,{req})=>{
        /* Check app is already existed or not */
        const userId = req.userId;
        const app = await App.findByApp(value,userId);
        if (app) {
            return Promise.reject("App already exists!");
        }
    }).trim(),
],postCreatApp);

export default router;