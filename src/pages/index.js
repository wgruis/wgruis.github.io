import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import ArticlePreview from '../components/ArticlePreview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        {posts.map(post => {
          if (post.node.path !== '/404/') {
            
            if (process.env.NODE_ENV === 'production') {
              // 生成环境不发布 草稿状态下的 文章
              if (get(post, 'node.frontmatter.status') !== 'draft') {
                return <ArticlePreview post={post} key={get(post, 'node.frontmatter.path')} />
              } else {
                return null;
              }
            } else {
              return <ArticlePreview post={post} key={get(post, 'node.frontmatter.path')} />
            }
          }
        })}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 120)
          frontmatter {
            path
            date(formatString: "YYYY-MM-DD")
          }
          frontmatter {
            title
            type
            tags
            originUrl
            originTitle
            originAutor
            status
          }
        }
      }
    }
  }
`
