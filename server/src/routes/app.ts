/* Routes file of passwords endpoints */

import { Router } from 'express';
import { body } from "express-validator";

import { postCreatApp,getApps,getApp,deleteApp } from '../controllers/app';
import App from '../models/app';

const router = Router();

router.get('/',getApps);

router.get('/:appName',getApp);

router.delete('/delete/:appName',deleteApp);

router.post('/create-app',[
    body('password').not().isEmpty().withMessage('Password is empty'),
    body('app').not().isEmpty().withMessage('Appname is empty').custom(async (value,{req})=>{
        /* Check app is already existed or not */
        const app = await App.findByApp(value);
        if (app) {
            return Promise.reject("App already exists!");
        }
    }),
],postCreatApp);

export default router;