# `smarked`

Simple, opinionated and secure markdown to html element parser based on marked library's markdown lexer.

I take the output tokens from the marked library and parse them into HTML Elements **without using innerHTML**. I really just wanted a few simple markdown rendering features and at same time feel uncomfortable and frankly somewhat stupid trying to render HTML via innerHTML. Instead I just create elements with `document.createElement` calls while recursively walking the tree of tokens given by marked. I don't support tables (right now).

The default export you're looking for is called `mdToElements`. The first argument, a markdown formatted string, is required. The second argument is optional, and should be a `languageRenderer` function; it should be able to take a language name string as first arg to indicate the programming language of the second string, and it should return an array of elements to be appended to a div. This latter languageRenderer feature is like for syntax highlighting code within fenced code blocks.