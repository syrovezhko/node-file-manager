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
      console.log("Welcome to the File Manager,", username.concat("!"));
    }
  });

  process.stdin.on("data", (input) => {
    const trimmedInput = input.toString("utf8").trim();
    if (trimmedInput === ".exit") {
      handleExit(username);
    } else {
      process.stdout.write(`Received input: ${trimmedInput}\n`);
    }
  });

  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
    process.on(signal, () => {
      handleExit(username);
    }),
  );
}

export default hello;
