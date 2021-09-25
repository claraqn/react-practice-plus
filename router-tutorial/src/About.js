import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
  //location 객체는 현재 앱이 갖고있는 주소에 대한 정보를 지니고있습니다.
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const detail = query.detail === 'true';

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트!</p>
      {detail && <p>추가적인 정보가 어쩌고저쩌고</p>}
      {/* About 컴포넌트에서 search 값에있는 detail 값을 받아와서, 해당 값이 true 일때 추가정보를 보여줌. */}
    </div>
  );
};

export default About;
