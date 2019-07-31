const logo = "/static/logo.jpg";

const primary = "rgba(18, 25, 50, 1)";
const primaryLight = "rgba(27, 37, 77, 1)";
const primaryDark = "rgba(14, 20, 43, 1)";
const primaryOpaque = opacity => `rgba(18, 25, 50, ${opacity})`;

const primaryText = "white";

const highlight = "#61dafb";
const highlightOpaque = opacity => `rgba(97,218,251,${opacity})`;

const colors = {
  primary,
  highlight,
  highlightOpaque,
  primaryLight,
  primaryDark,
  primaryOpaque,
  primaryText
};

const typography = {
  primary: "Gotham Rounded",
  secondary: "Gotham Rounded"
};

export { colors, typography, logo };
