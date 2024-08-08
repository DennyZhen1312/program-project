import { Request, Response, Router } from "express";
import { pool } from "../../db";
import { router as cartsRouter } from "./cart.router";

type User = {
  id: number;
  email: string;
  password: string;
  created_at: Date
};

export const router = Router();

router.use("/:userId/carts", cartsRouter);

// /api/v1/users
router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query<User>(`SELECT * FROM users;`);

  res.json(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<User>(
    `SELECT * FROM users WHERE id = $1;`,
    [id]
  );

  const user = data.rows[0];

  if (!user) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  res.json(user);
});

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await pool.query(
    `
    INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;  
  `,
    [email, password]
  );

  res.status(201).json(data.rows[0]);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<User>(
    `SELECT * FROM users WHERE id = $1;`,
    [id]
  );

  const user = data.rows[0];

  if (!user) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const { email, password } = req.body;

  const updated = await pool.query<User>(
    `
      UPDATE users 
      SET email = $1, password = $2
      WHERE id = $3
      RETURNING *
    `,
    [email, password, id]
  );

  res.json(updated.rows[0]);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query<User>(
    `SELECT * FROM users WHERE id = $1;`,
    [id]
  );

  const user = data.rows[0];

  if (!user) {
    res
      .status(404)
      .json({ error: 404, message: `Record with id ${id} does not exist.` });
  }

  const deleted = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  res.json(deleted.rows[0]);
});