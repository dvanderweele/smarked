import mdToElements from "./index.js"

const md = `
# Hello World
## Hello World
### Hello World
#### Hello World
##### Hello World

* Hello World
* Hello World2
  * snajsns
    * oh wow

1. Oosa
2. TwOsa
3. Three

Hello thete, World! *Glad* to see **you**!

> Quote this, eggman


\`\`\`javascript
function fakeCode(arg){
  return "wrong answer"
}
\`\`\`

My favorite \`function\`\'s name is freddy

***

~~stricken down~~

`

const md2 = `
## halp  
  
  
  

* hello
* dubious news
* huffulous clues

Hi, mya hihi

`

const els = mdToElements(
  md
)

const b = document.querySelector(
  "body"
)
b.append(
  ...els
)

const e2 = mdToElements(
  md2
)
b.append(
  ...e2
)

