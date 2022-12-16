import React from 'react';

// Components
import Header from 'components/common/Header/Header';
import Welcome from 'components/Main/Welcome/Welcome';
import GrandMaster from 'components/Main/GrandMaster/GrandMaster';
import AdditionalResources from 'components/Main/AdditionalResources/AdditionalResources';
import DegreeProgram from 'components/Main/DegreeProgram/DegreeProgram';
import Activity from 'components/Main/Activity/Activity';
import Teacher from 'components/Main/Teacher/Teacher';
import Footer from 'components/common/Footer/Footer';

// styles
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.container}>
      <Header />
      {/* <Welcome />
      <GrandMaster />
      <AdditionalResources />
      <DegreeProgram />
      <Activity />
      <Teacher />
      <Footer /> */}
    </div>
  );
};

export default Main;
