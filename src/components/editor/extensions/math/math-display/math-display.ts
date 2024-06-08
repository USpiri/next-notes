import { Node, mergeAttributes } from "@tiptap/react";
import {
  mathPlugin,
  makeBlockMathInputRule,
  REGEX_BLOCK_MATH_DOLLARS,
} from "@benrbray/prosemirror-math";
import { inputRules } from "@tiptap/pm/inputrules";

export const MathDisplay = Node.create({
  name: "math_display",
  group: "block math",
  content: "text*", // important!
  atom: true, // important!
  code: true,

  parseHTML() {
    return [
      {
        tag: "math-display", // important!
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "math-display",
      mergeAttributes({ class: "math-node" }, HTMLAttributes),
      0,
    ];
  },

  addProseMirrorPlugins() {
    const inputRulePlugin = inputRules({
      rules: [makeBlockMathInputRule(REGEX_BLOCK_MATH_DOLLARS, this.type)],
    });
    return [mathPlugin, inputRulePlugin];
  },
});
