{
    'use strict';

    const select = {
        templateOf: {
            bookProduct: '#template-book',
        },
        containerOf: {
            bookList: '.books-list',
            filters: '.filters',
        },

        element: {
            bookImage: '.book__image',
        }
    };


    const templates = {
        menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
    };

    const favoriteBooks = [];
    const filters = [];

    class BooksList {
        constructor() {
            const thisBook = this;

            thisBook.initData();
            thisBook.getElements();
            thisBook.initActions();
            thisBook.filterBooks();
            thisBook.determineRatingBgc();
        }


        initData() {
            const thisBook = this;
            thisBook.data = dataSource.books;

            for (const book of thisBook.data) {
                const thisBook = this;

                book.ratingBgc = thisBook.determineRatingBgc(book.rating);
                book.ratingWidth = book.rating * 10;

                const generatedHTML = templates.menuProduct(book);

                thisBook.book = utils.createDOMFromHTML(generatedHTML);

                const bookContainer = document.querySelector(select.containerOf.bookList);

                bookContainer.appendChild(thisBook.book);
            }
        }

        getElements() {
            const thisBook = this;

            thisBook.container = document.querySelector(select.containerOf.bookList);
            thisBook.image = thisBook.container.querySelectorAll(select.element.bookImage);
            thisBook.filters = document.querySelector(select.containerOf.filters)
        }

        initActions() {
            const thisBook = this;


            thisBook.container.addEventListener('click', function (event) {
                event.preventDefault();
            });

            thisBook.container.addEventListener('dblclick', function (event) {
                event.preventDefault();

                if (event.target.offsetParent.classList.contains('book__image')) {
                    event.target.offsetParent.classList.toggle('favorite');


                    const booksImageId = event.target.offsetParent.getAttribute('data-id');
                    if (favoriteBooks.includes(booksImageId)) {
                        const indexId = favoriteBooks.indexOf(booksImageId);
                        favoriteBooks.splice(indexId, 1);
                    } else {
                        favoriteBooks.push(booksImageId);
                    }
                }
            });



            thisBook.filters.addEventListener('click', function (event) {

                const filter = event.target;
                if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
                    if (filter.checked == true) {
                        filters.push(filter.value);
                    } else if (!filter.checked) {
                        const filterId = filters.indexOf(filter.value);
                        filters.splice(filterId, 1);
                    }
                }
                thisBook.filterBooks();
            });
        }

        filterBooks() {
            const bookId = [];

            for (const book of dataSource.books) {

                let shouldBeHidden = false;

                for (const filter of filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        bookId.push(book.id);
                        break;
                    }
                }

                if (shouldBeHidden == true) {
                    const bookImage = document.querySelector('[data-id="' + book.id + '"]');
                    bookImage.classList.add('hidden');
                } else if (shouldBeHidden == false) {
                    const bookImage = document.querySelector('[data-id="' + book.id + '"]');
                    bookImage.classList.remove('hidden');
                }
            }
        }

        determineRatingBgc(rating) {
            let ratingBgc = '';
            if (rating < 6) {
                ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';

            } else if (rating > 6 && rating <= 8) {
                ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

            } else if (rating > 8 && rating <= 9) {
                ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';

            } else if (rating > 9) {
                ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

            }
            return ratingBgc;

        };
    }

    const app = new BooksList();

}