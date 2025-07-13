import { useEffect } from 'react';

const PreventBackNavigation = () => {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;
