import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { useLang } from "../context/LangContext"
import "../styles/blogs.scss"
import translation_geo from '../translations/georgian.json'


const BlogsPage = ({ data }) => {
  const { activeLang } = useLang()
  const allPosts = data.allMarkdownRemark.nodes
  const posts = allPosts.filter(p =>
    activeLang === "GEO"
      ? p.frontmatter.lang === "geo"
      : p.frontmatter.lang !== "geo"
  )
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
        <span className="blogs-hero__eyebrow">{activeLang === "GEO"
                      ? `${translation_geo.music_blog}`
                      : "MUSIC BLOG"}</span>
        <h1 className="blogs-hero__title">{activeLang === "GEO"
                      ? `${translation_geo.monomusic}`
                      : "MONOMUSIC"}</h1>
        <div className="blogs-hero__rule" />
        <p className="blogs-hero__sub">{activeLang === "GEO"
                      ? `${translation_geo.music_stories}`
                      : "Music stories, reviews & interviews"}</p>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="blogs-featured">
          <div className="blogs-featured__label-row">
            <span className="blogs-featured__tag">{activeLang === "GEO"
                      ? `${translation_geo.featured}`
                      : "FEATURED"}</span>
            <span className="blogs-featured__sep" />
            <span className="blogs-featured__label-text">{activeLang === "GEO"
                      ? `${translation_geo.editors_pick}`
                      : "EDITOR'S PICK"}</span>
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
              <span className="blogs-featured__cta">{activeLang === "GEO"
                      ? `${translation_geo.read_article}`
                      : "READ ARTICLE"} →</span>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Posts */}
      <section className="blogs-latest">
        <div className="blogs-latest__label-row">
          <span className="blogs-latest__label">{activeLang === "GEO"
                      ? `${translation_geo.archive}`
                      : "ARCHIVE"}</span>
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
          <p className="blogs-latest__empty">{activeLang === "GEO"
                      ? `${translation_geo.more_articles}`
                      : "MORE ARTICLES COMING SOON"}</p>
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
          lang
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
