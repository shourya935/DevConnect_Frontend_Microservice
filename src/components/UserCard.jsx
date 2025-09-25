import React from "react";

function UserCard({ user }) {
  console.log(user);
  const { firstName, age, about, skills, photoURL } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={user.photoURL}
          alt="USser Profile"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName}</h2>
        <p>
          {user.about}
        </p>
        <p>
          {user.skills}
        </p>
         <div className="card-actions justify-center my-4">
          <button className="btn btn-primary"  >
            Skip
          </button>
          <button className="btn btn-secondary" >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
