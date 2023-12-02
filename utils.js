const fs = require("fs");

module.exports = {
  getAliasesInTsConfig: () => {
    const rawTsConfig = fs.readFileSync("tsconfig.json", "utf8");
    const tsConfig = JSON.parse(rawTsConfig);
    return tsConfig.compilerOptions?.paths;
  },
};
