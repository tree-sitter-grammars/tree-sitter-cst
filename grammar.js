/**
 * @file CST grammar for tree-sitter
 * @author ObserverOfTime <chronobserver@disroot.org>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "cst",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
