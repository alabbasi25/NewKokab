export const getState = () => {
  return {
    planetHealth: 100,
    weather: 'sunny',
    lastUpdate: new Date().toISOString()
  };
};

export const updateState = (data: any) => {
  return { ...getState(), ...data };
};
