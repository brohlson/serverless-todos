import styled from "styled-components";

const LayoutWrapper = styled.div``;

const Layout = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
