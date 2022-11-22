import numeral from "numeral";

export const formatNumber = (num: number | string) => {
  try {
    return numeral(num).format("0,0.[00]");
  } catch (e) {}
};
