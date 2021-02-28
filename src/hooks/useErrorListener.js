import { useEffect } from 'react';

import addErrorListener from '../addErrorListener';

export default function useErrorListener(onErrorReceived) {
  useEffect(() => {
    const removeErrorListener = addErrorListener(onErrorReceived);
    return removeErrorListener;
  }, [onErrorReceived]);
}
