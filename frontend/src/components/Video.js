import React, { useState } from 'react';

const Video = ({ match }) => {
  const name = match.params.name;

  const [like, setLike] = useState(0);
  const [likeActive, setLikeActive] = useState(false);
  const [dislike, setDislike] = useState(0);
  const [dislikeActive, setDislikeActive] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    if (dislikeActive) {
      setLikeActive(!likeActive);
      setLike(likeActive ? like - 1 : like + 1);
      setDislikeActive(!dislikeActive);
      setDislike(dislikeActive ? dislike - 1 : dislike + 1);
    }
    setLikeActive(!likeActive);
    setLike(likeActive ? like - 1 : like + 1);
  };

  const handleDislike = (e) => {
    e.preventDefault();
    if (likeActive) {
      setDislikeActive(!dislikeActive);
      setDislike(dislikeActive ? dislike - 1 : dislike + 1);
      setLikeActive(!likeActive);
      setLike(likeActive ? like - 1 : like + 1);
    }
    setDislikeActive(!dislikeActive);
    setDislike(dislikeActive ? dislike - 1 : dislike + 1);
  };

  return (
    <div className='my-3 p-1 rounded'>
      <video src={name} width='100%' height='100%' controls />
      <p>{name.substring(0, name.lastIndexOf('.'))}</p>
      <button
        className='btn btn-primary-outline'
        onClick={(e) => handleLike(e)}
      >
        <i className={likeActive ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'} />
        {like}
      </button>
      <button
        className='btn btn-primary-outline'
        onClick={(e) => handleDislike(e)}
      >
        <i
          className={
            dislikeActive ? 'fas fa-thumbs-down' : 'far fa-thumbs-down'
          }
        />
        {dislike}
      </button>
    </div>
  );
};

export default Video;
