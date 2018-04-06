"use strict";

class Review {
    constructor(reviewId, reviewText, reviewAuthor, reviewDate, reviewVerified) {
        this.reviewId = reviewId;
        this.reviewText = reviewText;
        this.reviewAuthor = reviewAuthor;
        this.reviewDate = reviewDate;
        this.reviewVerified = reviewVerified;
    }

    render(container) {
        let review;

        if (this.reviewVerified) {
            review = $('<article />', {
                class: 'review_item verified'
            });
        }

        if (!this.reviewVerified) {
            review = $('<article />', {
                class: 'review_item'
            });
        }

        let reviewText = $('<p />', {
            class: 'review_text',
            text: this.reviewText
        });

        let reviewAuthor = $('<p />', {
            class: 'review_author',
            text: this.reviewAuthor
        });

        let reviewDate = $('<p />', {
            class: 'review_date',
            text: this.reviewDate
        });

        let delReviewBtn = $('<button />', {
            class: 'del_review_btn',
            'data-id': this.reviewId,
            text: 'Удалить'
        });

        let modReviewBtn = $('<button />', {
            class: 'mod_review_btn',
            'data-id': this.reviewId,
            text: 'Модерация'
        });

        reviewText.appendTo(review);
        reviewAuthor.appendTo(review);
        reviewDate.appendTo(review);
        review.appendTo(container);
        modReviewBtn.appendTo(review);
        delReviewBtn.appendTo(review);

    }
}

const reviews = {
    reviewsCollection: [],

    init() {
        this.getReviewsFromJson();
    },

    getReviewsFromJson() {
        $.ajax({
            url: './responses/reviewsData.json',
            type: 'GET',
            dataType: 'json',
            context: this,
            success: function (result) {
                for (let i = 0; i < result.reviews.length; i++) {
                    this.reviewsCollection.push(result.reviews[i]);
                }
                this.render();
            }
        })
    },

    render() {
        let reviewsContainer = $('.reviews__container');
        for (let i = 0; i < this.reviewsCollection.length; i++) {
            new Review(this.reviewsCollection[i].id, this.reviewsCollection[i].text, this.reviewsCollection[i].author,
                this.reviewsCollection[i].date, this.reviewsCollection[i].verified)
                .render(reviewsContainer);
        }
    },

    addNewReview() {
        let review = $('#review');
        let name = $('#name');
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy;

        let newReview = {
            id: this.reviewsCollection.length + 1,
            text: review.val(),
            author: name.val(),
            date: today,
            verified: 0
        };
        this.reviewsCollection.unshift(newReview);
        this.refreshReviews();

        review.val('');
        name.val('');
    },

    delReview(reviewId) {
        for (let i = 0; i < this.reviewsCollection.length; i++) {
            if (this.reviewsCollection[i].id === +reviewId) {
                this.reviewsCollection.splice(i, 1);
            }
        }
        this.refreshReviews();
    },

    modReview(reviewId) {
        for (let i = 0; i < this.reviewsCollection.length; i++) {
            if (this.reviewsCollection[i].id === +reviewId) {
                if (this.reviewsCollection[i].verified) {
                    this.reviewsCollection[i].verified = 0
                } else if (!this.reviewsCollection[i].verified) {
                    this.reviewsCollection[i].verified = 1
                }
            }
        }
        this.refreshReviews();
    },

    refreshReviews() {
        $('.reviews__container').empty();
        this.render();
    }
};