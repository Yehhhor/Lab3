// // import all modules here
import { Book, User } from './models';
import { LibraryService } from './services';
import { Modal } from './modal';
import { Storage } from './storage';
import { Validation } from './validation';

class App {
  private libraryService: LibraryService;

  constructor() {
    this.libraryService = new LibraryService();
    this.loadSavedData();
    this.setupEventListeners();
    this.updateLists();
  }

  // private loadSavedData(): void {
  //   const savedBooks = Storage.load("books") || [];
  //   const savedUsers = Storage.load("users") || [];

  //   savedBooks.forEach((bookData: Book) => {
  //     this.libraryService.addBook(
  //       new Book(
  //         bookData.title,
  //         bookData.author,
  //         bookData.year,
  //         bookData.isBorrowed
  //       )
  //     );
  //   });

  //   savedUsers.forEach((userData: User) => {
  //     const user = new User(userData.name, userData.email);
  //     userData.borrowedBooks.forEach((bookData: Book) => {
  //       const book = new Book(
  //         bookData.title,
  //         bookData.author,
  //         bookData.year,
  //         bookData.isBorrowed
  //       );
  //       user.borrowBook(book);
  //     });
  //     this.libraryService.addUser(user);
  //   });
  // }

  private loadSavedData(): void {
    const savedBooks = (Storage.load<Book[]>('books') || []) as Book[];
    const savedUsers = (Storage.load<User[]>('users') || []) as User[];

    if (Array.isArray(savedBooks)) {
      savedBooks.forEach((bookData: Book) => {
        this.libraryService.addBook(
          new Book(bookData.title, bookData.author, bookData.year, bookData.isBorrowed),
        );
      });
    }

    if (Array.isArray(savedUsers)) {
      savedUsers.forEach((userData: User) => {
        const user = new User(userData.name, userData.email);
        if (Array.isArray(userData.borrowedBooks)) {
          userData.borrowedBooks.forEach((bookData: Book) => {
            const book = new Book(
              bookData.title,
              bookData.author,
              bookData.year,
              bookData.isBorrowed,
            );
            user.borrowBook(book);
          });
        }
        this.libraryService.addUser(user);
      });
    }
  }

  private setupEventListeners(): void {
    document
      .getElementById('addBookForm')
      ?.addEventListener('submit', this.handleAddBook.bind(this));
    document
      .getElementById('addUserForm')
      ?.addEventListener('submit', this.handleAddUser.bind(this));
    document
      .getElementById('bookList')
      ?.addEventListener('click', this.handleBookAction.bind(this));
    document
      .getElementById('confirmBorrowButton')
      ?.addEventListener('click', this.handleConfirmBorrow.bind(this));
  }

  private handleAddBook(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const validationResult = Validation.validateForm(form);

    this.clearValidationErrors(form);

    if (!validationResult.isValid) {
      this.displayValidationErrors(form, validationResult.errors);
      return;
    }

    const titleInput = form.querySelector('input[name="title"]') as HTMLInputElement;
    const authorInput = form.querySelector('input[name="author"]') as HTMLInputElement;
    const yearInput = form.querySelector('input[name="year"]') as HTMLInputElement;

    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);

    const newBook = new Book(title, author, year);
    this.libraryService.addBook(newBook);
    this.saveData();
    this.updateLists();
    Modal.show('bookActionModal', `Книгу "${title}" успішно додано.`);

    form.reset();
  }

  private handleAddUser(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const validationResult = Validation.validateForm(form);

    this.clearValidationErrors(form);

    if (!validationResult.isValid) {
      this.displayValidationErrors(form, validationResult.errors);
      return;
    }

    const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;

    const name = nameInput.value;
    const email = emailInput.value;

    const newUser = new User(name, email);
    this.libraryService.addUser(newUser);
    this.saveData();
    this.updateLists();
    Modal.show('bookActionModal', `Користувача ${name} успішно додано.`);

    form.reset();
  }

  private displayValidationErrors(form: HTMLFormElement, errors: Map<string, string>): void {
    errors.forEach((errorMessage, fieldName) => {
      const input = form.querySelector(`input[name="${fieldName}"]`);
      if (input) {
        input.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = errorMessage;
        input.parentNode?.insertBefore(errorDiv, input.nextSibling);
      }
    });
  }

  private clearValidationErrors(form: HTMLFormElement): void {
    form.querySelectorAll('.is-invalid').forEach((element) => {
      element.classList.remove('is-invalid');
    });
    form.querySelectorAll('.invalid-feedback').forEach((element) => {
      element.remove();
    });
  }

  private handleBookAction(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('borrow-btn')) {
      const bookId = target.getAttribute('data-book-id');
      if (bookId) {
        const book = this.libraryService.getBookById(parseInt(bookId));
        if (book && !book.isBorrowed) {
          (document.getElementById('borrowBookModal') as HTMLElement).setAttribute(
            'data-book-id',
            bookId,
          );

          //очищення поля id
          const userIdInput = document.getElementById('borrowUserId') as HTMLInputElement;
          userIdInput.value = '';

          Modal.show('borrowBookModal');
        }
      }
    } else if (target.classList.contains('return-btn')) {
      const bookId = target.getAttribute('data-book-id');
      if (bookId) {
        const book = this.libraryService.getBookById(parseInt(bookId));
        if (book && book.isBorrowed) {
          this.libraryService.returnBook(book);
          this.saveData();
          this.updateLists();
          Modal.show('bookActionModal', `Книга "${book.title}" успішно повернута.`);
        }
      }
    }
  }

  private handleConfirmBorrow(): void {
    const userId = (document.getElementById('borrowUserId') as HTMLInputElement).value;
    const bookId = (document.getElementById('borrowBookModal') as HTMLElement).getAttribute(
      'data-book-id',
    );

    if (userId && bookId) {
      const user = this.libraryService.getUserById(parseInt(userId));
      const book = this.libraryService.getBookById(parseInt(bookId));

      if (user && book) {
        // Перевіряємо, чи користувач вже має 3 книги
        if (user.getBorrowedBooks().length >= 3) {
          Modal.hide('borrowBookModal');
          Modal.show('errorModal', `Користувач ${user.name} не може позичати більше трьох книг.`);
        } else {
          try {
            this.libraryService.borrowBook(user, book);
            this.saveData();
            this.updateLists();
            Modal.hide('borrowBookModal');
            Modal.show(
              'bookActionModal',
              `Книгу "${book.title}" успішно позичено користувачем ${user.name}.`,
            );
          } catch (error) {
            Modal.show('errorModal', (error as Error).message);
          }
        }
      } else {
        Modal.show('errorModal', 'Невірний ID користувача або книги.');
      }
    }
  }

  private saveData(): void {
    Storage.save('books', this.libraryService.getAllBooks());
    Storage.save('users', this.libraryService.getAllUsers());
  }

  private updateLists(): void {
    this.updateBookList();
    this.updateUserList();
  }

  private updateBookList(): void {
    const bookList = document.getElementById('bookList');
    if (bookList) {
      bookList.innerHTML = '';
      this.libraryService.getAllBooks().forEach((book, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
                  ${book.getDetails()}
                  ${
                    book.isBorrowed
                      ? `<button class="btn btn-warning btn-sm return-btn" data-book-id="${index}">Повернути</button>`
                      : `<button class="btn btn-primary btn-sm borrow-btn" data-book-id="${index}">Позичити</button>`
                  }
              `;
        bookList.appendChild(li);
      });
    }
  }

  private updateUserList(): void {
    const userList = document.getElementById('userList');
    if (userList) {
      userList.innerHTML = '';
      this.libraryService.getAllUsers().forEach((user, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
                  <strong>${user.name}</strong> (${user.email}) - ID: ${index}<br>
                  Позичені книги: ${
                    user.borrowedBooks.map((book) => book.title).join(', ') || 'Немає'
                  }
              `;
        userList.appendChild(li);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();

  // Event delegation for closing modals
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target && target.hasAttribute('data-modal-id')) {
      const modalId = target.getAttribute('data-modal-id')!;
      Modal.hide(modalId);
    }
  });
});
