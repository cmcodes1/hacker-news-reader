import CommentsService from '../src/api/CommentsService';

const commentsService = new CommentsService()

it('Testing getTopStoriesIds API', async function () {

    global.fetch = jest.fn().mockImplementation(() => {
        let promise = new Promise((resolve) => {
            resolve({
                json: function () {
                    return { "by": "stingraycharles", "id": 30618127, "kids": [30618216, 30618460, 30618405, 30618243, 30618179], "parent": 30614987, "text": "Could someone elaborate on what potential threat is addressed here for the users? As far as I understand, a hidden service’s main purpose is to protect the privacy of the domain operator (in this case, Twitter).<p>For a user, however, just the act of connecting through Tor will protect their privacy (to a debatable degree). At the very least, it will circumvent any blocks put in place by their ISP and&#x2F;or upstream.<p>What’s the advantage of a hidden service then?", "time": 1646850189, "type": "comment" }
                }
            })
        })
        return promise
    })

    const response = await commentsService.getComments(30618127);

    expect(response).toStrictEqual({ "by": "stingraycharles", "id": 30618127, "kids": [30618216, 30618460, 30618405, 30618243, 30618179], "parent": 30614987, "text": "Could someone elaborate on what potential threat is addressed here for the users? As far as I understand, a hidden service’s main purpose is to protect the privacy of the domain operator (in this case, Twitter).<p>For a user, however, just the act of connecting through Tor will protect their privacy (to a debatable degree). At the very least, it will circumvent any blocks put in place by their ISP and&#x2F;or upstream.<p>What’s the advantage of a hidden service then?", "time": 1646850189, "type": "comment" })

})