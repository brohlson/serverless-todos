import App, { Container } from 'next/app';
import React from 'react';
import Reset from '../style/Reset';

export default class TodoApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Reset />
        <Component {...pageProps} />
      </Container>
    );
  }
}
