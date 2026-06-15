export function getThemeColors() {
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return {
    primary: dark ? "#c2c0b6" : "#3d3d3a",
    secondary: dark ? "#888780" : "#73726c",
    blue: dark ? "#85b7eb" : "#185fa5",
    blueLight: dark ? "rgba(133,183,235,0.12)" : "rgba(24,95,165,0.08)",
    amber: dark ? "#ef9f27" : "#ba7517",
    green: dark ? "#97c459" : "#3b6d11",
    coral: dark ? "#f0997b" : "#993c1d",
    lineColor: dark ? "rgba(194,192,182,0.18)" : "rgba(61,61,58,0.14)",
  }
}
