import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "../styles/blogs.scss"

const BlogsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const [featured, ...rest] = posts

  // Build filename → publicURL map from gatsby-source-filesystem images
  const imageMap = {}
  data.allFile.nodes.forEach(f => {
    imageMap[f.base] = f.publicURL
  })

  return (
    <Layout>
      {/* Hero */}
      <section className="blogs-hero">
        <span className="blogs-hero__eyebrow">MONOMUSIC BLOG</span>
        <h1 className="blogs-hero__title">მონომუსიკა</h1>
        <div className="blogs-hero__rule" />
        <p className="blogs-hero__sub">Music stories, reviews &amp; interviews</p>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="blogs-featured">
          <div className="blogs-featured__label-row">
            <span className="blogs-featured__tag">FEATURED</span>
            <span className="blogs-featured__sep" />
            <span className="blogs-featured__label-text">EDITOR'S PICK</span>
          </div>
          <Link
            to={`/blogs/${featured.frontmatter.slug}`}
            className="blogs-featured__card"
          >
            <div
              className="blogs-featured__img"
              style={
                imageMap[featured.frontmatter.coverImage]
                  ? { backgroundImage: `url(${imageMap[featured.frontmatter.coverImage]})` }
                  : {}
              }
            />
            <div className="blogs-featured__body">
              <span className="blogs-featured__cat">
                {featured.frontmatter.category || "ARTICLE"}
              </span>
              <h2 className="blogs-featured__title">
                {featured.frontmatter.title}
              </h2>
              {featured.frontmatter.excerpt && (
                <p className="blogs-featured__excerpt">
                  {featured.frontmatter.excerpt}
                </p>
              )}
              <div className="blogs-featured__meta">
                {featured.frontmatter.author && (
                  <>
                    <span className="blogs-featured__author">
                      {featured.frontmatter.author}
                    </span>
                    <span className="blogs-featured__dot">·</span>
                  </>
                )}
                <span className="blogs-featured__date">
                  {featured.frontmatter.date}
                </span>
              </div>
              <span className="blogs-featured__cta">READ ARTICLE →</span>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Posts */}
      <section className="blogs-latest">
        <div className="blogs-latest__label-row">
          <span className="blogs-latest__label">LATEST POSTS</span>
          <div className="blogs-latest__rule" />
        </div>
        {rest.length > 0 ? (
          <>
            <div className="blogs-latest__grid">
              {rest.map(post => (
                <Link
                  key={post.frontmatter.slug}
                  to={`/blogs/${post.frontmatter.slug}`}
                  className="blog-card"
                >
                  <div
                    className="blog-card__img"
                    style={
                      imageMap[post.frontmatter.coverImage]
                        ? { backgroundImage: `url(${imageMap[post.frontmatter.coverImage]})` }
                        : {}
                    }
                  />
                  <div className="blog-card__body">
                    <span className="blog-card__cat">
                      {post.frontmatter.category || "ARTICLE"}
                    </span>
                    <h3 className="blog-card__title">{post.frontmatter.title}</h3>
                    <span className="blog-card__meta">
                      {post.frontmatter.date}
                      {post.frontmatter.readTime &&
                        `  ·  ${post.frontmatter.readTime} read`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="blogs-load-more">
              <button className="blogs-load-more__btn">LOAD MORE</button>
            </div>
          </>
        ) : (
          <p className="blogs-latest__empty">MORE ARTICLES COMING SOON</p>
        )}
      </section>
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
          category
          author
          readTime
          coverImage
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      nodes {
        base
        publicURL
      }
    }
  }
`

export default BlogsPage
