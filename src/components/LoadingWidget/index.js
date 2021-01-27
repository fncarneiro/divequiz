import React from 'react';
import Widget from '../Widget';

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="/images/extras/loading4.gif"
        />
      </Widget.Content>
    </Widget>
  );
}
