export const isNameMin = (value) => {
  return value && value >= 3;
};

export const isNameMax = (value) => {
  return value && value <= 255;
};
