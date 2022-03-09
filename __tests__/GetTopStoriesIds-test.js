import TopStoriesService from '../src/api/TopStoriesService';

const topStoriesService = new TopStoriesService()

it('Testing getTopStoriesIds API', async function () {

    global.fetch = jest.fn().mockImplementation(() => {
        let promise = new Promise((resolve) => {
            resolve({
                json: function () {
                    return { payload: 30614987, status: 'success' }
                }
            })
        })
        return promise
    })

    const response = await topStoriesService.getTopStoriesIds();

    expect(response.payload).toStrictEqual({ payload: 30614987, status: 'success' })

})