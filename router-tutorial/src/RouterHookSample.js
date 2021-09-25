import React from 'react';
import useReactRouter from 'use-react-router';

// useReactRouter라는 Hook은 정식 릴리즈가 아니라 withRouter가 불편할때 사용하는 것
function RouterHookSample() {
  const { history, location, match } = useReactRouter();
  console.log({ history, location, match });
  return null;
}

export default RouterHookSample;
