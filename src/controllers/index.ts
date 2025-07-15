import { healthController } from "./health.controllers";
import { registerController, loginController } from "./auth.controllers";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./tasks.controllers";

export {
  healthController,
  loginController,
  registerController,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
};
