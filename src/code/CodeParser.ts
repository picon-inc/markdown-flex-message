import Prism, { Grammar, Token, tokenize } from 'prismjs'
import { CodeToken, CodeTokenType } from '../types'

export class CodeParser {
  async parse(code: string, language: string): Promise<CodeToken[]> {
    const prismTokens = await this.parseAsPrismToken(code, language)
    return prismTokens.map(token => this.convertFromPrismToken(token))
  }
  private async parseAsPrismToken(code: string, language: string): Promise<(string | Token)[]> {
    const grammar = await this.loadGrammar(language)
    return tokenize(code, grammar)
  }
  private convertFromPrismToken(token: Token | string): CodeToken {
    if (typeof token === 'string') {
      return {
        type: 'other',
        text: token
      }
    }
    const text = this.stringifyToken(token)
    if (CodtTokenTypeList.includes(token.type as CodeTokenType)) {
      return {
        type: token.type as CodeTokenType,
        text
      }
    }
    return {
      type: 'other',
      text
    }
  }
  private stringifyToken(token: Token | string): string {
    if (typeof token === 'string') {
      // Preserve newlines and spaces exactly as they are
      return token.replace(/\n{3,}/g, '\n\n')  // Collapse multiple newlines to max 2
    }
    const content = token.content
    if (typeof content === 'string') {
      return content.replace(/\n{3,}/g, '\n\n')  // Collapse multiple newlines to max 2
    }
    if (content instanceof Array) {
      // Join tokens preserving essential whitespace
      return content.map((token) => this.stringifyToken(token)).join('')
    }
    return this.stringifyToken(content)
  }
  private async loadGrammar(language: string): Promise<Grammar> {
    const grammar = Prism.languages[language]
    if (grammar) return grammar
    try {
      await import(`prismjs/components/prism-${language}`)
      const grammar = Prism.languages[language]
      if (!grammar) throw new Error(`Unknown language: ${language}`)
      return grammar
    } catch (error) {
      throw new Error(`Language not found: ${language}`)
    }
  }
}

export const CodtTokenTypeList: CodeTokenType[] = [
  "keyword",
  "number",
  "function",
  "string",
  "boolean",
  "operator",
  "punctuation",
  "atrule",
  "url",
  "selector",
  "property",
  "important",
  "style",
  "comment",
  "class-name",
  "doctype",
  "prolog",
  "cdata",
  "namespace",
  "regex",
  "tag",
  "attr-name",
  "attr-value",
  "atrule",
  "char",
  "inserted",
  "entity",
  "bold",
  "italic",
  "deleted",
  "symbol",
  "variable",
  "other"
]
