export class Library<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    } else {
      throw new Error('Item not found in library.');
    }
  }

  public findItem(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  public getAllItems(): T[] {
    return this.items;
  }
}
