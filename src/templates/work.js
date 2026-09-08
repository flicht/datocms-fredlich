import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Work = ({ data: { work } }) => {
  const gallery = work.gallery ?? []

  return (
    <Layout>
      <article className="sheet">
        <HelmetDatoCms seo={work.seoMetaTags} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{work.title}</h1>
          <p className="sheet__lead">{work.excerpt}</p>
          {gallery.length > 0 && (
            <div className="sheet__slider">
              <Slider
                infinite
                slidesToShow={Math.min(2, gallery.length)}
                arrows
              >
                {gallery.map((image) => (
                  <GatsbyImage
                    key={image.id}
                    image={image.gatsbyImageData}
                    alt={image.alt || work.title}
                  />
                ))}
              </Slider>
            </div>
          )}
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: work.descriptionNode?.childMarkdownRemark?.html ?? '',
            }}
          />
          {work.coverImage?.gatsbyImageData && (
            <div className="sheet__gallery">
              <div className="sheet__image">
                <GatsbyImage
                  image={work.coverImage.gatsbyImageData}
                  alt={work.coverImage.alt || work.title}
                  objectFit="contain"
                  objectPosition="center left"
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </Layout>
  )
}

export default Work

export const query = graphql`
  query WorkQuery($slug: String!) {
    work: datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        id
        alt
        gatsbyImageData(
          width: 400
          placeholder: BLURRED
          imgixParams: { fm: "jpg", auto: "compress" }
        )
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        alt
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          imgixParams: { fm: "jpg", auto: "compress" }
        )
      }
    }
  }
`
