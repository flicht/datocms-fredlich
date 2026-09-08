import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout>
    <Helmet title="Page not found" />
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">Page not found</h1>
        <p className="sheet__lead">
          That page doesn't exist. <Link to="/">Back to the home page.</Link>
        </p>
      </div>
    </article>
  </Layout>
)

export default NotFoundPage
