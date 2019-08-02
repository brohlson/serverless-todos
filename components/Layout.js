import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import PropTypes from 'prop-types';

const LayoutWrapper = styled.div``;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>⛈️ Serverless Todos</title>
        <link
          key="inter-font-script"
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
        />
      </Head>
      {children}
    </LayoutWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
