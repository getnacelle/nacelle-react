import { composeStyles } from './styles';

describe('Style Utils', () => {
  describe('composeStyles()', () => {
    it('should overwrite styles from right to left', () => {
      const firstStyles = { backgroundColor: 'darkorange', color: 'black' };
      const secondStyles = { backgroundColor: 'orchid' };

      const result = composeStyles([firstStyles, secondStyles]);
      expect(result).toEqual({ backgroundColor: 'orchid', color: 'black' });
    });
  });
});
