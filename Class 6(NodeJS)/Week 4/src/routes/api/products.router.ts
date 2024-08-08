import { Request, Response, Router } from "express";
import { pool } from "../../db";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
  image: string
};

export const router = Router();

// /api/v1/products
router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query<Product>(`SELECT * FROM products;`);

  res.json(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Product>(
    `SELECT * FROM products WHERE id = $1;`,
    [id]
  );

  const product = data.rows[0];

  if (!product) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  res.json(product);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, price, description, image } = req.body;

  const data = await pool.query(
    `
    INSERT INTO products (title, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *;  
  `,
    [title, price, description, image]
  );

  res.status(201).json(data.rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Product>(
    `SELECT * FROM products WHERE id = $1;`,
    [id]
  );

  const product = data.rows[0];

  if (!product) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const { title, price, description, image } = req.body;

  const updated = await pool.query<Product>(
    `
      UPDATE products 
      SET title = $1, price = $2, description = $3, image = $4
      WHERE id = $5
      RETURNING *
    `,
    [title, price, description, image, id]
  );

  res.json(updated.rows[0]);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<Product>(
    `SELECT * FROM products WHERE id = $1;`,
    [id]
  );

  const product = data.rows[0];

  if (!product) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const deleted = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  res.json(deleted.rows[0]);
});