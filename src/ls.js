import path from "path";
import fs from "fs";

const ls = async (target) => {
  await fs.readdir(target, (err, files) => {
    if (files) console.table(files);
    else throw new Error("FS operation failed");
  });
};

export default ls;
