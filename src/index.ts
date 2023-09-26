#!/usr/bin/env node

import fs from "fs";
import { Command } from "commander";
import { AuthCommand } from "./commands";

const program = new Command();

program
    .argument("<string>", "string to log")
    .action((lol: string) => console.log(lol))
    .description("say lol");

program
    .command("add <numbers...>")
    .action((numbers: number[]) => {
        const total = numbers.reduce((a, b) => a + b, 0);
        console.log("total", total);
    })
    .description("add numbers");

const authCommand = new AuthCommand();
program
    .command("auth")
    .action(authCommand.action)
    .description("authenticates to Clickup");

program.parse(process.argv);
