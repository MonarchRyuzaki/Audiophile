import { withAuthenticationRequired } from "@auth0/auth0-react";

const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {});

  return <Component />;
};

export default AuthenticationGuard;
