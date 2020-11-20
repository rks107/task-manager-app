import React from 'react';

const Navbar = () => {
    return (
      <div className='navbar'>
        <div className='navbar__icon'>Task Manager</div>
        <div className='navbar__profile'>
          <p>Rohit Kumar</p>
          <img
            src='https://lh3.googleusercontent.com/ogw/ADGmqu-MDYaezdVbDkNNg76rZUx8ld3U7ErQMw7C8ORxgA=s32-c-mo'
            alt='profile-image'
          />
        </div>
      </div>
    );
};

export default Navbar;