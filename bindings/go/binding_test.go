package tree_sitter_cst_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_cst "github.com/tree-sitter-grammars/tree-sitter-cst/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_cst.Language())
	if language == nil {
		t.Errorf("Error loading CST grammar")
	}
}
