const { get } = require('../posts');

describe('PostsController GET', () => {
    const res = require('../__mocks__/response')();
    const mockReq = require('../__mocks__/request');

    test('It should return status code 400 and a JSON object { "error": "Tags parameter is required" } if no tag parameter is provided', async () => {
        const req = mockReq();
        req.query = {};
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Tags parameter is required" });
    });

    test('It should return an array of posts if at least aone valid tag is passed', async () => {
        const req = mockReq();
        req.query = {
                tag: "tech"
            }
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('It should return an array of combined posts if more than one valid tag is passed', async () => {
        const req = mockReq();
        query = {
                tag: "tech,history,design"
            }
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('It should return an array of posts if at least one tag is passed and a valid sortBy paramter is passed', async () => {
        const req = mockReq();
        req.query = {
                tag: "tech,history",
                soryBy: "likes"
            }
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('It should return an array of posts if at least one tag is passed and a valid direction parameter is passed', async () => {
        const req = mockReq();
        req.query = {
                tag: "tech,history",
                direction: "desc"
            }
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('It should return status 400 and an error message if an invalid sortBy paramater was passed', async () => {
        const req = mockReq();
        req.query = {
                tag: "tech",
                sortBy: "author"
            }
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "error": [
                "sortBy parameter is invalid.\n"
            ]
        });
    });

    test('It should return status 400 and an error message if an invalid direction parameter was passed', async () => {
        const req = mockReq();
        req.query = {
                tag: "tech",
                direction: "descending"
            }
        await get(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            "error": [
                "sortBy parameter is invalid.\n"
            ]
        });
    });
});
