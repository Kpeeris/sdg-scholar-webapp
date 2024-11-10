.
├── src/                  # main source code of the project
│ ├── __tests__/          # all test files are here
│ │ ├── setup.js          # setup file for initializing test environment
│ │ ├── Login.test.jsx
│ │ ├── ...
│ │ └── Signup.test.jsx
│ ├── assets              #  non-javascript asset files
│ │ └──images/ 
│ ├── components/         # global or reusable components 
│ │ ├──ui/                # small ui primitives (usually shadcn components)
│ │ ├──Navbar/            # Reusable components specific to Navbar, composed of smaller components
│ │ ├── ...
│ │ └──SideMenu.jsx
│ ├── layouts/            # Layout components to structure pages
│ │ ├── Layout.jsx        # layout for all pages, contains padding and navbar 
│ │ └── TwoColumnLayout.jsx
│ ├── lib/ 
│ │ ├──utils.js 
│ ├── pages/ 
│ │ ├── login/            # folder for a specific feature 
│ │ │ ├── components/     # components specific to login feature 
│ │ │ ├── Login.jsx       # main code that gets rendered 
│ │ ├── ...
│ │ └── signup
│ ├── routes/             # Routing components for handling app access
│ │ ├── PrivateRoute.jsx  # Route for authenticated users only
│ │ └── PublicRoute.jsx   # Route for non-authenticated users
│ ├── App.jsx             # Main App component that sets up routing and context
│ ├── AuthProvider.jsx    # Context provider for handling user authentication state
│ ├── index.css           # Global css file 
│ ├── Main.jsx

