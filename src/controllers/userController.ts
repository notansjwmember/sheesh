import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updateUser,
} from "../services/userService";

export const createUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, age } = req.body;
    let errors = [];

    if (!firstName) errors.push("First name is required.");
    if (!lastName) errors.push("Last name is required");
    if (!age) errors.push("Age is required");

    if (!firstName || !lastName || !age) {
      return res.status(400).json({ message: errors });
    }

    const result = await createUser(firstName, lastName, age);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({ message: "Created user", user: result.user });
  } catch (error) {
    console.error("Error occured while creating users:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const findAllUsersController = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await findAllUsers();
    if (!result) {
      console.log("Could not fetch all users.");
      return res.status(500).json({ message: "Could not fetch all users." });
    }

    return res.status(200).json({ message: "Fetched all users", users: result.users });
  } catch (error) {
    console.error("Error occured while fetching all users:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const findOneUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { key } = req.params;

    const result = await findOneUser(key);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ message: "Found user", user: result.user });
  } catch (error) {
    console.error("Error occured while fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { key } = req.params;
    const { firstName, lastName } = req.body;

    const result = await updateUser(key, firstName, lastName);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: "Updated user", updatedUser: result.user });
  } catch (error) {
    console.error("Error occured while updating user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { key } = req.params;

    const result = await deleteUser(key);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: "Deleted user", deletedUser: result.user });
  } catch (error) {
    console.error("Error occured while deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
