
import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
          <Link as={Link} to="/events">
              Go to Events
          </Link>
        </div>
    )
}

export default HomePage;