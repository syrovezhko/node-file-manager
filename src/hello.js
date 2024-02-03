function hello() {
  process.argv.forEach((key) => {
    if (key.startsWith("--")) {
      key = key.slice(11);
      console.log(
        "Welcome to the File Manager,",
        key
          .split(/[ _-]/g)
          .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
          .join(" ")
          .concat("!"),
      );
    }
  });
}

export default hello;
