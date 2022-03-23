import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { getDirname } from '../getDirname'

jest.mock('path')
jest.mock('url')

describe('getDirname', () => {
  test('calls url.fileURLToPath composed with path.dirname', () => {
    (fileURLToPath as jest.Mock).mockReturnValue('fileURLToPathReturn');
    (dirname as jest.Mock).mockReturnValue('dirnameReturn');

    const url = 'file://some/file/path.txt'
    const result = getDirname(url)

    expect(fileURLToPath).toHaveBeenCalledWith(url)
    expect(dirname).toHaveBeenCalledWith('fileURLToPathReturn')
    expect(result).toBe('dirnameReturn')
  })
})