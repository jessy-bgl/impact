import fs from "fs";
import { TSConfigJSON } from "types-tsconfig";

export const getAliasesInTsConfig = ():
  | Record<string, string[]>
  | undefined => {
  const rawTsConfig = fs.readFileSync("tsconfig.json", "utf8");
  const tsConfig: TSConfigJSON = JSON.parse(rawTsConfig);
  return tsConfig.compilerOptions?.paths;
};
