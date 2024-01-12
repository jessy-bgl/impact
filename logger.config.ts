const originalWarn = console.warn;

console.warn = (message, ...optionalParams) => {
  if (message.includes("deprecated") || message.includes("Plausible")) return;
  originalWarn(message, ...optionalParams);
};
