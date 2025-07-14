import { Request, Response } from "express";
import { User } from "../models";
import { DatabaseError, Op } from "sequelize";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    // checking existing user
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      res.status(400).json({
        message: "Username or email already exists, try with a different one",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // creating new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      user: { username, email },
      success: true,
    });
  } catch (error) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
};

export const loginController = () => {};
