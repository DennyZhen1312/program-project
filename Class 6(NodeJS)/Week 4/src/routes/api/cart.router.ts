import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router({ mergeParams: true });

// /api/v1/users/:userId/carts
router.get("/", async (req: Request, res: Response) => {
  const { userId } = req.params;

  const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  const user = userData.rows[0];

  if (!user) {
    res.status(404).json({
      error: 404,
      message: `user with id ${userId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    `SELECT carts.id AS cart_id, 
       products.title, 
       products.price, 
       products.description,
       products.image,
       carts.quantity
       FROM carts 
       JOIN products ON carts.product_id = products.id 
       WHERE carts.user_id = $1;`,
    [userId]
  );

  res.json(cartData.rows);
});

// /api/v1/users/:userId/carts/:id
router.get("/:cartId", async (req: Request, res: Response) => {
  const { userId, cartId } = req.params;

  const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  const user = userData.rows[0];

  if (!user) {
    res.status(404).json({
      error: 404,
      message: `user with id ${userId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    `SELECT carts.id AS cart_id, 
       products.title, 
       products.price, 
       products.description,
       products.image, 
       carts.quantity
       FROM carts 
       JOIN products ON carts.product_id = products.id
       WHERE carts.id = $1 AND carts.user_id = $2`,
    [cartId, userId]
  );

  const cart = cartData.rows[0];

  if (!cart) {
    res.status(404).json({
      error: 404,
      message: `cart with id ${cartId} does not exist`,
    });
    return;
  }

  res.json(cart);
});

router.post("/", async (req: Request, res: Response) => {
  const { userId } = req.params;

  const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  const user = userData.rows[0];

  if (!user) {
    res.status(404).json({
      error: 404,
      message: `user with id ${userId} does not exist`,
    });
    return;
  }

  const { product_id, quantity } = req.body;

  const cartData = await pool.query(
    "INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
    [userId, product_id, quantity]
  );

  res.json(cartData.rows[0]);
});

router.put("/:cartId", async (req: Request, res: Response) => {
  const { userId, cartId } = req.params;

  const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  const user = userData.rows[0];

  if (!user) {
    res.status(404).json({
      error: 404,
      message: `user with id ${userId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    "SELECT * FROM carts WHERE carts.id = $1 AND carts.user_id = $2",
    [cartId, userId]
  );

  const cart = cartData.rows[0];

  if (!cart) {
    res.status(404).json({
      error: 404,
      message: `cart with id ${cartId} does not exist`,
    });
    return;
  }

  const { product_id, quantity } = req.body;

  const updated = await pool.query(
    `
        UPDATE carts 
        SET product_id = $1, quantity = $2
        WHERE carts.id = $3 AND carts.user_id = $4
        RETURNING *;
      `,
    [product_id, quantity, cartId, userId]
  );

  res.json(updated.rows[0]);
});

router.delete("/:cartId", async (req: Request, res: Response) => {
  const { userId, cartId } = req.params;

  const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId
  ]);

  const user = userData.rows[0];

  if (!user) {
    res.status(404).json({
      error: 404,
      message: `user with id ${userId} does not exist`,
    });
    return;
  }

  const cartData = await pool.query(
    "SELECT * FROM carts WHERE carts.id = $1 AND carts.user_id = $2",
    [cartId, userId]
  );

  const cart = cartData.rows[0];

  if (!cart) {
    res.status(404).json({
      error: 404,
      message: `cart with id ${cartId} does not exist`
    });
    return;
  }

  const client = await pool.connect();

  await client.query("BEGIN");

  // try to delete all the record

  const deletedData = await client.query(
    "DELETE FROM carts WHERE carts.id = $1 AND carts.user_id = $2 RETURNING *;",
    [cartId, userId]
  );

  if (deletedData.rows.length > 1) {
    await client.query("ROLLBACK");

    res.status(500).json({
      error: 500,
      message: `something went wrong while deleting the cart with id ${cartId}`
    });
    return;
  }

  await client.query("COMMIT");

  res.json(deletedData.rows[0]);
});