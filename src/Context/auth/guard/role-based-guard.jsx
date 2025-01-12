"use client";
// import { m } from "framer-motion";
import PropTypes from "prop-types";

// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

// import { ForbiddenIllustration } from "src/assets/illustrations";

// import { varBounce, MotionContainer } from "src/components/animate";

import { useAuthContext } from "../hooks";

// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent, roles, children, sx }) {
  const { user } = useAuthContext();

  const currentRole = user?.role;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? "permission denied" : null;
  }

  return <> {children} </>;
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.object,
};
