export const MAIN_CONFIG = new (class {
  get googleGenerativeAIapiKey(): string {
    return process.env.GOOGLE_GENERATIVE_AI_KEY;
  }

  get port(): number {
    return Number(process.env.PORT);
  }

  get logsFile(): string {
    return process.env.LOG_FILE;
  }

  get aiModel(): string {
    return process.env.AI_MODEL;
  }
  get test(): string {
    return 'test';
  }
  get check(): string {
    return process.env.CHECK;
  }
})();
