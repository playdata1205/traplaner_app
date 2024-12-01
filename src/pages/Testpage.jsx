import { number } from 'prop-types';
import { useState } from 'react';

const Test = () => {
  const [state, setState] = useState();

  return (
    <div>
      <input
        type='text'
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <div>{state}</div>
    </div>
  );
};

export default Test;
