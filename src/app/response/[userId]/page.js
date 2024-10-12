import React from 'react';
import PropTypes from 'prop-types';
import FactCard from '../../../components/Card';

export default async function ResponsePage({ params }) {
  const response = await fetch(`https://first-react-app-4d86b-default-rtdb.firebaseio.com/responseYes.json?orderBy="userId"&equalTo="${params.userId}"`, { cache: 'no-store' });
  const facts = await response.json();

  return (
    <div>
      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact} />
      ))}
    </div>
  );
}

ResponsePage.propTypes = {
  params: PropTypes.string.isRequired,
};
