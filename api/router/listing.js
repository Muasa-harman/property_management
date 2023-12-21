import express, { Router } from 'express'
const router = express.Router();
import * as listingController from '../controllers/listingController.js'
import { verifyToken } from '../utils/verifyUser.js';

router.post('/create',verifyToken, listingController.createListing)
router.post('/update/:id', verifyToken, listingController.updateListing)
router.delete('/delete/:id', verifyToken, listingController.deleteListing)
router.get('/get/:id', listingController.getListing )
router.get('/get', listingController.getListings)

export default router;