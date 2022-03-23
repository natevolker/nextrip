
import makeFetchHappen from 'make-fetch-happen'
import { fetch } from '../fetch'

jest.mock('make-fetch-happen', () => {
  const mock = jest.fn()
  return { defaults: () => mock }
})

describe('fetch', () => {
  test('it works with json', async () => {
    const mock = {
      json: jest.fn(),
      headers: { get: () => 'json' }
    };

    mock.json.mockResolvedValue(['hello']);
    (makeFetchHappen.defaults() as unknown as jest.Mock).mockResolvedValue(mock)
    
    const result = await fetch('some-url')
    expect(result).toEqual(['hello'])
  })

  test('it works with text', async () => {
    const mock = {
      text: jest.fn(),
      headers: { get: () => '' }
    }

    mock.text.mockResolvedValue('hello');
    (makeFetchHappen.defaults() as unknown as jest.Mock).mockResolvedValue(mock)
    
    const result = await fetch('some-url')
    expect(result).toEqual('hello')
  })

  test('rejects with error if fetch fails', async () => {
    (makeFetchHappen.defaults() as unknown as jest.Mock).mockRejectedValue('fail')
    await expect(fetch('some-url')).rejects.toEqual(new Error('fail'))
  })

  test('rejects with error if json parse fails', async () => {
    const mock = {
      json: jest.fn(),
      headers: { get: () => 'json' }
    };

    mock.json.mockRejectedValue({ message: 'fail' });
    (makeFetchHappen.defaults() as unknown as jest.Mock).mockResolvedValue(mock)
    await expect(fetch('some-url')).rejects.toEqual(new Error('Could not read HTTP response'))
  })

  test('rejects with error if response text fails', async () => {
    const mock = {
      text: jest.fn(),
      headers: { get: () => null }
    };

    mock.text.mockRejectedValue('fail');
    (makeFetchHappen.defaults() as unknown as jest.Mock).mockResolvedValue(mock)
    await expect(fetch('some-url')).rejects.toEqual(new Error('fail'))
  })
})