import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";

import { useAuthContext } from "../hooks";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

// const loginPaths = {
//   jwt: paths.auth.login,
//   auth0: paths.auth.auth0.login,
//   amplify: paths.auth.amplify.login,
//   firebase: paths.auth.firebase.login,
// };

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <>loading..</> : <Container> {children}</Container>}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const Navigate = useNavigate();

  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = '/pages/login';

      const href = `${loginPath}?${searchParams}`;

      Navigate(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, Navigate]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
