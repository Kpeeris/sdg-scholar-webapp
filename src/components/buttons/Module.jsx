import { Link } from "react-router-dom";

const Module = () => {
  return (
    <div>
      <Link to="/sdg11">
        <button style={{ height: "250px", width: "250px", color: "CBD5E1" }}>
          <p style={{ color: "#FFF6F4" }}>
            SDG 11: <br />
          </p>
          <ntext style={{ color: "#FFF6F4" }}>
            Make cities and human settlements inclusive,
            <br />
            safe, resilient and sustainable
          </ntext>
        </button>
      </Link>
    </div>
  );
};

export default Module;
