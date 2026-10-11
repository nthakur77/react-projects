// components/Leetcode/Leetcode.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function Leetcode() {
  const { Nishchal } = useParams();

  return (
    <div>
      <h1>Leetcode Problem Details</h1>
      <p>You are viewing the solution for: {Nishchal}</p>
    </div>
  );
}

export default Leetcode;