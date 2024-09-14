import React from "react";
import {Link, NavLink} from "react-router-dom"

const Awards = () => {
    return <div>
        <Link to='/awards'>
            <button>
                <nbtext style={{color: "#FFF6F4"}}> Awards <br /></nbtext>   
            </button>
        </Link>
    </div>
}

export default Awards