import XCTest
import SwiftTreeSitter
import TreeSitterCST

final class TreeSitterCSTTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_cst())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading CST grammar")
    }
}
