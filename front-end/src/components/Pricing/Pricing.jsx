import React, { useState, useEffect, useContext } from 'react';

//Services
import { getAllPricing } from 'services/pricingService';
import { getStudentSubscription } from 'services/subscriptionService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Components
import TeacherSelect from './TeacherSelect/TeacherSelect';
import PricingCard from './PricingCard/PricingCard';
import NoTeachers from './NoTeachers/NoTeachers';

// Styles
import styles from './Pricing.module.scss';

// Constants
import { STUDENT_ROLE } from 'constants/userRoles';

const Pricing = () => {
  const [pricing, setPricing] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const fetchSubscriptions = async (id) => {
    try {
      setIsLoading(true);
      const subscriptions = await getStudentSubscription(id);
      setTeachers(subscriptions);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

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
    fetchSubscriptions(currentUser.roleId);
  }, [currentUser.roleId]);

  return (
    currentUser.role === STUDENT_ROLE &&
    !isLoading && (
      <>
        {teachers.length > 0 ? (
          <TeacherSelect
            user={currentUser}
            chooseTeacher={handleTeacher}
            teacher={teacher}
            teachers={teachers}
          />
        ) : (
          <NoTeachers />
        )}

        <div className={styles.pricing}>
          {pricing.map((item) => (
            <PricingCard key={item._id} pricing={item} user={userData} teacher={teacher} />
          ))}
        </div>
      </>
    )
  );
};

export default Pricing;
