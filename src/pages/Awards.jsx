import React from "react";
import { Link, NavLink } from "react-router-dom";

const Awards = () => {
  return (
    <div>
      <Link to="/awards">
        <button>
          <p style={{ color: "#FFF6F4" }}>
            {" "}
            Awards <br />
          </p>
        </button>
      </Link>
    </div>
  );
};

export default Awards;
