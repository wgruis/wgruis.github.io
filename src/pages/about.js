import React, { Component } from 'react';
import get from 'lodash/get'

class AboutPage extends Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    return ( 
      <div className="about-container" style={{ marginTop: '2rem'}}>
        <p>前端工程师</p>
      </div>
    );
  }
}

export default AboutPage;

export const pageQuery = graphql`
query AboutQuery {
  site {
    siteMetadata {
      title
      author
      slogan
    }
  }
}
`;