export default (number = 0) => {
  const thoushand = new Intl.NumberFormat();
  return thoushand.format(number);
};
