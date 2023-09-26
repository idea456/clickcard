import fs from "fs";
import dotenv from "dotenv";
import prompts from "prompts";

type CONFIG_KEYS = "CLICKUP_API_TOKEN" | "CHATGPT_TOKEN";

export default class AuthCommand {
    is_authenticated: boolean;
    config: dotenv.DotenvParseOutput;

    constructor() {
        dotenv.config();

        this.config = dotenv.parse(fs.readFileSync(".env"));

        if (!this.config["CLICKUP_API_TOKEN"])
            this.config["CLICKUP_API_TOKEN"] = "";

        if (this.config["CLICKUP_API_TOKEN"] === "") {
            this.is_authenticated = false;
        } else {
            this.is_authenticated = true;
        }
    }

    action = async () => {
        console.log("authenticating user...");

        await this.authenticateClickup();
        this.is_authenticated = true;
    };

    setConfig = (key: CONFIG_KEYS, value: string) => {
        this.config[key] = value;
        const serializedConfig = Object.keys(this.config)
            .map((k) => `${k}=${this.config[k]}`)
            .join("\n");

        fs.writeFileSync(".env", serializedConfig);
    };

    authenticateClickup = async () => {
        const response = await prompts({
            type: "text",
            name: "clickupToken",
            message: "Please provide your Clickup API token",
            validate: (clickupToken) =>
                clickupToken.length === 0 ? "Please provide a token" : true,
        });

        this.setConfig("CLICKUP_API_TOKEN", response.clickupToken);
    };
}
