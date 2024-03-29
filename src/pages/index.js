import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import ReactGA from 'react-ga';


const dateConverter = (dateString) => {
  if (dateString) {
    const ar = dateString.split('-');
    const newDate = ar[2] + '-' + ar[1] + '-' + ar[0];
    return newDate;
  }
};

const IndexPage = ({ data }) => {

  useEffect(() => {
    ReactGA.initialize("UA-184050613-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])


  return(
  <Layout>
    <Masonry className='showcase'>
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className='showcase__item'>
          <figure className='card'>
            <Link to={`/works/${work.slug}`} className='card__image'>
              <Img fluid={work.coverImage.fluid} />
            </Link>
            <figcaption className='card__caption'>
              <h6 className='card__title'>
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className='card__date'>
                <p>{dateConverter(work.creationDate)}</p>
              </div>
              <div className='card__description'>
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: {order: DESC, fields: creationDate}) {
      edges {
        node {
          id
          title
          slug
          excerpt
          creationDate
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
