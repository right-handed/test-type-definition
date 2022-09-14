// Type definitions for testRTC scripts
import { TestRTCEnv } from "./env";
import { Client } from "./client";

declare global {
  namespace NodeJS {
    // Adds to process.env testRTC environmental variables
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends TestRTCEnv {}
  }
  const client: Client;
}
