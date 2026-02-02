import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  //check credentials
  //issue token
  const { email, password } = req.body;
});

export default router;
