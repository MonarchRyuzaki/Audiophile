import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleClick = () => {
    localStorage.removeItem("cart");
    logout({ logoutParams: { returnTo: window.location.origin } });
  }
  return (
    <button
      onClick={handleClick}
      className="text-primary font-bold uppercase text-[.8125rem] tracking-widest py-2 px-4 rounded border border-primary hover:bg-primary hover:text-black transition duration-300 relative bottom-[0.4rem]"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
