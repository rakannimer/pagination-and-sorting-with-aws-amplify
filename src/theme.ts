const primary = "rgba(18, 25, 50, 1)";
const primaryLight = "rgba(27, 37, 77, 1)";
const primaryDark = "rgba(14, 20, 43, 1)";
const primaryOpaque = (opacity: number) => `rgba(18, 25, 50, ${opacity})`;

const primaryText = "white";

const highlight = "#61dafb";
const highlightOpaque = (opacity: number) => `rgba(97,218,251,${opacity})`;

const colors = {
  primary,
  highlight,
  highlightOpaque,
  primaryLight,
  primaryDark,
  primaryOpaque,
  primaryText
};

export { colors };
