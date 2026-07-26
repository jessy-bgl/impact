const originalWarn = console.warn;

console.warn = (message, ...optionalParams) => {
  if (message.includes("deprecated") || message.includes("iFrameSizer")) return;

  originalWarn(message, ...optionalParams);
};
