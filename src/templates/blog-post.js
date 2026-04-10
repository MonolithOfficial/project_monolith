import React, { useEffect, useState } from "react"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import { useLang } from "../context/LangContext"
import "../styles/blog-post.scss"

const BlogPost = ({ data }) => {
  const { activeLang } = useLang()
  const post = data.markdownRemark
  const { title, date, category, author, readTime, coverImage,
    albumArtist, albumName, albumYear, albumGenre, pullquote, lang } = post.frontmatter

  const [viewCount, setViewCount] = useState(null)

  useEffect(() => {
    const slug = post.frontmatter.slug
    const isGeo = lang === "geo"
    if (activeLang === "GEO" && !isGeo) {
      navigate(`/blogs/${slug}-geo`, { replace: true })
    } else if (activeLang === "ENG" && isGeo) {
      navigate(`/blogs/${slug.replace(/-geo$/, "")}`, { replace: true })
    }
  }, [activeLang])

  useEffect(() => {
    const key = `views_${post.frontmatter.slug}`
    const next = (parseInt(localStorage.getItem(key) || "0", 10)) + 1
    localStorage.setItem(key, next)
    setViewCount(next)
  }, [])

  const allRelated = data.allMarkdownRemark?.nodes || []
  const related = allRelated.filter(n =>
    activeLang === "GEO"
      ? n.frontmatter.lang === "geo"
      : n.frontmatter.lang !== "geo"
  )

  // Build filename → publicURL map
  const imageMap = {}
  data.allFile.nodes.forEach(f => {
    imageMap[f.base] = f.publicURL
  })

  const heroBg = coverImage && imageMap[coverImage]
    ? { backgroundImage: `url(${imageMap[coverImage]})` }
    : {}

  return (
    <Layout>
      {/* Hero */}
      <section className="post-hero">
        <div className="post-hero__img" style={heroBg} />
        <div className="post-hero__gradient" />
        <div className="post-hero__content">
          <div className="post-hero__inner">
            <Link to="/blogs" className="post-hero__back">← BLOG</Link>
            {category && (
              <span className="post-hero__cat">{category.toUpperCase()}</span>
            )}
            <h1 className="post-hero__title">{title}</h1>
            <div className="post-hero__meta">
              {author && <span>{author}</span>}
              {author && <span className="meta-dot">·</span>}
              <span>{date}</span>
              {readTime && <span className="meta-dot">·</span>}
              {readTime && <span>{readTime} read</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="post-body-wrap">
        {/* Article column */}
        <article className="post-article">
          {pullquote && (
            <div className="post-pullquote">
              <div className="post-pullquote__rule" />
              <p className="post-pullquote__text">"{pullquote}"</p>
            </div>
          )}

          {viewCount !== null && (
            <div className="post-rating-mobile">
              <span className="post-rating-score">{viewCount}</span>
              <div className="post-rating-col">
                <span className="post-rating-label">VIEWS</span>
              </div>
            </div>
          )}

          <div
            className="post-md-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        {/* Sidebar — desktop only */}
        <aside className="post-sidebar">
          {viewCount !== null && (
            <div className="post-sidebar__rating">
              <span className="post-sidebar__rating-label">VIEWS</span>
              <span className="post-sidebar__rating-score">{viewCount}</span>
            </div>
          )}

          {(albumArtist || albumName || albumYear || albumGenre) && (
            <div className="post-sidebar__info">
              <span className="post-sidebar__info-label">ALBUM INFO</span>
              <div className="post-sidebar__info-rule" />
              {albumArtist && (
                <p className="post-sidebar__info-row">
                  <strong>Artist</strong>
                  {albumArtist}
                </p>
              )}
              {albumName && (
                <p className="post-sidebar__info-row">
                  <strong>Album</strong>
                  {albumName}
                </p>
              )}
              {albumYear && (
                <p className="post-sidebar__info-row">
                  <strong>Year</strong>
                  {albumYear}
                </p>
              )}
              {albumGenre && (
                <p className="post-sidebar__info-row">
                  <strong>Genre</strong>
                  {albumGenre}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="post-related">
          <div className="post-related__label-row">
            <span className="post-related__label">MORE ARTICLES</span>
            <div className="post-related__rule" />
          </div>
          <div className="post-related__grid">
            {related.slice(0, 3).map(node => (
              <Link
                key={node.frontmatter.slug}
                to={`/blogs/${node.frontmatter.slug}`}
                className="post-related-card"
              >
                <div
                  className="post-related-card__img"
                  style={
                    node.frontmatter.coverImage && imageMap[node.frontmatter.coverImage]
                      ? { backgroundImage: `url(${imageMap[node.frontmatter.coverImage]})` }
                      : {}
                  }
                />
                <div className="post-related-card__body">
                  <span className="post-related-card__cat">
                    {node.frontmatter.category || "ARTICLE"}
                  </span>
                  <h3 className="post-related-card__title">
                    {node.frontmatter.title}
                  </h3>
                  <span className="post-related-card__meta">
                    {node.frontmatter.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        lang
        category
        author
        readTime
        coverImage
        rating
        ratingNote
        albumArtist
        albumName
        albumYear
        albumGenre
        pullquote
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { id: { ne: $id } }
      limit: 3
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          slug
          lang
          category
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

export default BlogPost
