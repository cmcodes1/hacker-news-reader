import CommentsService from '../src/api/CommentsService';

const commentsService = new CommentsService()

it('Testing getTopStoriesIds API', async function () {

    global.fetch = jest.fn().mockImplementation(() => {
        let promise = new Promise((resolve) => {
            resolve({
                json: function () {
                    return { "payload": { "by": "anonporridge", "id": 30618405, "parent": 30618127, "text": "Another reason I can think of is that as more and more legitimate traffic moves onto Tor internal (no exit nodes) it becomes increasingly non-viable for nation states to execute a blanket ban on Tor traffic as it would be too disruptive to people and the economy.", "time": 1646851411, "type": "comment" }, "status": "success" }
                }
            })
        })
        return promise
    })

    const response = await commentsService.getFirstReply();

    expect(response.payload).toStrictEqual({ "payload": { "by": "anonporridge", "id": 30618405, "parent": 30618127, "text": "Another reason I can think of is that as more and more legitimate traffic moves onto Tor internal (no exit nodes) it becomes increasingly non-viable for nation states to execute a blanket ban on Tor traffic as it would be too disruptive to people and the economy.", "time": 1646851411, "type": "comment" }, "status": "success" })

})