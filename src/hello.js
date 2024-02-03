import os from "os";
import makeTextColor from "./makeTextColor.js";
import commands from "./commands.json" with { type: "json" };

let __dirname = os.homedir();

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
        "\nIn order to get the list of commands write",
        makeTextColor("--help", "blue", true),
      );
    }
  });

  process.stdin.on("data", (input) => {
    const trimmedInput = input.toString("utf8").trim();
    const command = trimmedInput.split(" ")[0];
    if (trimmedInput === ".exit") {
      handleExit(username);
    } else if (trimmedInput === "--help") {
      for (let command in commands) {
        console.log(
          makeTextColor(command, "yellow"),
          `${command} ${commands[command].replace(
            /(?=[A-Z])/,
            "\x1b[31m",
          )}\x1b[0m`,
        );
        console.log(makeTextColor("_".repeat(100), "green"));
      }
    } else {
      console.log(
        "There are not command like",
      makeTextColor(command, "red", true),
      "Check out",
        makeTextColor("--help", "blue", true),
      );
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
