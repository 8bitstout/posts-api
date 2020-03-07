const { get } = require('../ping');

describe('ping', () => {
    test('It should return status code 200 and a JSON object { success: true }', async () => {
        const res = require('../__mocks__/response')();
        await get(null, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });
});
