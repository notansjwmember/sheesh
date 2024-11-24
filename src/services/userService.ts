import { User, createUserModel } from "../models/userModel";
import { readFromUsers, writeToUsers } from "../utilities/fileHandler";

export const createUser = async (
  firstName: string,
  lastName: string,
  age: number
): Promise<any> => {
  try {
    console.log("Creating user..");

    const data = await readFromUsers();
    const users = data.users;

    const isConflict = users.some(
      (user: { firstName: string; lastName: string }) =>
        user.firstName === firstName && user.lastName === lastName
    );

    const validAge = age > 0 && age < 100;

    if (!validAge) {
      console.log("Invalid age");
      return { success: false, message: "Invalid age." };
    }

    if (isConflict) {
      console.log("User already exists");
      return { success: false, message: "User already exists." };
    }

    const newUser = createUserModel(firstName, lastName, age);
    console.log(newUser);

    users.push(newUser);

    console.log("Created the user successfully.");
    await writeToUsers(data);

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Could not create user:", error);
    return { success: false, message: "Internal Server Error." };
  }
};

export const findAllUsers = async (): Promise<any> => {
  try {
    const data = await readFromUsers();

    console.log(`Fetching ${data.users.length} users..`);

    return { success: true, users: data.users };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

export const findOneUser = async (key: any): Promise<any> => {
  try {
    const data = await readFromUsers();
    const users = data.users;

    console.log(`Finding the user with their ID: ${key}..`);
    let user = users.find((user: { id: number }) => user.id === parseInt(key));

    console.log(`Could not find the user by ID.`);
    console.log(`Finding user with their first name: ${key}`);
    if (!user)
      user = users.find(
        (user: { firstName: any }) => user.firstName.toLowerCase() === key.toLowerCase()
      );

    if (!user) {
      console.error("Could not find the user with both their name and ID.");
      console.error("User probably does not exist.");
      return { success: false, message: "User does not exist" };
    }

    console.log("Found user: ", user);
    return { success: true, user: user };
  } catch (error) {
    console.error("Could not find user:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

export const updateUser = async (
  key: any,
  firstName?: string,
  lastName?: string,
  age?: number
): Promise<any> => {
  try {
    const data = await readFromUsers();
    let user = await findOneUser(key);

    if (!user) {
      console.error("Could not find the user with both their name and ID.");
      console.error("User probably not exist.");
      return { success: false, message: "User does not exist" };
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    user.updatedAt = new Date();

    await writeToUsers(data);

    console.log("Updated user:", user);
    return { success: true, user: user };
  } catch (error) {
    console.error("Could not update user:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

export const deleteUser = async (key: any): Promise<any> => {
  try {
    const data = await readFromUsers();
    const users = data.users;

    let userIndex = users.findIndex((user: { id: number }) => user.id === parseInt(key));

    if (userIndex === -1)
      userIndex = users.findIndex(
        (user: { firstName: any }) => user.firstName.toLowerCase() === key.toLowerCase()
      );

    if (userIndex === -1) {
      console.error("Could not find the user with both their name and ID.");
      console.error("User probably does not exist.");
      return { success: false, message: "User does not exist." };
    }

    const deletedUser = users[userIndex];

    users.splice(userIndex, 1);

    await writeToUsers(data);

    console.log("Deleted user:", deletedUser);
    return { success: true, user: deletedUser };
  } catch (error) {
    console.error("Could not delete user:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
