export const converIntl = (num: number) => {
  return new Intl.NumberFormat().format(num);
};
