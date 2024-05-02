import NavBar from "../assets/components/navbar/NavBar";

// eslint-disable-next-line react/prop-types
function MainLayOut({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default MainLayOut;
