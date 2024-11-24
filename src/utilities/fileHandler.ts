import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../database/users.json");

export const readFromUsers = async (): Promise<any> => {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const writeToUsers = async (users: any): Promise<void> => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(users), "utf-8");
  } catch (error) {
    console.error("Error writing to users:", error);
  }
};
