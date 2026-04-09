/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (page.component.endsWith("newIndex.js")) {
    deletePage(page)
    createPage({ ...page, path: "/" })
  }
}
