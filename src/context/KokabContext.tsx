import React, { useMemo } from 'react';
import { CoreProvider, useCore } from './CoreContext';
import { NizamProvider, useNizam } from './NizamContext';
import { MawaddaProvider, useMawadda } from './MawaddaContext';
import { AfiyaProvider, useAfiya } from './AfiyaContext';
import { UserID } from '../types';
import { calculatePlanetHealth } from '../planetLogic';

export const PlanetProvider: React.FC<{ children: React.ReactNode; userId: UserID }> = ({ children, userId }) => {
  return (
    <CoreProvider currentUserId={userId}>
      <NizamProvider userId={userId}>
        <MawaddaProvider userId={userId}>
          <AfiyaProvider userId={userId}>
            {children}
          </AfiyaProvider>
        </MawaddaProvider>
      </NizamProvider>
    </CoreProvider>
  );
};

export const usePlanet = () => {
  const core = useCore();
  const nizam = useNizam();
  const mawadda = useMawadda();
  const afiya = useAfiya();

  // Derived state: Planet Health
  const planetHealth = useMemo(() => calculatePlanetHealth(
    nizam.tasks,
    nizam.inventory,
    nizam.transactions,
    nizam.liabilities,
    afiya.worship,
    afiya.vitals,
    [], // Challenges placeholder
    mawadda.romancePrompts,
    [], // Books placeholder
    []  // Hydration placeholder
  ), [nizam.tasks, nizam.inventory, nizam.transactions, nizam.liabilities, afiya.worship, afiya.vitals, mawadda.romancePrompts]);

  return {
    ...core,
    ...nizam,
    ...mawadda,
    ...afiya,
    planetHealth
  } as any; // Cast for now to satisfy existing property access
};

export const useKokab = usePlanet;
