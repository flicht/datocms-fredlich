import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const About = ({ data: { about } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={about.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{about.title}</h1>
        <p className="sheet__lead">{about.subtitle}</p>
        {about.photo?.gatsbyImageData && (
          <div className="sheet__gallery">
            <GatsbyImage
              image={about.photo.gatsbyImageData}
              alt={about.photo.alt || about.title}
            />
          </div>
        )}
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: about.bioNode?.childMarkdownRemark?.html ?? '',
          }}
        />
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        alt
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          imgixParams: { fm: "jpg", auto: "compress" }
        )
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
