import React from 'react';

//components
import Welcome from 'components/Main/Welcome/Welcome';
import GrandMaster from 'components/Main/GrandMaster/GrandMaster';
import AdditionalResources from 'components/Main/AdditionalResources/AdditionalResources';

const Main = () => {
    return (
        <div>
            <Welcome />
            <GrandMaster />
            <AdditionalResources />
        </div>
    );
};

export default Main;
