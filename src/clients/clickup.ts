import { CLICKUP_URL } from "../utils/constants";

class ClickupClient {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    async getList(listId: string) {
        return fetch(`${CLICKUP_URL}/list/${listId}`, {
            method: "GET",
            headers: {
                Authorization: this.token,
            },
        }).then((res) => res.json());
    }
}

export default ClickupClient;
