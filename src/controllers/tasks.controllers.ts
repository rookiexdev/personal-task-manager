import { Response } from "express";
import { Task } from "../models";
import { Op, WhereOptions } from "sequelize";
import logger from "../utils/logger";

export const getAllTasks = async (req: any, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized user", success: false });
    }

    const { priority, status, dueFrom, dueTo, sortBy, sortOrder } = req.query;

    const where: WhereOptions = {
      userId,
    };

    if (priority) {
      where.priority = priority;
    }

    if (status) {
      where.status = status;
    }

    if (dueFrom || dueTo) {
      where.dueDate = {};
      if (dueFrom) {
        (where.dueDate as any)[Op.gte] = new Date(dueFrom as string);
      }
      if (dueTo) {
        (where.dueDate as any)[Op.lte] = new Date(dueTo as string);
      }
    }

    const sortField = sortBy === "priority" ? "priority" : "dueDate";
    const order = sortOrder === "desc" ? "DESC" : "ASC";

    const tasks = await Task.findAll({
      where,
      order: [[sortField, order]],
    });

    res.status(200).json(tasks);
  } catch (error) {
    logger.error(`Failed to get all tasks: ${(error as Error).message}`);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Failed to get all tasks", success: false });
    }
  }
};

export const createTask = async (req: any, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const { title, description, priority, dueDate, status } =
      req.body as any as {
        title: string;
        description?: string;
        priority: "low" | "medium" | "high";
        dueDate: Date;
        status: "pending" | "completed";
      };

    if (!title || !priority || !dueDate || !status) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
      success: true,
    });
  } catch (error) {
    logger.error(`Failed to create task: ${(error as Error).message}`);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Failed to create task", success: false });
    }
  }
};

export const getTaskById = async (req: any, res: Response) => {
  const taskId = req.params.id;
  const userId = req.userId;

  try {
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized", success: false });
    }

    return res.status(200).json(task);
  } catch (error) {
    logger.error(`Failed to get task: ${(error as Error).message}`);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to get task", success: false });
    }
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;
    const { title, description, priority, dueDate, status } = req.body;
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized", success: false });
    }

    await task.update({ title, description, priority, dueDate, status });

    return res
      .status(200)
      .json({ message: "Task updated", task, success: true });
  } catch (err) {
    logger.error(`Failed to update task: ${(err as Error).message}`);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Failed to update task", success: false });
    }
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized", success: false });
    }

    await task.destroy();

    return res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (err) {
    logger.error(`Task deletion failed: ${(err as Error).message}`);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Failed to delete task", success: false });
    }
  }
};
