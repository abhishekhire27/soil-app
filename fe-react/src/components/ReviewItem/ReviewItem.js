import { useState, useEffect } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import StarRatings from 'react-star-ratings';
import { saveReview } from "../../services/review.services";
import { useToast } from "../../components/Toaster/ToastContext";
import { useNavigate } from 'react-router-dom';
import './ReviewItem.css';

function ReviewItem({ path, item }) {
    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [newReviewText, setNewReviewText] = useState("");
    const [newReviewStars, setNewReviewStars] = useState(0);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            const userReview = item.reviews.find(review => review.userId === user.userId);
            if (userReview) {
                setHasReviewed(true);
                setNewReviewStars(userReview.starRating);
                setNewReviewText(userReview.reviewText);
            }
        }
    }, [item.reviews, user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleReviewSubmit = async () => {

        if (newReviewStars < 1) {
            addToast("Please give the star rating")
        }
        else {
            let reviewData = {}

            if(isEditing){
                const userReview = item.reviews.find(review => review.userId === user.userId);
                reviewData = {
                    "reviewId": userReview.reviewId,
                    "reviewText": newReviewText,
                    "starRating": newReviewStars,
                    "itemId": item.itemId,
                    "userId": user.userId
                }
            }
            else{
                reviewData = {
                    "reviewText": newReviewText,
                    "starRating": newReviewStars,
                    "itemId": item.itemId,
                    "userId": user.userId
                }
            }
            
            try {
                await saveReview(reviewData);
                addToast("Review Added successfully", { appearance: 'success' });
                setIsEditing(false);
                setHasReviewed(true)
            }
            catch (error) {
                addToast("Fail to add review");
            }
        }
    }

    const handleDropdownToggle = () => {
        setIsDropdownOpen(prevState => !prevState);
    };


    return (
        <>
            <button onClick={handleDropdownToggle} className="btn btn-secondary mt-2">
                {isDropdownOpen ? 'Hide Reviews' : 'Show Reviews'}
            </button>
            {isDropdownOpen && (
                <div className="reviews mt-3 ms-2">
                    <h6>Reviews:</h6>
                    {item.reviews.length > 0 ? (
                        item.reviews.map(review => (
                            <div key={review.reviewId} className="review mb-2 comment-box">
                                <p><strong>{review.user.name}:</strong> {review.reviewText}</p>
                                <p>Rating: {review.starRating} / 5</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            )}

            {user && (
                <div className="mt-3 ms-2">
                    <h6>Add Your Review:</h6>
                    {hasReviewed && !isEditing ? (
                        <div className="alert alert-info">
                            <p>You have already reviewed this item.</p>
                            <p><strong>Your Review:</strong> {newReviewText}</p>
                            <p>Rating: {newReviewStars} / 5</p>
                            <button onClick={handleEditClick} className="btn btn-secondary">
                                Edit Review
                            </button>
                        </div>
                    ) : (
                        <>
                            <StarRatings
                                rating={newReviewStars}
                                starRatedColor="blue"
                                changeRating={setNewReviewStars}
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                            />
                            <textarea
                                name="reviewText"
                                value={newReviewText}
                                onChange={(e) => setNewReviewText(e.target.value)}
                                className="form-control mb-2 mt-2"
                                placeholder="Enter your review"
                                maxLength={100}
                            />
                            <button
                                onClick={handleReviewSubmit}
                                className="btn btn-primary mb-3"
                            >
                                Submit Review
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default ReviewItem;