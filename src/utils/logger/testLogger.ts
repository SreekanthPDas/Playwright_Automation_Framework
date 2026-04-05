export class TestLogger {
  private buffer: string[] = [];

  info(message: string) {
    const log = `[INFO] ${new Date().toISOString()} ${message}`;
    this.buffer.push(log);
  }

  error(message: string) {
    const log = `[ERROR] ${new Date().toISOString()} ${message}`;
    this.buffer.push(log);
  }

  getLogs() {
    return this.buffer.join("\n");
  }

}