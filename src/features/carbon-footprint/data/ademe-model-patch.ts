import {
  DottedName,
  NGCRule,
  NGCRules,
} from "@incubateur-ademe/nosgestesclimat";

/**
 * A yes/no question the model gives no `par défaut` for is neither "oui" nor
 * "non" once the user hasn't answered it: its `non applicable si "<key> = non"`
 * follow-ups stay wrongly visible, the footprint falls back to the French
 * average, and the UI renders the select with no option chosen.
 *
 * "non" is the right default for all of them — it matches both the unchecked
 * state of a mosaic option and the "nothing declared yet" intent of a plain
 * boolean question. Declaring it on the rule rather than writing it into every
 * user's profile lets Publicodes resolve it natively: no startup pass over the
 * model's questions, nothing extra persisted, and the footprints computed on
 * first launch are already correct for sections the user never opened.
 *
 * The ADEME package is left untouched — `npm update` keeps working and the
 * divergence from the published model is this file. `ademe-model-patch.test.ts`
 * snapshots the patched dotted names so an upstream release that adds, drops or
 * renames a boolean question fails CI instead of silently changing behaviour.
 */
export const applyDefaultBooleanAnswers = (rules: NGCRules): NGCRules => {
  const patched = structuredClone(rules);

  for (const dottedName of findBooleanQuestionsWithoutDefault(rules)) {
    const rule = resolveRule(patched, dottedName);
    if (!rule)
      throw new Error(
        `Cannot apply the "non" default: no rule found at "${dottedName}"`,
      );
    rule["par défaut"] = "non";
  }

  return patched;
};

/**
 * Walks the raw rules rather than a parsed engine: instantiating a throwaway
 * `Engine` just to read `getParsedRules()` would double the model parsing cost
 * on every app start. Both walks yield the same set — see the test.
 */
export const findBooleanQuestionsWithoutDefault = (
  rules: NGCRules,
): DottedName[] => {
  const dottedNames: DottedName[] = [];

  const walk = (dottedName: DottedName, rule: NGCRule) => {
    if (!rule) return;
    if (isBooleanQuestionWithoutDefault(rule)) dottedNames.push(dottedName);
    for (const [name, subRule] of Object.entries(getNestedRules(rule)))
      walk(`${dottedName} . ${name}` as DottedName, subRule);
  };

  for (const [dottedName, rule] of Object.entries(rules))
    walk(dottedName as DottedName, rule);

  return dottedNames;
};

/**
 * The same shape test as `AdemeQuestion.getType()` uses to return
 * "select-boolean", minus the rules that already carry a default. Keep the two
 * in sync: a rule matching here must render as a yes/no question.
 */
const isBooleanQuestionWithoutDefault = (rule: NonNullable<NGCRule>): boolean =>
  rule.question !== undefined &&
  rule.question !== null &&
  rule.mosaique === undefined &&
  rule["une possibilité"] === undefined &&
  rule["unité"] === undefined &&
  rule["par défaut"] === undefined;

/**
 * A rule is either a top-level entry or nested in an ancestor's `avec` block —
 * `logement . chauffage . appoint`'s mosaic options are of the second kind.
 * Re-declaring a nested one at the top level makes Publicodes throw at parse
 * time, so it has to be patched where it is defined.
 */
const resolveRule = (
  rules: NGCRules,
  dottedName: DottedName,
): NonNullable<NGCRule> | undefined => {
  const topLevelRule = rules[dottedName];
  if (topLevelRule) return topLevelRule;

  const parts = dottedName.split(" . ");
  for (let i = parts.length - 1; i > 0; i--) {
    const ancestor = rules[parts.slice(0, i).join(" . ") as DottedName];
    if (!ancestor) continue;
    const nestedRule = getNestedRules(ancestor)[parts.slice(i).join(" . ")];
    if (nestedRule) return nestedRule;
  }

  return undefined;
};

const getNestedRules = (
  rule: NonNullable<NGCRule>,
): Record<string, NonNullable<NGCRule>> =>
  (rule["avec"] as Record<string, NonNullable<NGCRule>> | undefined) ?? {};
