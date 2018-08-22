const logger = store => next => (action) => {
  // eslint-disable-next-line
  console.group(action.type);
  // eslint-disable-next-line
  console.log('The action: ', action);
  const returnValue = next(action);
  // eslint-disable-next-line
  console.log('The new state: ', store.getState());
  // eslint-disable-next-line
  console.groupEnd();
  return returnValue;
};

export default logger;
