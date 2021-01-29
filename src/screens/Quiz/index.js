/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import LoadingWidget from '../../components/LoadingWidget';
// import loadingAnimation from './animations/loading.json';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
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
        <p>
          You've got
          {' '}
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
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result_${result}`}>
              - Question
              {' '}
              {index + 1}
              {' '}
              {result === true ? 'right' : 'wrong'}
            </li>
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

  function DescriptionWidget() {
    const About = styled.h4`    
      color: ${({ theme }) => theme.colors.salmon};
  `;

    return (
      <Widget>
        <Widget.Header>
          <h3>
            {isCorrect ? 'Correct answer.' : 'Wrong answer.'}
          </h3>
        </Widget.Header>
        <Widget.Content>
          <About>
            {question.description}
          </About>
        </Widget.Content>
      </Widget>
    );
  }

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Loading question..."
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
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
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
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={hasAlternativeSelected}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <DescriptionWidget />}
          {isQuestionSubmited && !isCorrect && <DescriptionWidget isCorrect={false} />}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  QUESTION: 'QUESTION',
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
