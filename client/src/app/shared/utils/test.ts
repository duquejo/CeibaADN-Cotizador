export const setTextEvent = (identifier: string, text: string) => ({
  persist: () => {},
  target: {
    name: identifier,
    value: text,
  },
});
