import {
  messages,
  ruleName,
} from ".."
import rules from "../../../rules"
import { testRule } from "../../../testUtils"

const rule = rules[ruleName]

testRule(rule, {
  ruleName,
  config: [true],

  accept: [ {
    code: ".selector1.selector2 {}",
  }, {
    code: ".selector1 .selector2 {}",
  }, {
    code: ".selector1  .selector2 {}",
  }, {
    code: ".selector1>.selector2 {}",
  }, {
    code: ".selector1 > .selector2 {}",
  }, {
    code: ".selector1  >  .selector2 {}",
  }, {
    code: ".selector1\n>\n.selector2 {}",
  }, {
    code: ".selector1\r\n>\r\n.selector2 {}",
  } ],

  reject: [ {
    code: ".selector1\t.selector2 {}",
    message: messages.rejected("\t"),
    line: 1,
    column: 11,
  }, {
    code: ".selector1\n.selector2 {}",
    message: messages.rejected("\n"),
    line: 1,
    column: 11,
  }, {
    code: ".selector1\r\n.selector2 {}",
    message: messages.rejected("\r\n"),
    line: 1,
    column: 11,
  } ],
})
