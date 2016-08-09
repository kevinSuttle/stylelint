import {
  isStandardSyntaxRule,
  isStandardSyntaxSelector,
  parseSelector,
  report,
  ruleMessages,
  validateOptions,
} from "../../utils"
import { nonSpaceCombinators } from "../../reference/punctuationSets"

export const ruleName = "selector-descendant-combinator-no-non-space"

export const messages = ruleMessages(ruleName, {
  rejected: nonSpaceCharacter => `Unexpected non-space "${nonSpaceCharacter}" characters in descendant combinator`,
})

export default function (actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual })
    if (!validOptions) { return }

    root.walkRules(rule => {
      if (!isStandardSyntaxRule(rule)) { return }

      const { selector } = rule
      if (!isStandardSyntaxSelector(selector)) { return }

      parseSelector(selector, result, rule, fullSelector => {
        fullSelector.walkCombinators(combinatorNode => {
          const { value } = combinatorNode

          if (nonSpaceCombinators.has(value)) { return }
          if ((/^ *$/).test(value)) { return }

          report({
            result,
            ruleName,
            message: messages.rejected(value),
            node: rule,
            index: combinatorNode.sourceIndex,
          })
        })
      })
    })
  }
}
