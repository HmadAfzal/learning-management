import express from "express";
import { createStripePaymentIntent, createTransaction, listTransactions } from "../controllers/transaction.controllers";

const router = express.Router();

router.get("/", listTransactions);
router.post("/", createTransaction);
router.post("/stripe/payment-intent", createStripePaymentIntent);

export default router;