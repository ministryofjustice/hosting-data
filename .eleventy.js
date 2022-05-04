const Nunjucks = require('nunjucks')
const { transforms } = require('./src/_11ty')

module.exports = eleventyConfig => {
  // Transforms
  for (const name of Object.keys(transforms)) {
    eleventyConfig.addTransform(name, transforms[name])
  }

  // Passthroughs
  eleventyConfig.addPassthroughCopy({
    './node_modules/govuk-frontend/govuk/assets': 'assets'
  })

  // Nunjucks configuration
  eleventyConfig.setLibrary('njk', Nunjucks.configure(
    ['./node_modules/govuk-frontend', './src/_includes']
  ))

  return {
    dir: {
      input: './src',
      output: './docs'
    }
  }
}
