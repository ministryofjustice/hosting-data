const sass = require('sass')

module.exports = async function (content) {
  if (this.outputPath.endsWith('.css')) {
    const result = sass.compileString(content, {
      loadPaths: ['./node_modules']
    })

    return result.css
  }

  return content
}
