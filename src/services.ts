import { Book, User } from './models';
import { Library } from './library';
import { Modal } from './modal';

export class LibraryService {
  private bookLibrary: Library<Book>;
  private userLibrary: Library<User>;

  constructor() {
    this.bookLibrary = new Library<Book>();
    this.userLibrary = new Library<User>();
  }

  public addBook(book: Book): any{
    this.bookLibrary.addItem(book);
  }

  public addUser(user: User): void {
    this.userLibrary.addItem(user);
  }

  public borrowBook(user: User, book: Book): void {
    try {
      user.borrowBook(book);
      Modal.show('bookActionModal', `Successfully borrowed ${book.getDetails()}`);
    } catch (error) {
      Modal.show('errorModal', (error as Error).message);
    }
  }

  public returnBook(book: Book): void {
    try {
      const user = this.getAllUsers().find((u) => u.borrowedBooks.includes(book));
      if (user) {
        user.returnBook(book);
        Modal.show('bookActionModal', `Successfully returned ${book.getDetails()}`);
      } else {
        throw new Error("Book not found in any user's borrowed list.");
      }
    } catch (error) {
      Modal.show('errorModal', (error as Error).message);
    }
  }

  public getAllBooks(): Book[] {
    return this.bookLibrary.getAllItems();
  }

  public getAllUsers(): User[] {
    return this.userLibrary.getAllItems();
  }

  public getBookById(id: number): Book | undefined {
    return this.getAllBooks()[id];
  }

  public getUserById(id: number): User | undefined {
    return this.getAllUsers()[id];
  }
}
