import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function handleExit(username) {
  process.stdout.write(
    `\nThank you for using the file manager, ${username}, goodbye!\n`,
  );
  process.exit(0);
}

function hello() {
  let username = "";

  process.argv.forEach((key) => {
    if (key.startsWith("--")) {
      key = key.slice(11);
      username = key
        .split(/[ _-]/g)
        .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
        .join(" ");
      console.log(
        "Welcome to the File Manager,",
        username.concat("!"),
        "\nYou are currently in",
        __dirname,
        "\n",
      );
    }
  });

  process.stdin.on("data", (input) => {
    const trimmedInput = input.toString("utf8").trim();
    if (trimmedInput === ".exit") {
      handleExit(username);
    } else {
      process.stdout.write(`Received input: ${trimmedInput}\n`);
    }
    console.log("\nYou are currently in", __dirname, "\n");
  });

  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
    process.on(signal, () => {
      handleExit(username);
    }),
  );
}

export default hello;
