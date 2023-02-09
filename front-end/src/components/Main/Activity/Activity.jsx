import React from 'react';
import PropTypes from 'prop-types';

// components
import Explanation from '../common/Explanation/Explanation';
import Title from '../common/Title/Title';
import Topic from '../common/Topic/Topic';
import Card from './Card/Card';
import { Button } from '@mui/material';
import Slider from 'react-slick';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './Activity.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Arrow = ({ type, onClick }) => {
  let className = type === 'next' ? 'nextArrow' : 'prevArrow';
  className += ' arrow';
  return (
    <div className={type === 'next' ? styles.next : styles.prev}>
      <Button className={className} onClick={onClick}>
        {type === 'next' ? (
          <FontAwesomeIcon icon={faAngleRight} />
        ) : (
          <FontAwesomeIcon icon={faAngleLeft} />
        )}
      </Button>
    </div>
  );
};
const Activity = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow type='next' />,
    prevArrow: <Arrow type='prev' />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topicContainer}>
          <Topic topic={'ACTIVITY'} />

          <Title title={'Upcoming Activity'} />

          <div className={styles.explanationContainer}>
            <Explanation
              explanation={
                'In this way public speaking & business are an important form of social proof. Social proof is one of two types of evidence.'
              }
            />
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            <div>
              <Card
                data='8 nov'
                topic='Public Speaking in front of master'
                info='To get practice, seek opportunities to speak in front of others.'
              />
            </div>
            <div>
              <Card
                data='24 dec'
                topic='Business guide with Professional Mentor'
                info='Boost your confidence, as you have Expert to turn to for guidance and support.'
              />
            </div>
            <div>
              <Card
                data='14 jan'
                topic='Basic English'
                info='To get basic knowledge for newcomers.'
              />
            </div>
            <div>
              <Card
                data='8 nov'
                topic='Public Speaking in front of master'
                info='To get practice, seek opportunities to speak in front of others.'
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Activity;

Arrow.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};
