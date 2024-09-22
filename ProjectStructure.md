.
├── src/ 
│   ├── assets (anything not js)
│   │   ├──icons/
│   │   │   ├──icons
│   │   ├──images/
│   │   └──logo/
│   ├── components/             # global or reusable components
│   │   ├──ui/                  # small ui primitives
│   │   ├──Navbar.jsx           # reusable components made up of smaller components 
│   │   └──SideMenu.jsx...
│   ├── layouts/                # app layouts
│   │   ├── Layout.jsx          # layout for all pages of the app, contains padding and navbar
│   │   └── TwoColumnLayout.jsx..
│   ├── lib/
│   │   ├──utils.js
│   ├── pages/
│   │   ├── login/              # folder for a specific feature
│   │   │   ├── components/     # components specific to login feature
│   │   │   ├── Login.jsx       # main code that gets rendered
│   │   │   ├── tests/          # for future purposes
│   │   └── signup...
│   ├── App.jsx
│   ├── index.css               # styling for every page, e.g. typography
│   ├── Main.jsx

