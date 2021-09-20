import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/free-solid-svg-icons';

const Nav = ({libraryStatus, setLibraryStatus}) => {
    return (
        <nav>
            <button onClick={() => setLibraryStatus(!libraryStatus)} >
                <h1>Just Music</h1>
                <FontAwesomeIcon icon={faDice} size={"2x"} />
            </button>
        </nav>
    )
}

export default Nav;