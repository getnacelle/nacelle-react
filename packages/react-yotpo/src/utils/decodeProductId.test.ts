import decodeProductId from './decodeProductId';
import { shopifyItem } from '../shared/product.fixtures';

describe('decodeProductId()', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return null if there is no product id', () => {
    const result = decodeProductId('');

    expect(result).toBeNull();
  });

  it('should decode a base64 shopify product id', () => {
    const result = decodeProductId(shopifyItem.pimSyncSourceProductId);
    expect(result).toEqual('4396648431749');
  });

  it('should return null and log an error if decoding fails', () => {
    console.error = jest.fn();

    const invalidId = <unknown>1234;
    const result = decodeProductId(<string>invalidId);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Could not decode productId: 1234',
      'The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received type number (1234)'
    );

    expect(result).toBeNull();
  });
});
