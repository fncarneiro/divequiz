/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizGuysPage({ dbExterno }) {
  // const [db, setDb] React.useState({})
  // React.useEffect(() => {
  // });
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((responseServer) => {
        if (responseServer.ok) {
          return responseServer.json();
        }
        throw new Error('Fail on get data.');
      })
      .then((responseObjet) => responseObjet)
      .catch((err) => {
        console.error(err);
      });

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
