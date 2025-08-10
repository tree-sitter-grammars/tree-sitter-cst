/**
 * @file CST grammar for tree-sitter
 * @author ObserverOfTime <chronobserver@disroot.org>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "cst",

  extras: _ => [],

  rules: {
    cst: $ => seq(
      optional($._eol),
      repeat($._line),
      optional($._eol)
    ),

    _line: $ => seq(
      optional($.range),
      repeat1($._space),
      choice(
        $.node,
        $.text,
        $.literal,
        $.error,
        $.missing
      ),
      $._eol
    ),

    range: $ => seq(
      field("start", $.position),
      repeat1($._space),
      "-",
      $._space,
      field("end", $.position)
    ),

    position: $ => seq(
      field("row", $.number),
      ":",
      field("column", $.number)
    ),

    node: $ => seq(
      optional($.field),
      optional($._mark),
      alias($._identifier, $.kind),
      choice(
        optional($._space),
        seq($._space, $.text)
      )
    ),

    text: $ => seq(
      "`",
      $.content,
      "`"
    ),

    literal: $ => seq(
      "\"",
      $.content,
      "\""
    ),

    error: $ => seq(
      $._mark,
      "ERROR",
      choice(
        optional($._space),
        seq($._space, $.text)
      )
    ),

    missing: $ => seq(
      "MISSING",
      token.immediate(":"),
      $._space,
      $.literal
    ),

    field: $ => seq(
      field("name", $._identifier),
      token.immediate(":"),
      $._space
    ),

    content: $ => repeat1(
      choice(/[^\r\n]/, field("escape", $._escape))
    ),

    _identifier: _ => /[\w-][\w.-]*/,

    _escape: _ => /\\[nrt0\\vf`"]/,

    number: _ => /\d+/,

    _mark: _ => "\u2022",

    _space: _ => / /,

    _eol: _ => /[\r\n]|\r\n/
  }
});
