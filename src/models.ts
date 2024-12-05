export interface IUser {
  name: string;
  email: string;
  borrowedBooks: Book[];
}

export class User implements IUser {
  constructor(
    public name: string,
    public email: string,
    public borrowedBooks: Book[] = [],
  ) {}

  public borrowBook(book: Book): void {
    if (this.borrowedBooks.length >= 3) {
      throw new Error('Cannot borrow more than 3 books.');
    }
    book.borrow();
    this.borrowedBooks.push(book);
  }

  public returnBook(book: Book): void {
    const index = this.borrowedBooks.indexOf(book);
    if (index > -1) {
      book.returnBook();
      this.borrowedBooks.splice(index, 1);
    } else {
      throw new Error("Book not found in user's borrowed list.");
    }
  }

  getBorrowedBooks(): Book[] {
    return this.borrowedBooks;
  }
}

export interface IBook {
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
}

export class Book implements IBook {
  constructor(
    public title: string,
    public author: string,
    public year: number,
    public isBorrowed: boolean = false,
  ) {}

  public getDetails(): string {
    return `${this.title} by ${this.author}, ${this.year}`;
  }

  public borrow(): void {
    if (!this.isBorrowed) {
      this.isBorrowed = true;
    } else {
      throw new Error('Book is already borrowed.');
    }
  }

  public returnBook(): void {
    if (this.isBorrowed) {
      this.isBorrowed = false;
    } else {
      throw new Error('Book was not borrowed.');
    }
  }
}
