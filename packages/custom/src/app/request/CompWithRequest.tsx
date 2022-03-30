import React, { useRef, useState } from 'react';

export const CompWithRequest: React.FC = () => {
  // I want to call same API three times and assert it in test
  const timer = useRef<number>(0);
  const [data, setData] = useState<{
    firstName: string;
    lastName: string;
  }>();

  const fetchSomeThing = async () => {
    let responseBody;
    for (let i = 0; i < 3; i++) {
      // if you use nock as request testing library, then you need to specify the hostname in test env
      const response = await fetch('http://localhost/test');
      responseBody = await response.json();
    }

    setData(responseBody);
  };

  timer.current === 0 && fetchSomeThing().catch((error) => console.error(error));
  timer.current = 1;

  return data ? (
    <div>{`firstName: ${data.firstName} lastName: ${data.lastName}`}</div>
  ) : (
    <div>No Data!</div>
  );
};
