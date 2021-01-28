import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body: {
        font-family: sans-serif;
        background-color: black;
    }
    `;
const Title = styled.h1`
    font-size: 50 px;
    color: ${({ theme }) => theme.colors.primary};
`;

export default function Home(props) {
  return (
    <div>
      <GlobalStyle />
      <Title>Codigo da Live
      <h2>
        {props.dadosDoGithub.name}
      </h2>
      <p>
        {props.dadosDoGithub.login}
      </p>
      </Title>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const retornoDaApiInicial = await fetch('https://api.github.com/users/fncarneiro');
    const retornoDaApi = await retornoDaApiInicial.json();

    return {
      props: {
        dadosViaStaticProps: 'dados',
        dadosDoGithub: retornoDaApi,
      },
    };
  } catch (err) {
    throw new Error('Del ruim');
  }
}
