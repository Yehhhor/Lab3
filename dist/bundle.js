/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models.ts\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ \"./src/services.ts\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./src/modal.ts\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation */ \"./src/validation.ts\");\n\n\n\n\n\nvar App = (function () {\n    function App() {\n        this.libraryService = new _services__WEBPACK_IMPORTED_MODULE_1__.LibraryService();\n        this.loadSavedData();\n        this.setupEventListeners();\n        this.updateLists();\n    }\n    App.prototype.loadSavedData = function () {\n        var _this = this;\n        var savedBooks = (_storage__WEBPACK_IMPORTED_MODULE_3__.Storage.load('books') || []);\n        var savedUsers = (_storage__WEBPACK_IMPORTED_MODULE_3__.Storage.load('users') || []);\n        if (Array.isArray(savedBooks)) {\n            savedBooks.forEach(function (bookData) {\n                _this.libraryService.addBook(new _models__WEBPACK_IMPORTED_MODULE_0__.Book(bookData.title, bookData.author, bookData.year, bookData.isBorrowed));\n            });\n        }\n        if (Array.isArray(savedUsers)) {\n            savedUsers.forEach(function (userData) {\n                var user = new _models__WEBPACK_IMPORTED_MODULE_0__.User(userData.name, userData.email);\n                if (Array.isArray(userData.borrowedBooks)) {\n                    userData.borrowedBooks.forEach(function (bookData) {\n                        var book = new _models__WEBPACK_IMPORTED_MODULE_0__.Book(bookData.title, bookData.author, bookData.year, bookData.isBorrowed);\n                        user.borrowBook(book);\n                    });\n                }\n                _this.libraryService.addUser(user);\n            });\n        }\n    };\n    App.prototype.setupEventListeners = function () {\n        var _a, _b, _c, _d;\n        (_a = document\n            .getElementById('addBookForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', this.handleAddBook.bind(this));\n        (_b = document\n            .getElementById('addUserForm')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', this.handleAddUser.bind(this));\n        (_c = document\n            .getElementById('bookList')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.handleBookAction.bind(this));\n        (_d = document\n            .getElementById('confirmBorrowButton')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.handleConfirmBorrow.bind(this));\n    };\n    App.prototype.handleAddBook = function (event) {\n        event.preventDefault();\n        var form = event.target;\n        var validationResult = _validation__WEBPACK_IMPORTED_MODULE_4__.Validation.validateForm(form);\n        this.clearValidationErrors(form);\n        if (!validationResult.isValid) {\n            this.displayValidationErrors(form, validationResult.errors);\n            return;\n        }\n        var titleInput = form.querySelector('input[name=\"title\"]');\n        var authorInput = form.querySelector('input[name=\"author\"]');\n        var yearInput = form.querySelector('input[name=\"year\"]');\n        var title = titleInput.value;\n        var author = authorInput.value;\n        var year = parseInt(yearInput.value);\n        var newBook = new _models__WEBPACK_IMPORTED_MODULE_0__.Book(title, author, year);\n        this.libraryService.addBook(newBook);\n        this.saveData();\n        this.updateLists();\n        _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('bookActionModal', \"\\u041A\\u043D\\u0438\\u0433\\u0443 \\\"\".concat(title, \"\\\" \\u0443\\u0441\\u043F\\u0456\\u0448\\u043D\\u043E \\u0434\\u043E\\u0434\\u0430\\u043D\\u043E.\"));\n        form.reset();\n    };\n    App.prototype.handleAddUser = function (event) {\n        event.preventDefault();\n        var form = event.target;\n        var validationResult = _validation__WEBPACK_IMPORTED_MODULE_4__.Validation.validateForm(form);\n        this.clearValidationErrors(form);\n        if (!validationResult.isValid) {\n            this.displayValidationErrors(form, validationResult.errors);\n            return;\n        }\n        var nameInput = form.querySelector('input[name=\"name\"]');\n        var emailInput = form.querySelector('input[name=\"email\"]');\n        var name = nameInput.value;\n        var email = emailInput.value;\n        var newUser = new _models__WEBPACK_IMPORTED_MODULE_0__.User(name, email);\n        this.libraryService.addUser(newUser);\n        this.saveData();\n        this.updateLists();\n        _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('bookActionModal', \"\\u041A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0430 \".concat(name, \" \\u0443\\u0441\\u043F\\u0456\\u0448\\u043D\\u043E \\u0434\\u043E\\u0434\\u0430\\u043D\\u043E.\"));\n        form.reset();\n    };\n    App.prototype.displayValidationErrors = function (form, errors) {\n        errors.forEach(function (errorMessage, fieldName) {\n            var _a;\n            var input = form.querySelector(\"input[name=\\\"\".concat(fieldName, \"\\\"]\"));\n            if (input) {\n                input.classList.add('is-invalid');\n                var errorDiv = document.createElement('div');\n                errorDiv.className = 'invalid-feedback';\n                errorDiv.textContent = errorMessage;\n                (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(errorDiv, input.nextSibling);\n            }\n        });\n    };\n    App.prototype.clearValidationErrors = function (form) {\n        form.querySelectorAll('.is-invalid').forEach(function (element) {\n            element.classList.remove('is-invalid');\n        });\n        form.querySelectorAll('.invalid-feedback').forEach(function (element) {\n            element.remove();\n        });\n    };\n    App.prototype.handleBookAction = function (event) {\n        var target = event.target;\n        if (target.classList.contains('borrow-btn')) {\n            var bookId = target.getAttribute('data-book-id');\n            if (bookId) {\n                var book = this.libraryService.getBookById(parseInt(bookId));\n                if (book && !book.isBorrowed) {\n                    document.getElementById('borrowBookModal').setAttribute('data-book-id', bookId);\n                    var userIdInput = document.getElementById('borrowUserId');\n                    userIdInput.value = '';\n                    _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('borrowBookModal');\n                }\n            }\n        }\n        else if (target.classList.contains('return-btn')) {\n            var bookId = target.getAttribute('data-book-id');\n            if (bookId) {\n                var book = this.libraryService.getBookById(parseInt(bookId));\n                if (book && book.isBorrowed) {\n                    this.libraryService.returnBook(book);\n                    this.saveData();\n                    this.updateLists();\n                    _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('bookActionModal', \"\\u041A\\u043D\\u0438\\u0433\\u0430 \\\"\".concat(book.title, \"\\\" \\u0443\\u0441\\u043F\\u0456\\u0448\\u043D\\u043E \\u043F\\u043E\\u0432\\u0435\\u0440\\u043D\\u0443\\u0442\\u0430.\"));\n                }\n            }\n        }\n    };\n    App.prototype.handleConfirmBorrow = function () {\n        var userId = document.getElementById('borrowUserId').value;\n        var bookId = document.getElementById('borrowBookModal').getAttribute('data-book-id');\n        if (userId && bookId) {\n            var user = this.libraryService.getUserById(parseInt(userId));\n            var book = this.libraryService.getBookById(parseInt(bookId));\n            if (user && book) {\n                if (user.getBorrowedBooks().length >= 3) {\n                    _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.hide('borrowBookModal');\n                    _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('errorModal', \"\\u041A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447 \".concat(user.name, \" \\u043D\\u0435 \\u043C\\u043E\\u0436\\u0435 \\u043F\\u043E\\u0437\\u0438\\u0447\\u0430\\u0442\\u0438 \\u0431\\u0456\\u043B\\u044C\\u0448\\u0435 \\u0442\\u0440\\u044C\\u043E\\u0445 \\u043A\\u043D\\u0438\\u0433.\"));\n                }\n                else {\n                    try {\n                        this.libraryService.borrowBook(user, book);\n                        this.saveData();\n                        this.updateLists();\n                        _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.hide('borrowBookModal');\n                        _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('bookActionModal', \"\\u041A\\u043D\\u0438\\u0433\\u0443 \\\"\".concat(book.title, \"\\\" \\u0443\\u0441\\u043F\\u0456\\u0448\\u043D\\u043E \\u043F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u043E \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0435\\u043C \").concat(user.name, \".\"));\n                    }\n                    catch (error) {\n                        _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('errorModal', error.message);\n                    }\n                }\n            }\n            else {\n                _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.show('errorModal', 'Невірний ID користувача або книги.');\n            }\n        }\n    };\n    App.prototype.saveData = function () {\n        _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.save('books', this.libraryService.getAllBooks());\n        _storage__WEBPACK_IMPORTED_MODULE_3__.Storage.save('users', this.libraryService.getAllUsers());\n    };\n    App.prototype.updateLists = function () {\n        this.updateBookList();\n        this.updateUserList();\n    };\n    App.prototype.updateBookList = function () {\n        var bookList = document.getElementById('bookList');\n        if (bookList) {\n            bookList.innerHTML = '';\n            this.libraryService.getAllBooks().forEach(function (book, index) {\n                var li = document.createElement('li');\n                li.className = 'list-group-item d-flex justify-content-between align-items-center';\n                li.innerHTML = \"\\n                  \".concat(book.getDetails(), \"\\n                  \").concat(book.isBorrowed\n                    ? \"<button class=\\\"btn btn-warning btn-sm return-btn\\\" data-book-id=\\\"\".concat(index, \"\\\">\\u041F\\u043E\\u0432\\u0435\\u0440\\u043D\\u0443\\u0442\\u0438</button>\")\n                    : \"<button class=\\\"btn btn-primary btn-sm borrow-btn\\\" data-book-id=\\\"\".concat(index, \"\\\">\\u041F\\u043E\\u0437\\u0438\\u0447\\u0438\\u0442\\u0438</button>\"), \"\\n              \");\n                bookList.appendChild(li);\n            });\n        }\n    };\n    App.prototype.updateUserList = function () {\n        var userList = document.getElementById('userList');\n        if (userList) {\n            userList.innerHTML = '';\n            this.libraryService.getAllUsers().forEach(function (user, index) {\n                var li = document.createElement('li');\n                li.className = 'list-group-item';\n                li.innerHTML = \"\\n                  <strong>\".concat(user.name, \"</strong> (\").concat(user.email, \") - ID: \").concat(index, \"<br>\\n                  \\u041F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u0456 \\u043A\\u043D\\u0438\\u0433\\u0438: \").concat(user.borrowedBooks.map(function (book) { return book.title; }).join(', ') || 'Немає', \"\\n              \");\n                userList.appendChild(li);\n            });\n        }\n    };\n    return App;\n}());\ndocument.addEventListener('DOMContentLoaded', function () {\n    new App();\n    document.addEventListener('click', function (event) {\n        var target = event.target;\n        if (target && target.hasAttribute('data-modal-id')) {\n            var modalId = target.getAttribute('data-modal-id');\n            _modal__WEBPACK_IMPORTED_MODULE_2__.Modal.hide(modalId);\n        }\n    });\n});\n\n\n//# sourceURL=webpack://lab-app/./src/app.ts?");

/***/ }),

/***/ "./src/library.ts":
/*!************************!*\
  !*** ./src/library.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Library: () => (/* binding */ Library)\n/* harmony export */ });\nvar Library = (function () {\n    function Library() {\n        this.items = [];\n    }\n    Library.prototype.addItem = function (item) {\n        this.items.push(item);\n    };\n    Library.prototype.removeItem = function (item) {\n        var index = this.items.indexOf(item);\n        if (index > -1) {\n            this.items.splice(index, 1);\n        }\n        else {\n            throw new Error('Item not found in library.');\n        }\n    };\n    Library.prototype.findItem = function (predicate) {\n        return this.items.find(predicate);\n    };\n    Library.prototype.getAllItems = function () {\n        return this.items;\n    };\n    return Library;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/library.ts?");

/***/ }),

/***/ "./src/modal.ts":
/*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modal: () => (/* binding */ Modal)\n/* harmony export */ });\nvar Modal = (function () {\n    function Modal() {\n    }\n    Modal.show = function (modalId, message) {\n        var modal = document.getElementById(modalId);\n        if (modal) {\n            if (message) {\n                var messageElement = modal.querySelector('.modal-body p');\n                if (messageElement) {\n                    messageElement.textContent = message;\n                }\n            }\n            modal.classList.add('show');\n            modal.style.display = 'block';\n            modal.setAttribute('aria-hidden', 'false');\n        }\n    };\n    Modal.hide = function (modalId) {\n        var modal = document.getElementById(modalId);\n        if (modal) {\n            modal.classList.remove('show');\n            modal.style.display = 'none';\n            modal.setAttribute('aria-hidden', 'true');\n        }\n    };\n    return Modal;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/modal.ts?");

/***/ }),

/***/ "./src/models.ts":
/*!***********************!*\
  !*** ./src/models.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book),\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\nvar User = (function () {\n    function User(name, email, borrowedBooks) {\n        if (borrowedBooks === void 0) { borrowedBooks = []; }\n        this.name = name;\n        this.email = email;\n        this.borrowedBooks = borrowedBooks;\n    }\n    User.prototype.borrowBook = function (book) {\n        if (this.borrowedBooks.length >= 3) {\n            throw new Error('Cannot borrow more than 3 books.');\n        }\n        book.borrow();\n        this.borrowedBooks.push(book);\n    };\n    User.prototype.returnBook = function (book) {\n        var index = this.borrowedBooks.indexOf(book);\n        if (index > -1) {\n            book.returnBook();\n            this.borrowedBooks.splice(index, 1);\n        }\n        else {\n            throw new Error(\"Book not found in user's borrowed list.\");\n        }\n    };\n    User.prototype.getBorrowedBooks = function () {\n        return this.borrowedBooks;\n    };\n    return User;\n}());\n\nvar Book = (function () {\n    function Book(title, author, year, isBorrowed) {\n        if (isBorrowed === void 0) { isBorrowed = false; }\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.isBorrowed = isBorrowed;\n    }\n    Book.prototype.getDetails = function () {\n        return \"\".concat(this.title, \" by \").concat(this.author, \", \").concat(this.year);\n    };\n    Book.prototype.borrow = function () {\n        if (!this.isBorrowed) {\n            this.isBorrowed = true;\n        }\n        else {\n            throw new Error('Book is already borrowed.');\n        }\n    };\n    Book.prototype.returnBook = function () {\n        if (this.isBorrowed) {\n            this.isBorrowed = false;\n        }\n        else {\n            throw new Error('Book was not borrowed.');\n        }\n    };\n    return Book;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/models.ts?");

/***/ }),

/***/ "./src/services.ts":
/*!*************************!*\
  !*** ./src/services.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LibraryService: () => (/* binding */ LibraryService)\n/* harmony export */ });\n/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./library */ \"./src/library.ts\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ \"./src/modal.ts\");\n\n\nvar LibraryService = (function () {\n    function LibraryService() {\n        this.bookLibrary = new _library__WEBPACK_IMPORTED_MODULE_0__.Library();\n        this.userLibrary = new _library__WEBPACK_IMPORTED_MODULE_0__.Library();\n    }\n    LibraryService.prototype.addBook = function (book) {\n        this.bookLibrary.addItem(book);\n    };\n    LibraryService.prototype.addUser = function (user) {\n        this.userLibrary.addItem(user);\n    };\n    LibraryService.prototype.borrowBook = function (user, book) {\n        try {\n            user.borrowBook(book);\n            _modal__WEBPACK_IMPORTED_MODULE_1__.Modal.show('bookActionModal', \"Successfully borrowed \".concat(book.getDetails()));\n        }\n        catch (error) {\n            _modal__WEBPACK_IMPORTED_MODULE_1__.Modal.show('errorModal', error.message);\n        }\n    };\n    LibraryService.prototype.returnBook = function (book) {\n        try {\n            var user = this.getAllUsers().find(function (u) { return u.borrowedBooks.includes(book); });\n            if (user) {\n                user.returnBook(book);\n                _modal__WEBPACK_IMPORTED_MODULE_1__.Modal.show('bookActionModal', \"Successfully returned \".concat(book.getDetails()));\n            }\n            else {\n                throw new Error(\"Book not found in any user's borrowed list.\");\n            }\n        }\n        catch (error) {\n            _modal__WEBPACK_IMPORTED_MODULE_1__.Modal.show('errorModal', error.message);\n        }\n    };\n    LibraryService.prototype.getAllBooks = function () {\n        return this.bookLibrary.getAllItems();\n    };\n    LibraryService.prototype.getAllUsers = function () {\n        return this.userLibrary.getAllItems();\n    };\n    LibraryService.prototype.getBookById = function (id) {\n        return this.getAllBooks()[id];\n    };\n    LibraryService.prototype.getUserById = function (id) {\n        return this.getAllUsers()[id];\n    };\n    return LibraryService;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/services.ts?");

/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Storage: () => (/* binding */ Storage)\n/* harmony export */ });\nvar Storage = (function () {\n    function Storage() {\n    }\n    Storage.save = function (key, value) {\n        localStorage.setItem(key, JSON.stringify(value));\n    };\n    Storage.load = function (key) {\n        var item = localStorage.getItem(key);\n        return item ? JSON.parse(item) : null;\n    };\n    Storage.remove = function (key) {\n        localStorage.removeItem(key);\n    };\n    Storage.clear = function () {\n        localStorage.clear();\n    };\n    return Storage;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/storage.ts?");

/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Validation: () => (/* binding */ Validation)\n/* harmony export */ });\nvar Validation = (function () {\n    function Validation() {\n    }\n    Validation.validateRequired = function (value) {\n        return value.trim().length > 0;\n    };\n    Validation.validateEmail = function (email) {\n        var emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n        return emailRegex.test(email);\n    };\n    Validation.validateYear = function (year) {\n        var currentYear = new Date().getFullYear();\n        var yearRegex = /^[0-9]{4}$/;\n        var yearNumber = parseInt(year, 10);\n        return yearRegex.test(year) && yearNumber > 0 && yearNumber <= currentYear;\n    };\n    Validation.validateForm = function (form) {\n        var _this = this;\n        var errors = new Map();\n        var inputs = form.querySelectorAll('input');\n        inputs.forEach(function (input) {\n            if (!_this.validateRequired(input.value)) {\n                errors.set(input.name, 'Це поле є обовязковим');\n            }\n            else if (input.name === 'email' && !_this.validateEmail(input.value)) {\n                errors.set(input.name, 'Некоректний формат email');\n            }\n            else if (input.name === 'year' && !_this.validateYear(input.value)) {\n                errors.set(input.name, 'Некоректний рік видання');\n            }\n        });\n        return {\n            isValid: errors.size === 0,\n            errors: errors,\n        };\n    };\n    return Validation;\n}());\n\n\n\n//# sourceURL=webpack://lab-app/./src/validation.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;