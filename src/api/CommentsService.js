class CommentsService {

    async getComments(id) {
        try {
            let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                },
            });
            response = await response.json();
            return response;
        } catch (e) {
            let response = `Something went wrong! Try again later! ${e}`;
            return response;
        }
    }

    async getFirstReply(id) {
        try {
            let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                },
            });
            response = await response.json();
            return { "payload": response, "status": "success", };
        } catch (e) {
            return { "payload": `Something went wrong! Try again later! ${e}`, "status": "error", };
        }
    }

}

export default CommentsService;