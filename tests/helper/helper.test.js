const {callExternalAPI,getAllBooks,groupBy} = require('../../src/helper/index')

const axios = require('axios');

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data:{
        Author: "J K Rowling",
        id: 10,
        Name: "Harry Potter and the Sorcerers Stone (Harry Potter, #1)"
    }
})
}))

describe('callExternalAPI', ()=> {
  it('should make GET API call and return data from passed URL',async () => 
  {
  const response = await callExternalAPI('https://jsonplaceholder.typicode.com/allBooks');
  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/allBooks')
  expect(response).toEqual(
    {
        Author: "J K Rowling",
        id: 10,
        Name: "Harry Potter and the Sorcerers Stone (Harry Potter, #1)"
    }
    );
  })
})


