'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

function Home() {
  const [uselessFact, setUseLessFact] = useState({});

  const { user } = useAuth();

  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();

    setUseLessFact(fact);
  };

  const selectResponse = (boolean) => {
    const obj = {
      userId: user.uid,
      permalink: uselessFact.permalink,
      response: boolean,
    };
    fetchFact();
    return obj;
  };

  useEffect(() => {
    fetchFact();
  }, []);
  return (
    <>
      {uselessFact.text}

      <h4>Did you know this fact?</h4>
      <button className="btn btn-success" type="button" onClick={() => selectResponse(true)}>
        YES
      </button>
      <button className="btn btn-danger" type="button" onClick={() => selectResponse(false)}>
        NO
      </button>
    </>
  );
}

export default Home;
