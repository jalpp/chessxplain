import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const LoadingComponent = ({ loading}) => {
  const [internalLoading, setInternalLoading] = useState(loading);

  useEffect(() => {
    setInternalLoading(loading);
    if (loading) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, 15000); // 3000 milliseconds = 3 seconds

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div>
      {internalLoading ?<LinearProgress color="secondary"/> : <hr></hr>}
    </div>
  );
};

export default LoadingComponent;
