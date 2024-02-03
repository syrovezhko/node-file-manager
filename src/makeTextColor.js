function makeTextColor(text, color, bg = false, bright = false) {
  let code = 0;
  switch (color) {
    case "red":
      code = 1;
      break;
    case "green":
      code = 2;
      break;
    case "yellow":
      code = 3;
      break;
    case "blue":
      code = 4;
      break;
    case "magenta":
      code = 5;
      break;
    case "cyan":
      code = 6;
      break;
    case "white":
      code = 7;
      break;
    default:
      code = 0;
  }
  code += 30;
  if (bg) code += 10;
  if (bright) code += 60;
  return `\x1b[${code}m${text}\x1b[0m\n`;
}

export default makeTextColor;
