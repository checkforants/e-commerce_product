import React from 'react';
import {HandySvg} from 'handy-svg';
import iconSrc from './icon-plus.svg';
const Plus = () => {
	return (    
	<HandySvg
        src={iconSrc}
        className="icon"
        width="30"
        height="30"
    />
	);
};

export default Plus;
