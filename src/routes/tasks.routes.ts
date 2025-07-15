import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers";
import { isAuthenticated } from "../middleware";

const router = Router();

router.get("/", isAuthenticated, getAllTasks);
router.post("/", isAuthenticated, createTask);
router.get("/:id", isAuthenticated, getTaskById);
router.put("/:id", isAuthenticated, updateTask);
router.delete("/:id", isAuthenticated, deleteTask);

export default router;
