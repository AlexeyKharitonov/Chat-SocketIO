import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Проверка связи!!!!!!!!!!!1");
});

export default router;
