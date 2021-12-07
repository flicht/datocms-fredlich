import React, { useEffect } from "react";
import ReactGA from "react-ga";

const NotFoundPage = () => {
  useEffect(() => {
    ReactGA.initialize("UA-184050613-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  );
};

export default NotFoundPage;
