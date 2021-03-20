import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col } from 'react-bootstrap';

const VideosScreen = () => {
  const reactLink = {
    textDecoration: 'none',
  };

  const [videoTitle, setVideoTitle] = useState('');
  let [videos, setVideos] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setVideoTitle(e.target.value.toLowerCase());
  };

  if (videoTitle.length > 0) {
    videos = videos.filter((u) => {
      return u.name.toLowerCase().match(videoTitle);
    });
  }

  const getVideos = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`http://localhost:5000/videos`, config);
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      <Form>
        <Form.Group controlId='video'>
          <Form.Control
            type='videoTitle'
            placeholder='Search for videos'
            value={videoTitle}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
      </Form>

      <Row>
        {videos &&
          videos.map((video) => (
            <Col key={video.id} sm={12} md={6} lg={4} xl={4}>
              <Link to={`videos/${video.name}`} style={reactLink}>
                <div className='my-3 p-1 rounded'>
                  <video
                    src={`videos/${video.name}`}
                    width='100%'
                    height='100%'
                  />
                  <p>{video.name.substring(0, video.name.lastIndexOf('.'))}</p>
                </div>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default VideosScreen;
