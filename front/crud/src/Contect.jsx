import React from "react";
import "./Contect.css";

function Contact({ contacts }) {
  return (
    <>
      <div className="container my-5">
        {contacts.map((data) => (
          <div key={data._id} className="bg-black my-3 p-3" id="map">
            <div>
              <h4>
                {<i class="fa-regular fa-user"></i>}
                {data.username}
              </h4>
              <h4>
                {<i class="fa-regular fa-envelope"></i>}
                {data.email}
              </h4>
              <h4>
                {<i class="fa-solid fa-key"></i>}
                {data.password}
              </h4>
            </div>
            <div id="buton">
              <button type="button" class="btn btn-primary">
                EDIT
              </button>
              <button type="button" class="btn btn-danger">
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Contact;
