export const logger = {
  info(message: string) {
    // Keep logs predictable for scripts/tests.
    console.log(`[info] ${message}`);
  },
  warn(message: string) {
    console.warn(`[warn] ${message}`);
  },
  error(message: string) {
    console.error(`[error] ${message}`);
  }
};
