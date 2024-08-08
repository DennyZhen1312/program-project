import { Router } from "express";
import { router as productsRouter } from "./products.router";
import { router as userRouter } from "./user.router";

export const apiRouter = Router();

const ROUTER = [
  { url: "/users", router: userRouter },
  { url: "/products", router: productsRouter },
];

ROUTER.forEach(({ url, router }) => {
  apiRouter.use(url, router);
});
