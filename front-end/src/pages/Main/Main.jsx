import React from 'react';

//components
import Welcome from 'components/Main/Welcome/Welcome';
import GrandMaster from 'components/Main/GrandMaster/GrandMaster';
import AdditionalResources from 'components/Main/AdditionalResources/AdditionalResources';
import DegreeProgram from 'components/Main/DegreeProgram/DegreeProgram';
import Activity from 'components/Main/Activity/Activity';
import Teacher from 'components/Main/Teacher/Teacher';

const Main = () => {
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

export default Main;
