import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dropdown.css";
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownMenu() {
    return (
        <Dropdown>
            <Dropdown.Toggle className="custom-dropdown-toggle" id="dropdown-basic">
                Goals
            </Dropdown.Toggle>

            <Dropdown.Menu className='scrollable-dropdown'>
                {goalsDropdown.map((item, index) => {
                    return (
                        <Dropdown.Item as={Link} to={item.path} key={index}>
                            {item.title}
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}
const goalsDropdown = [
    {
        id: 1,
        title: "1 No Poverty",
        path: "",
        cName: "submenu-item",
    },
    {
        id: 2,
        title: "2 Zero Hunger",
        path: "",
        cName: "submenu-item",
    }, {
        id: 3,
        title: "3 Good Health and Well-being",
        path: "",
        cName: "submenu-item",
    }, {
        id: 4,
        title: "4 Quality Education",
        path: "",
        cName: "submenu-item",
    },
    {
        id: 5,
        title: "5 Gender Equality",
        path: "",
        cName: "submenu-item",
    }, {
        id: 6,
        title: "6 Clean Water and ",
        path: "",
        cName: "submenu-item",
    }, {
        id: 7,
        title: "7 Affordable and Clean Energy",
        path: "",
        cName: "submenu-item",
    }, {
        id: 8,
        title: "8 Decent Work and Economic Growth",
        path: "",
        cName: "submenu-item",
    }, {
        id: 9,
        title: "9 Industry, Innovation and Infrastructure",
        path: "",
        cName: "submenu-item",
    }, {
        id: 10,
        title: "10 Reduce Inequalities",
        path: "",
        cName: "submenu-item",
    }, {
        id: 11,
        title: "11 Sustainable Cities and Communities",
        path: '/sdg11',
        cName: "submenu-item",
    }, {
        id: 12,
        title: "12 Responsible Consumption and Production",
        path: "",
        cName: "submenu-item",
    }, {
        id: 13,
        title: "13 Climate Action",
        path: "",
        cName: "submenu-item",
    }, {
        id: 14,
        title: "14 Life Below Water",
        path: "",
        cName: "submenu-item",
    }, {
        id: 15,
        title: "15 Life on Land",
        path: "",
        cName: "submenu-item",
    }, {
        id: 16,
        title: "16 Peace, Justice and Strong Institutions",
        path: "",
        cName: "submenu-item",
    }, {
        id: 17,
        title: "17 Partnerships for the Goals",
        path: "",
        cName: "submenu-item",
    }

]

export default DropdownMenu;