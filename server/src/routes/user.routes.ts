import { Router } from "express";

const router = Router();

import { getUsers, getUserById, createUser, deleteUser } from "../controllers/user.controller";
import { requireRole } from "../middlewares/role.middleware";

router.get("/", requireRole('admin'), getUsers)
router.post("/", requireRole('admin'), createUser);

router.get("/:id", requireRole('admin'), getUserById);
router.delete("/:id", requireRole('admin'), deleteUser);
  

export default router;