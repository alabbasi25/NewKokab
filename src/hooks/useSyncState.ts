import { useState, useCallback, useEffect, useRef } from 'react';
import { kokabApi } from '../api';

/**
 * Generic hook for managing a slice of state that syncs with the backend.
 * @param initialState - The initial value of the state.
 */
export function useSyncState<T>(initialValue: T, key: string) {
  const [state, setState] = useState<T>(initialValue);
  const isFirstRender = useRef(true);

  // Sync state to backend when it changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const syncHandler = setTimeout(() => {
       kokabApi.updateState({ [key]: state });
    }, 1000); // Debounce sync

    return () => clearTimeout(syncHandler);
  }, [state, key]);

  return [state, setState] as const;
}
