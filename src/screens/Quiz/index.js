/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Router from 'next/router';
import { Lottie } from '@crello/react-lottie';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import LoadingWidget from '../../components/LoadingWidget';
import jelly from './animations/jelly.json';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  const { name } = Router.query;

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        QUIZ RESULT
      </Widget.Header>
      <Widget.Content>

        <Lottie
          width="250px"
          height="120px"
          className="lottie-container basic"
          config={{ animationData: jelly, loop: true, autoplay: true }}
        />
        <h3>
          {`${name} you've got `}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {' '}
          <strong>
            {results.filter((x) => x).length}
          </strong>
          {' '}
          questions.
        </h3>
        <ul>

          {results.map((result, index) => (
            // <li key={`result_${result}`}>
            <Widget.Topic>
              {result === true
                ? (
                  <img
                    alt="ok"
                    src="images/extras/ok.png"
                    style={{
                      width: '7%',
                      height: '7%',
                    }}
                  />
                )
                : (
                  <img
                    alt="cancel"
                    src="images/extras/cancel.png"
                    style={{
                      width: '7%',
                      height: '7%',
                    }}
                  />
                )}
              {'    '}
              Question
              {'    '}
              {index + 1}
              {'    '}
              {result === true ? 'right.' : 'wrong.'}
            </Widget.Topic>
            // </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

// function LoadingWidget() {
//   return (
//     <Widget>
//       <Widget.Header>
//         Carregando...
//       </Widget.Header>

//       <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
//         <Lottie
//           width="200px"
//           height="200px"
//           className="lottie-container basic"
//           config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
//         />
//       </Widget.Content>
//     </Widget>
//   );
// }

function DescriptionWidget({ isCorrect, question }) {
  const About = styled.h4`    
    color: ${({ theme }) => theme.colors.salmon};
`;

  return (
    <Widget
      as={motion.div}
      animate={{
        scale: [1, 1, 1, 1, 1],
        rotate: [0, 0, 70, 70, 0],
        // borderRadius: ['20%', '20%', '20%', '20%', '20%'],
      }}
    >
      <Widget.HeaderDesc>
        {isCorrect
          ? <h2 style={{ color: ' #4CAF50' }}>'Correct answer.'</h2>
          : <h2 style={{ color: ' #FF5722' }}>'Wrong answer.'</h2>}
      </Widget.HeaderDesc>
      <Widget.Content>
        <About>
          {question.description}
        </About>
      </Widget.Content>
      {/* <Button>
        Next Question
      </Button> */}
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const [hasSubmitedAlternative, setHasSubmitedAlternative] = React.useState(undefined);

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Question ${questionIndex + 1} of ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Loading questions ..."
        style={{
          width: '100%',
          height: '150px',

        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          { }
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setHasSubmitedAlternative(true);
            setTimeout(() => {
              onSubmit();
              addResult(isCorrect);
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              setHasSubmitedAlternative(undefined);
            }, 10 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  disabled={hasSubmitedAlternative}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected || hasSubmitedAlternative}>
            Confirm
          </Button>
          {isQuestionSubmited && <DescriptionWidget question={question} isCorrect={isCorrect} />}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const [results, setResults] = React.useState([]);

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3 * 1000);
    // nasce === didMount
  }, []);

  function addResult(result) {
    setResults([
      ...results, result,

    ]);
  }

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
