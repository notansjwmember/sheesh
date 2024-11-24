import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "counter.json");

const readCurrent = (): number => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const counter = JSON.parse(data);
    return counter.current;
  } catch (error) {
    return 10000;
  }
};

const writeCurrent = (current: number): void => {
  const data = JSON.stringify({ current });
  fs.writeFileSync(filePath, data, "utf-8");
};

export const generateId = (): number => {
  const max = 90000;
  let current = readCurrent();

  if (current >= max) {
    throw new Error("Can't create new ID. We have reached the end...");
  }

  current++;
  writeCurrent(current);

  return current;
};
