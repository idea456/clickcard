import prompts from "prompts";
import type { AuthCommand } from ".";
import { CLICKUP_URL } from "../utils/constants";
import ClickupClient from "../clients/clickup";

export default class ListCommand {
    auth: AuthCommand;
    registered_list?: string;
    client: ClickupClient;

    constructor(auth: AuthCommand) {
        this.auth = auth;
        this.client = new ClickupClient("123");
    }

    async action() {
        if (!this.registered_list) await this.registerList();
        const response = await this.client.getList(
            this.registered_list as string,
        );

        return response;
    }

    registerList = async () => {
        const response = await prompts({
            type: "text",
            name: "list_id",
            message:
                "List not registered yet, please provide the list ID of the tasks you want to list. For instance, ",
        });

        this.registered_list = response.list_id;
    };
}
