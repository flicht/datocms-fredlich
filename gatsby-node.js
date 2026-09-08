const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allDatoCmsWork {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while querying DatoCMS works`, result.errors)
    return
  }

  result.data.allDatoCmsWork.nodes.forEach((work) => {
    createPage({
      path: `works/${work.slug}`,
      component: path.resolve(`./src/templates/work.js`),
      context: { slug: work.slug },
    })
  })
}
