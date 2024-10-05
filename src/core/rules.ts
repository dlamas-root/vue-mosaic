
export type Rule = (value: string | undefined) => boolean | string

export function validate(value: any, rules: Array<Rule> | undefined): string {
  let result: string = ''
  rules?.forEach((rule: Rule) => {
    const ruleResult: boolean | string = rule(value);
    if (typeof ruleResult === 'string') {
      result = ruleResult;
      return;
    }
  })
  return result;
}