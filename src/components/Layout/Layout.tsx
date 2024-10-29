import NavbarComponent from '../Navbar/Navbar';

const Layout = ({ children, navbarChildren }: { children: JSX.Element; navbarChildren?: React.ReactNode }) => {
  return (
    <div>
      <NavbarComponent>{navbarChildren}</NavbarComponent>
      <div className="container mt-4">{children}</div>
    </div>
  );
};

export default Layout;