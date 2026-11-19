# Project 8: Around The U.S. (OOP Refactoring & Webpack)

### Overview
An interactive social media web application where users can edit their profile details, add new photo cards, like or delete cards, and preview full-size images in a modal. In this project, i refactored this code into modular Object-Oriented Programming (OOP) and bundled with Webpack.

### Key Technologies & Architecture
* **HTML5 & CSS3 (BEM Methodology):** Responsive layout using Flexbox, CSS Grid, and flat BEM file organization.
* **Object-Oriented JavaScript (ES6 Modules):**
  * `Card`: Generates card elements and manages like/delete interactions.
  * `FormValidator`: Validates form inputs in real time and resets validation states when modals open.
  * `Section`: Renders lists of items into a specified DOM container.
  * `Popup`, `PopupWithImage`, & `PopupWithForm`: Manages modal visibility, keyboard (`Escape`) and overlay closing, image previews, and form submissions through class inheritance.
  * `UserInfo`: Manages reading and updating user profile data on the page.
* **Webpack:** Bundles JavaScript modules, CSS stylesheets, and image assets for production.

### How to Run Locally
1. Clone the repository: `git clone https://github.com`
2. Install dependencies: `npm install`
3. Start the local development server: `npm run dev`
