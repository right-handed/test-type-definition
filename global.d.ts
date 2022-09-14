import { TestRTCEnv } from "./env";
import { Client } from "./client";

declare global {
    namespace NodeJS {
        // Adds to process.env testRTC environmental variables
        interface ProcessEnv extends TestRTCEnv { }
    }
    const client: Client;
}