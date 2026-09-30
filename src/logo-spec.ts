// What the top bar can show well. The logo is drawn 28px high; twice that keeps it sharp on
// high-density screens.
export const logoSpec = {
  displayHeight: 28,
  maxDisplayWidth: 160,
  recommendedHeight: 56,
  maxBytes: 256 * 1024,
  mimeTypes: ["image/svg+xml", "image/png", "image/webp", "image/jpeg"],
} as const;
