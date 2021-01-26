import React from 'react';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';


export default function quizPage() {
  const router = useRouter();
  const name = router.query.Content;
  console.log(router)
  return (
    <Widget>
      <Widget.Content>
        <h1>Guys Quizzes</h1>
        <p>
          {name}
        </p>
      </Widget.Content>
    </Widget>
  );
}
