import HelpersService from '../../Helpers';

describe('HelpersService', () => {

  describe('functions', () => {

    describe('slugify(text)', () => {

      it('converts "Game one" into "game-one"', () => {
        expect(HelpersService.slugify('Game one')).toEqual('game-one');
      })
    })
  })
})