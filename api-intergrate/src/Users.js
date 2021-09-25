// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Users() {
//   const [users, setUsers] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       setError(null);
//       setUsers(null);
//       setLoading(true);
//       const response = await axios.get(
//         'https://jsonplaceholder.typicode.com/users'
//       );
//       console.log(response);
//       setUsers(response.data);
//     } catch (e) {
//       setError(e);
//     }
//     setLoading(false);
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   if (loading) return <div>로딩중,,</div>;
//   if (error) return <div>에러가 발생했습니다,,</div>;
//   if (!users) return null;
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.username}({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={fetchUsers}>다시 불러오기</button>
//     </>
//   );
// }

// export default Users;

// 직접 useAsync.js 만들어서 사용하는 버전
// import React, { useState } from 'react';
// import axios from 'axios';
// import useAsync from './useAsync';
// import User from './User';

// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users'
//   );
//   return response.data;
// }

// function Users() {
//   const [userId, setUserId] = useState(null);
//   const [state, refetch] = useAsync(getUsers, [], true);
//   const { loading, data: users, error } = state;

//   if (loading) return <div>로딩중,,</div>;
//   if (error) return <div>에러가 발생했습니다,,</div>;
//   if (!users) return <button onClick={refetch}>불러오기</button>;
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => setUserId(user.id)}
//             style={{ cursor: 'pointer' }}
//           >
//             {user.username}({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={refetch}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//       {/* userId 가 존재하므로 true->&&연산자는 왼쪽이 true이면 오른쪽 실행하는 것 */}
//       {/* userId 값이 0만 아니면 다 true!! */}
//     </>
//   );
// }

// export default Users;

//////////////////////////////////////////////////////////////////////
// react-async 의 useAsync 사용하는 버전
import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const {
    data: users,
    error,
    isLoading,
    run,
  } = useAsync({
    deferFn: getUsers,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={run}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={run}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
