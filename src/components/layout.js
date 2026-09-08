import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'

import '../styles/index.sass'

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
      allDatoCmsSocialProfile(sort: { position: ASC }) {
        nodes {
          profileType
          url
        }
      }
    }
  `)

  const siteName = data.datoCmsSite?.globalSeo?.siteName ?? 'FRED LICH'
  const introHtml =
    data.datoCmsHome?.introTextNode?.childMarkdownRemark?.html ?? ''
  const socialProfiles = data.allDatoCmsSocialProfile?.nodes ?? []

  return (
    <div className={`container ${showMenu ? 'is-open' : ''}`}>
      <HelmetDatoCms
        favicon={data.datoCmsSite?.faviconMetaTags}
        seo={data.datoCmsHome?.seoMetaTags}
      />
      <div className="container__sidebar">
        <div className="sidebar">
          <h6 className="sidebar__title">
            <Link to="/">{siteName}</Link>
          </h6>
          <div
            className="sidebar__intro"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
          <ul className="sidebar__menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <p className="sidebar__social">
            {socialProfiles.map((profile) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.profileType}
                className={`social social--${profile.profileType.toLowerCase()}`}
              >
                {' '}
              </a>
            ))}
          </p>
          <div className="sidebar__copyright">
            {`© ${new Date().getFullYear()}`}
          </div>
        </div>
      </div>
      <div className="container__body">
        <div className="container__mobile-header">
          <div className="mobile-header">
            <div className="mobile-header__menu">
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={showMenu}
                onClick={() => setShowMenu((open) => !open)}
              />
            </div>
            <div className="mobile-header__logo">
              <Link to="/">{siteName}</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
