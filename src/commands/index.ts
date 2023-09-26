export interface Command {
    action(): void;
}

export { default as AuthCommand } from "./auth";
