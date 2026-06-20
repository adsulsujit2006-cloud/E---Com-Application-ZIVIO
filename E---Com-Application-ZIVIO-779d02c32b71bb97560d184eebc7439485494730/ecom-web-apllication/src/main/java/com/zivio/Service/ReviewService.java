package com.zivio.Service;

import java.util.List;

import com.zivio.model.Product;
import com.zivio.model.Review;
import com.zivio.model.User;

import com.zivio.request.CreateReviewRequest;

public interface ReviewService {
    Review createReview(CreateReviewRequest req, User user, Product product);

    List<Review> getReviewsByProductId(Long productId);

    Review updateReview(Long reviewId, String reviewText, double rating, Long userId);

    void deleteReview(Long reviewId, Long userId);

    Review getReviewById(Long reviewId);

}
