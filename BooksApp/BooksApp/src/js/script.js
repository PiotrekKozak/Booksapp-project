{
    'use strict';

    const select = {
        templateOf: {
            bookProduct: '#template-book',
        },
        containerOf: {
            bookList: '.books-list',
        },

        element: {
            bookImage: '.book__image',
        }
    };

    const templates = {
        menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    };

    const render = function () {
        for (const book of dataSource.books) {
            const thisBook = this;

            const generatedHTML = templates.menuProduct(book);

            thisBook.book = utils.createDOMFromHTML(generatedHTML);

            const bookContainer = document.querySelector(select.containerOf.bookList);

            bookContainer.appendChild(thisBook.book);
        }
    };


    const favoriteBooks = [];

    const initActions = function () {
        const thisBook = this;

        thisBook.container = document.querySelector(select.containerOf.bookList);
        thisBook.image = thisBook.container.querySelectorAll(select.element.bookImage);

        for (const bookImage of thisBook.image) {
            bookImage.addEventListener('dblclick', function (event) {
                event.preventDefault();
                bookImage.classList.toggle('favorite');

                const booksImageId = bookImage.getAttribute('data-id');
                if (favoriteBooks.includes(booksImageId)) {
                    const indexId = favoriteBooks.indexOf(booksImageId);
                    favoriteBooks.splice(indexId, 1);
                } else {
                    favoriteBooks.push(booksImageId);
                }
            });
        }
    };
    console.log(favoriteBooks);
    render();
    initActions();
}