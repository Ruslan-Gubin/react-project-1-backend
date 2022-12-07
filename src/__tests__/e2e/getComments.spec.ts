import axios from 'axios';
import { describe, expect } from '@jest/globals';
jest.mock('axios');
describe('get dialog data', () => {
    //@ts-ignore
    let response;
    beforeEach(async () => {
        response = await axios.get('api/dialog/637e506ea0010b27629a680b');
    });
    test('valid value', async () => {
        //@ts-ignore
        axios.get.mockReturnValue(response);
        expect(axios.get).toBeCalledTimes(1);
        expect(200);
    });
});
