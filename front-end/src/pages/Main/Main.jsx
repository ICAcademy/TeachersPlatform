import React, { useState } from 'react';

// Components
import Header from 'components/common/Header/Header';
import Welcome from 'components/Main/Welcome/Welcome';
import GrandMaster from 'components/Main/GrandMaster/GrandMaster';
import AdditionalResources from 'components/Main/AdditionalResources/AdditionalResources';
import DegreeProgram from 'components/Main/DegreeProgram/DegreeProgram';
import Activity from 'components/Main/Activity/Activity';
import Teacher from 'components/Main/Teacher/Teacher';
import Footer from 'components/common/Footer/Footer';
import MobileHeader from 'components/common/MobileHeader/MobileHeader';

// styles
import styles from './Main.module.scss';
import AligningMobileHeader from 'components/common/AligningMobileHeader/AligningMobileHeader';

const Main = () => {
  const [open, setOpen] = useState(false);

  const showSidebarHandler = (state) => {
    setOpen(state);
  };

  return (
    <div>
      <div className={styles.container}>
        <AligningMobileHeader />
        <Header />
        <Welcome />
        <GrandMaster />
        <AdditionalResources />
        <DegreeProgram />
        <Activity />
        <Teacher />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
