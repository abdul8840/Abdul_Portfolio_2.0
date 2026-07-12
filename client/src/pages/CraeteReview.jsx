import { Button, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import '../App.css'

const CreateReview = () => {
  const {currentUser} = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/rating/createrating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser._id,
          rating: formData.rating,
          review: formData.review,
        }),
      });
      const data = await res.json();
      if(res.ok){
        setFormData('')
      }
      if (!res.ok) {
        setPublishError(data.message || 'Something went wrong');
      } else {
        setPublishError(null);
        navigate('/');
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: parseInt(e.target.value) });
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create Review
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <fieldset className="starability-slot mt-10">
            <h1 className="text-xl mb-2 font-bold">Give Stars :</h1>
            <input type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" aria-label="No rating." onChange={handleRatingChange} />
            <input type="radio" id="first-rate1" name="rating" value="1" onChange={handleRatingChange} />
            <label htmlFor="first-rate1" title="Terrible">1 star</label>
            <input type="radio" id="first-rate2" name="rating" value="2" onChange={handleRatingChange} />
            <label htmlFor="first-rate2" title="Not good">2 stars</label>
            <input type="radio" id="first-rate3" name="rating" value="3" onChange={handleRatingChange} />
            <label htmlFor="first-rate3" title="Average">3 stars</label>
            <input type="radio" id="first-rate4" name="rating" value="4" onChange={handleRatingChange} />
            <label htmlFor="first-rate4" title="Very good">4 stars</label>
            <input type="radio" id="first-rate5" name="rating" value="5" onChange={handleRatingChange} />
            <label htmlFor="first-rate5" title="Amazing">5 stars</label>
          </fieldset>
        </div>
        <h1 className="text-xl my-2 font-bold">Write Something :</h1>
        <Textarea
          id="review"
          type="text"
          className="mt-3"
          placeholder="Write Your Review"
          required={true}
          rows={8}
          onChange={(e) => {
            setFormData({ ...formData, review: e.target.value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Create Review
        </Button>
        {publishError && <div className='mt-5 text-red-600'>{publishError}</div>}
      </form>
    </div>
  );
};

export default CreateReview;
