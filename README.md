# SDG Scholar
**SDG Scholar** is an interactive web application designed to educate users, particularly students, about the United Nations Sustainable Development Goals (SDGs) through educational resources and quizzes. Authorized users, such as admins, can make announcements and manage SDG-related content and quizzes, providing student learning flexibility.

You can view our current deployed project at [SDG Scholar](https://sdg-scholar-webapp.vercel.app). 

### Motivation
This project was created to enhance SDG education and engage students in areas where awareness is lacking. Since many believe that SDGs only focus on sustainability, we aimed to highlight their broader scope and application. Through SDG Scholar, we hope to encourage students to actively participate in initiatives that contribute to achieving the SDGs by 2030.

### Project Status
SDG Scholar is still under development with the current version focusing on **SDG 11: Sustainable Cities and Communities**. Users can explore SDG 11 target-specific content through a city-scape view. Future developments should include the other SDGs and replacing the text editor ReactQuill as it will be removed soon.

### Tech Stack
SDG Scholar is built with React and Vite, using Tailwind CSS for styling, Firebase for backend services (e.g. authentication, storage, Firestore), and Node.js for server-side functionality.

## Features of SDG Scholar
- **Two Types of Accounts** 
  - **Learner Account:** An account for learners to read content, complete quizzes and view notices.
  - **Admin Account:** An account for educators who can edit content, create questions and post notices.
- **Authentication:** Users can login, sign up as an admin or learner, reset their password, and logout. Users need a code provided by a Super Admin to create an admin account.
- **Gamified SDGs**: Each SDG has a dedicated unique "world", where learners can access quizzes and content dedicated to each target specific to that SDG. They can complete quizzes to unlock new places and track their progress. 
- **Content:** A visually appealing place to deliver content specific to each SDG target, which admins can customise to their liking through a text editor.
- **Quiz:** An interactive element where learners can test their SDG knowledge and are rewarded by unlocking buildings on the SDG pages. Also customisable by admins who can add and delete their own questions.
- **Notice Board:** This is a place where admins can create posts to interact with learners, inform them about changes to content and quizzes, and promote community initiatives that students can take part in.
  
## Installation
```bash
# Clone the repository
git clone https://github.com/Kpeeris/sdg-scholar-webapp.git
cd sdg-scholar-webapp

# Create a new file in the project root called .env and paste in the API key
# Please contact our team for the API key

# Install dependencies
npm install

# Run the development server
npm run dev
# This will run the app locally at http://localhost:5173/
# You can type in control-c to stop running the server
```
## Testing 
We use the Vitest framework and Firebase emulators for testing. Github Actions is also set up for Continuous Integration, allowing tests to run on every push to the repository.

To run the tests locally:
```bash
#Ensure you have Firebase CLI installed [you do not need to be logged into firebase]
npm install -g firebase-tools

# Start Firebase emulator locally
firebase emulators:start 
# (You can type in control-c to stop when you're done testing)

# [While runs in the background open new Terminal session] run the tests
npm run test 

# or alternativle to see the UI representation of the tests
npm run test:ui
```

## Deployment
SDG Scholar is deployed on Vercel using the Hobby Plan. Vercel produces preview deployments on every push to the repository, allowing Continuous Deployment. The production deployment is manually promoted from the most successful preview. You can view the production deployment at [SDG Scholar](https://sdg-scholar-webapp.vercel.app).

## Acknowledgements
### Contributors

<a href="https://github.com/kashmain"><img src="https://avatars.githubusercontent.com/kashmain" width="50" /></a>
<a href="[https://github.com/kaylynthomson]"><img src="https://avatars.githubusercontent.com/kaylynthomson" width="50" /></a>
<a href="https://github.com/Kpeeris"><img src="https://avatars.githubusercontent.com/Kpeeris" width="50" /></a>
<a href="https://github.com/dithintheafternoon"><img src="https://avatars.githubusercontent.com/dithintheafternoon" width="50" /></a>


### Illustrations
Illustrations used on the web app are sourced from www.freepik.com

### License
SDG Scholar is licensed under the [MIT license](./LICENSE).

## Documentation
- [Handover Document](https://docs.google.com/document/d/1fY1Xld4gUUpzjbIbqShKZU_IQcBm6t7rfoudCp5yZBE/edit?usp=drive_link) (You must request access to view)
- [Figma Prototype](https://www.figma.com/design/zY7Qoh3CEZ3I6ZGZddFmII/Design?node-id=572-1250&t=AhUTOjv8t24JwThK-1)
