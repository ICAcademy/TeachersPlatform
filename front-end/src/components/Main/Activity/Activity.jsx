import React from 'react';

// components
import Explanation from '../common/Explanation/Explanation';
import Title from '../common/Title/Title';
import Topic from '../common/Topic/Topic';
import Card from './Card/Card';
import { Button } from '@mui/material';
import Slider from "react-slick";

// styles
import styles from './Activity.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Arrow = ({ type, onClick }) => {
    let className = type === "next" ? "nextArrow" : "prevArrow";
    className += " arrow";
    return (
        <div className={type === "next" ? styles.next : styles.prev}>
            <Button className={className} onClick={onClick}>
                {type === "next" ? 'next' : 'prev'}
            </Button>
        </div>
    );
}
const Activity = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <Arrow type='next' />,
        prevArrow: <Arrow type='prev' />
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.topicContainer}>
                    <Topic topic={'ACTIVITY'} />
                </div>
                <div className={styles.titleContainer}>
                    <Title title={'Upcoming Activity'} />
                </div>
                <div className={styles.explanationContainer}>
                    <Explanation
                        explanation={'In this way public speaking & business are an important form of social proof. Social proof is one of two types of evidence.'}
                    />
                </div>
                <div className={styles.sliderContainer}>
                    <Slider {...settings}>
                        <div>
                            <Card />
                        </div>
                        <div>
                            <Card />
                        </div>
                        <div>
                            <Card />
                        </div>
                        <div>
                            <Card />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Activity;
