import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

const NavBar = styled.nav`
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #c0c0c0;
`;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   height: 100%;
//   gap: 8px;

//   decoration: none;
//   color: #404040;

//   & > img {
//     height: 100%;
//     padding: 8px;
//     cursor: pointer;
//   }
// `;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  height: 100%;
  margin-left: auto;
  margin-right: 8px;

  & > a > p {
    color: #888888;
  }
`;

export default Layout;
