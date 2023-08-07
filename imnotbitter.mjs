import http from "http"
import * as esbuild from "esbuild"
import {
  readFile
} from "fs/promises"

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    <title>smarked | test</title>
    <script src="/bundle.js" defer></script>
  </head>
  <body>

  </body>
</html>
`

await esbuild.build({
  entryPoints: [
    "tester.js"
  ],
  bundle: true,
  minify: true,
  outfile: "bundle.js"
})

const js = await readFile(
  "./bundle.js"
)

http.createServer(
  (req, res) => {
    try {
      if(req.url === "/"){
        res.writeHead(
          200, 
          {
            "Content-Type": "text/html"
          }
        )
        res.end(
          html
        )
      } else if(req.url === "/bundle.js") {
        res.writeHead(
          200, 
          {
            "Content-Type": "application/javascript"
          }
        )
        res.end(
          js
        )
      } else {
        res.writeHead(
          404
        )
        res.end()
      }
    } catch (e) {
      res.writeHead(
        500
      )
      res.end()
    }
  }
).listen(
  443,
  "0.0.0.0"
)