import React, { useContext } from 'react';
import UserContext from './UserContext';
import './Profile.css';
import { NavLink } from 'react-router';

const Profile = () => {
  // Grab the user data from context
  const { user } = useContext(UserContext);

  // If there is no user in context, they aren't logged in
  if (!user || !user.username) {
    return (
      <div className="profile-container">
        <div className="profile-card no-user">
          <h2>Welcome!</h2>
          <p>Please <NavLink to='/Login'>login</NavLink> to view your profile.</p>
        </div>
      </div>
    );
  }

  // If user exists, display their profile card
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-container">
          {/* A common, default avatar image */}
          <img 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            alt="Default Profile" 
            className="profile-image" 
          />
        </div>
        
        <div className="profile-info">
          <h2>User Profile</h2>
          <div className="info-group">
            <span className="label">Username:</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="info-group">
            <span className="label">Status:</span>
            <span className="value active-status">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;