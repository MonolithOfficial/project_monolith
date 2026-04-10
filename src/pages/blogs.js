import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const BlogsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.frontmatter.slug}>
            <Link to={`/blogs/${post.frontmatter.slug}`}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.frontmatter.date}</p>
            <p>{post.frontmatter.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          slug
          excerpt
        }
      }
    }
  }
`

export default BlogsPage
