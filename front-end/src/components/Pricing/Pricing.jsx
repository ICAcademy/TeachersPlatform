import React, { useState, useEffect, useContext } from 'react';

//Services
import { getAllPricing } from 'services/pricingService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Components
import TeacherSelect from './TeacherSelect/TeacherSelect';
import PricingCard from './PricingCard/PricingCard';

// Styles
import styles from './Pricing.module.scss';

const Pricing = () => {
  const [pricing, setPricing] = useState([]);
  const [teacher, setTeacher] = useState('');
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

  const getPricing = async () => {
    try {
      const pricing = await getAllPricing();
      setPricing(pricing);
    } catch (error) {
      return error;
    }
  };

  const userData = {
    userId: currentUser._id,
    fullName: currentUser.fullName,
  };

  const handleTeacher = (teacher) => {
    setTeacher(teacher);
  };

  useEffect(() => {
    getPricing();
  }, []);

  const pricingCards = isAuthenticated && currentUser.role === 'student' && (
    <>
      <TeacherSelect user={currentUser} chooseTeacher={handleTeacher} teacher={teacher} />
      <div className={styles.pricing}>
        {pricing.map((item) => (
          <PricingCard key={item._id} pricing={item} user={userData} teacher={teacher} />
        ))}
      </div>
    </>
  );

  return pricingCards;
};

export default Pricing;
