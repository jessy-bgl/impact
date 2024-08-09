import { DottedName, NGCRule } from "@incubateur-ademe/nosgestesclimat";
import AdemeModel from "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json";
import PublicodesEngine, { ASTNode, Evaluation, RuleNode } from "publicodes";

export const ademeFootprintModel = new PublicodesEngine(AdemeModel);

export type NGCRuleNode = RuleNode & {
  rawNode: NGCRule & {
    "par défaut"?: string | number;
    "applicable si"?: string;
  };
};

export type NGCRulesNodes = Record<DottedName, NGCRuleNode>;

declare const knownOperations: {
  readonly "*": readonly [(a: any, b: any) => number, "×"];
  readonly "/": readonly [(a: any, b: any) => number, "∕"];
  readonly "**": readonly [(a: any, b: any) => number, "**"];
  readonly "+": readonly [(a: any, b: any) => any];
  readonly "-": readonly [(a: any, b: any) => number, "−"];
  readonly "<": readonly [(a: any, b: any) => boolean];
  readonly "<=": readonly [(a: any, b: any) => boolean, "≤"];
  readonly ">": readonly [(a: any, b: any) => boolean];
  readonly ">=": readonly [(a: any, b: any) => boolean, "≥"];
  readonly "=": readonly [(a: any, b: any) => boolean];
  readonly "!=": readonly [(a: any, b: any) => boolean, "≠"];
  readonly et: readonly [(a: any, b: any) => any];
  readonly ou: readonly [(a: any, b: any) => any];
};

export type OperationNode = {
  nodeKind: "operation";
  explanation: [ASTNode, ASTNode];
  operationKind: keyof typeof knownOperations;
  operator: string;
};

export type ReferenceNode = {
  nodeKind: "reference";
  name: string;
  contextDottedName: string;
  dottedName?: string;
  title?: string;
  acronym?: string;
};

export type ConstantNode = {
  type: "boolean" | "number" | "string" | "date" | undefined;
  nodeValue: Evaluation;
  nodeKind: "constant";
  isNullable?: boolean;
  isDefault?: boolean;
  fullPrecision?: boolean;
};
