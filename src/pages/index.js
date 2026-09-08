import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsWork.nodes.map((work) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            {work.coverImage?.gatsbyImageData && (
              <Link to={`/works/${work.slug}`} className="card__image">
                <GatsbyImage
                  image={work.coverImage.gatsbyImageData}
                  alt={work.coverImage.alt || work.title}
                />
              </Link>
            )}
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              {work.creationDate && (
                <div className="card__date">
                  <p>{work.creationDate}</p>
                </div>
              )}
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { creationDate: DESC }) {
      nodes {
        id
        title
        slug
        excerpt
        creationDate(formatString: "DD-MM-YYYY")
        coverImage {
          alt
          gatsbyImageData(
            width: 450
            placeholder: BLURRED
            imgixParams: { fm: "jpg", auto: "compress" }
          )
        }
      }
    }
  }
`
