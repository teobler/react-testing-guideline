import React, { useRef, useState } from 'react';

export const MswCase: React.FC = () => {
  // I want to call same API three times and assert it in test
  const timer = useRef<number>(0);
  const [data, setData] = useState<{
    firstName: string;
    lastName: string;
  }>();

  const fetchSomeThing = async () => {
    let responseBody;
    for (let i = 0; i < 3; i++) {
      const response = await fetch('/test');
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
