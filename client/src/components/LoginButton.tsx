import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname || "/",
      },
    });
  };
  return (
    <button
      onClick={handleLogin}
      className="text-primary font-bold uppercase text-[.8125rem] tracking-widest py-2 px-4 rounded border border-primary hover:bg-primary hover:text-black transition duration-300 relative bottom-[0.4rem]"
    >
      Login
    </button>
  );
};

export default LoginButton;
