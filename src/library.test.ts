import { expect } from 'chai';
import { Library } from '../src/library'; // Коригуй шлях до файлу відповідно до структури проєкту

describe('Library', () => {
  let library: Library<string>;

  beforeEach(() => {
    library = new Library<string>();
  });

  describe('addItem', () => {
    it('should add an item to the library', () => {
      library.addItem('item1');
      expect(library.getAllItems()).to.include('item1');
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the library', () => {
      library.addItem('item1');
      library.removeItem('item1');
      expect(library.getAllItems()).to.not.include('item1');
    });

    it('should throw an error if item does not exist', () => {
      expect(() => library.removeItem('item1')).to.throw('Item not found in library.');
    });
  });

  describe('findItem', () => {
    it('should find an item that matches the predicate', () => {
      library.addItem('item1');
      const foundItem = library.findItem((item) => item === 'item1');
      expect(foundItem).to.equal('item1');
    });

    it('should return undefined if no item matches the predicate', () => {
      const foundItem = library.findItem((item) => item === 'item1');
      expect(foundItem).to.be.undefined;
    });
  });

  describe('getAllItems', () => {
    it('should return all items in the library', () => {
      library.addItem('item1');
      library.addItem('item2');
      expect(library.getAllItems()).to.have.members(['item1', 'item2']);
    });
  });
});
