import { Request, Response } from "express";
import { User } from "../models";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config";

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

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body as {
      email?: string;
      username?: string;
      password: string;
    };

    if ((!email && !username) || !password) {
      res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email || "" }, { username: username || "" }],
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found, Register first!", success: false });
    }

    const validPassword = await bcrypt.compare(password, user?.password as string);

    if (!validPassword) {
      res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ userId: user?.id }, config.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
};
