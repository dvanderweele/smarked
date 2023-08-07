import { marked } from "marked"

const blocks = new Map(
  [
    [
      "heading",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "h" + token.depth
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "paragraph",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "p"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "code",
      (
        token, 
        recur,
        languageRenderer
      ) => {
        if(
          languageRenderer &&
          token.lang.length > 0
        ){
          const e = document.createElement(
            "div"
          )
          e.append(
            ...languageRenderer(
              token.lang,
              token.text
            )
          )
        } else {
          const e = document.createElement(
            "pre"
          )
          e.innerText = token.text
        }
        return e
      }
    ], [
      "blockquote",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "blockquote"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "list",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          token.ordered ? "ol" : "ul"
        )
        if(
          typeof token.items !== "undefined"
        ){
          e.append(
            ...recur(
              token.items
            )
          )
        }
        return e
      }
    ], [
      "list_item",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "li"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "hr",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "hr"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "space",
      (
        token, 
        recur
      ) => {
        if(
          token.raw.length < 2
        ) return ""
        const e = document.createElement(
          "div"
        )
        e.append(...token.raw.split(
          ""
        ).slice(
          0, -1
        ).map(
          b => document.createElement(
            "br"
          )
        ))
        return e
      }
    ]
  ]
)
const inlines = new Map(
  [
    [
      "strong",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "strong"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "em", 
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "em"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "codespan",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "code"
        )
        e.innerText = token.text
        return e
      }
    ], [
      "br",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "br"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "del",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "del"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "link",
      (
        token, 
        recur
      ) => {
        const e = document.createElement(
          "a"
        )
        e.setAttribute(
          "href",
          encodeURIComponent(
            token.href
          )
        )
        e.setAttribute(
          "target",
          "_blank"
        )
        if(
          typeof token.tokens !== "undefined"
        ){
          e.append(
            ...recur(
              token.tokens
            )
          )
        }
        return e
      }
    ], [
      "text",
      token => token.raw
    ]
  ]
)

function recur(
  tokenArray,
  languageRenderer
){
  return tokenArray.map(
    token => {
      if(
        blocks.has(
          token.type
        )
      ){
        return blocks.get(
          token.type
        )(
          token,
          recur,
          languageRenderer
        )
      } else if(
        inlines.has(
          token.type
        )
      ){
        return inlines.get(
          token.type
        )(
          token,
          recur
        )
      } else {
        return token.raw
      }
    }
  )
}

function mdToElements(
  md,
  languageRenderer = null
){
  return recur(
    marked.lexer(
      md
    ), 
    languageRenderer
  )
}

export default mdToElements