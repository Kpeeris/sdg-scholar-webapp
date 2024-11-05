# SDG Scholar
**SDG Scholar** is an interactive web application designed to educate users about the United Nations Sustainable Development Goals (SDGs) through educational resources and quizzes. Authorized users, such as admins, can make announcements and manage SDG-related content, providing student learning flexibility.

You can view our current deployed project at [SDG Scholar](https://sdg-scholar-webapp.vercel.app). 

### Motivation
This project was created to enhance SDG education and engage students in areas where awareness is lacking. Since many believe that SDGs only focus on sustainability, we aimed to highlight their broader scope and application. Through SDG Scholar, we hope to encourage students to actively participate in initiatives that contribute to achieving the SDGs by 2030.

### Project Status
SDG Scholar is still under development with the current version focusing on **SDG 11: Sustainable Cities and Communities**. Users can explore SDG 11 target-specific content through a city-scape view. Future developments should include the other SDGs and new features (e.g. awards/badges) to improve the learning experience.

### Tech Stack
SDG Scholar is built with React and Vite, using Tailwind CSS for styling, Firebase for backend services (e.g. authentication, storage, Firestore), and Node.js for server-side functionality.

## Features of SDG Scholar
- #### Two Types of Accounts 
  - **Learner Account:** An account for learners to read content, complete quizzes and view notices.
  - **Admin Account:** An account for educators who can edit content, create questions and post notices.
- #### Gamified Educational Content
  
  Each SDG will have a dedicated page, where learners will be able to access quizzes and content dedicated to each target specific to that SDG. At the moment only the SDG 11 page is functional with an interactive cityscape.
  - **Content:** A visually appealing place to deliver content specific to each target of a given SDG which Admins are able to customise to their liking by adding images, links and styling text.  
  - **Quiz:** An interactive element where learners can test the knowledge they gained from the content and are rewarded by unlocking buildings in the SDG 11 page. Also customisable by admins who can add and delete their own questions.
- #### Notice Board
  
  This is a place where admins can create posts to interact with learners, inform them about changes to content and quizzes, and promote community initiatives that students can take part in.
  
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
We use the Vitest framework for testing as it complements Vite. Additionally, some of our unit tests use firebase emulators which require the firebase CLI in order to operate. 

To run the tests locally:
```bash
#Ensure you have firebase CLI installed [you do not need to be logged into firebase]
npm install -g firebase-tools

# Start Firebase emulator locally
firebase emulators:start 
# (You can type in control-c to stop when you're done testing)

# [While runs in the background open new Terminal session] run the tests
npm run test 

# or alternativle to see the UI representation of the tests
npm run test:ui
```
We also have a functional CI pipeline so the tests will run on every push to the repository 

## Deployment
SDG schollar is deployed on Vercel using the hobby plan. Vercel produces preview deplyments on every push to the repositiory taking care of Continuos Deplyment for us. The production deployment is manually promoted from the most successful preview. You can view the production deplyment at [SDG Scholar](https://sdg-scholar-webapp.vercel.app).

## Acknowledgements
### Authors
SDG Scholar was developed by [Kashmain](https://github.com/kashmain), [Kaylyn](https://github.com/kaylynthomson), [Keerthana](https://github.com/Kpeeris), and [Sarah](https://github.com/dithintheafternoon).

### Illustrations
Illustrations used on the web app are sourced from www.freepik.com

## License
This project is licensed under the [MIT license](./LICENSE).
