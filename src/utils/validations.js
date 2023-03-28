export const emailValidation = () => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex;
};

export const numberValidation = () => {
  const regex = /^[0-9]*$/;
  return regex;
};
export const nameValidation = () => {
  const regex = /^[a-zA-Z ]*$/;
  return regex;
};
