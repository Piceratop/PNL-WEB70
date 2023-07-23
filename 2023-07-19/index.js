const fs = require("fs");

const wordListCSW21 = fs.readFileSync("CSW21.txt", "utf-8").split("\n");
const wordListNWL2020 = fs.readFileSync("NWL2020.txt", "utf-8").split("\n");

export { wordListCSW21, wordListNWL2020 };
