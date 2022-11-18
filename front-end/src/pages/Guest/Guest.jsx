import React from 'react';

//components
import Welcome from 'components/Guest/Welcome/Welcome';
import GrandMaster from 'components/Guest/GrandMaster/GrandMaster';
import AdditionalResources from 'components/Guest/AdditionalResources/AdditionalResources';
import DegreeProgram from 'components/Guest/DegreeProgram/DegreeProgram';
import Activity from 'components/Guest/Activity/Activity';
import Teacher from 'components/Guest/Teacher/Teacher';

const Guest = () => {
  return (
    <div>
      <Welcome />
      <GrandMaster />
      <AdditionalResources />
      <DegreeProgram />
      <Activity />
      <Teacher />
    </div>
  );
};

export default Guest;

