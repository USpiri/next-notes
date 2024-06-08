import { Node, mergeAttributes } from "@tiptap/react";
import {
  REGEX_INLINE_MATH_DOLLARS,
  makeInlineMathInputRule,
} from "@benrbray/prosemirror-math";
import { inputRules } from "@tiptap/pm/inputrules";

export const MathInline = Node.create({
  name: "math_inline",
  group: "inline math",
  content: "text*", // important!
  atom: true, // important!
  code: true,
  inline: true,

  parseHTML() {
    return [
      {
        tag: "math-inline", // important!
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "math-inline",
      mergeAttributes({ class: "math-node" }, HTMLAttributes),
      0,
    ];
  },

  addProseMirrorPlugins() {
    const inputRulePlugin = inputRules({
      rules: [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)],
    });
    return [inputRulePlugin];
  },
});
