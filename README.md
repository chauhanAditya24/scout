# SCOUT ⚽🏀🏐🎱🏏🏓🎾
Scout is a full-stack app, where primary objective of the project was to develop a website that facilitates the connection of sports enthusiasts with others who share their passion in close proximity or within a different city. This platform was designed to enable users to arrange sporting activities collaboratively. Furthermore, it offered a registration feature for ground and turf owners to list their facilities, allowing users to reserve them for their matches and events.
## 🛠 Tech Stack - (MERN)
- 💻 JavaScript | ES6
- 🌐 ReactJS | ExpressJS | NodeJS | MongoDB
- 🔧 Git | Markdown
- 📦 [bcrypt.js](https://www.npmjs.com/package/bcryptjs), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose), [redux](https://github.com/reduxjs/redux), [react-redux](https://www.npmjs.com/package/react-redux), [react-router-dom](https://www.npmjs.com/package/react-router-dom), [dotenv](https://www.npmjs.com/package/dotenv), [cors](https://www.npmjs.com/package/cors), [validator](https://www.npmjs.com/package/validator), [multer](https://www.npmjs.com/package/multer), [axios](https://www.npmjs.com/package/axios), [react-google-charts](https://www.npmjs.com/package/react-google-charts), [redux-thunk](https://github.com/reduxjs/redux-thunk).

### Demo
- User
  
https://github.com/chauhanAditya24/scout/assets/138465775/572a199a-6900-4a73-8f50-64f089fa61fe

---
- Owner
  
  https://github.com/chauhanAditya24/scout/assets/138465775/d6a26675-ae92-4ecd-a837-38ffa2b6a6ea

---
- Admin

  https://github.com/chauhanAditya24/scout/assets/138465775/89068407-f504-49a5-bd82-5bebf64e1c19
  
---
- Detail's Update

  https://github.com/chauhanAditya24/scout/assets/138465775/2962e2d1-f08a-4d11-84e0-64fbb6bc0f7a

---

- Booking

https://github.com/chauhanAditya24/scout/assets/138465775/90040b3d-3e9a-49d8-bf8b-61d0bcbc52f7

- Email and Booking List

  ![email_confirmation](https://github.com/chauhanAditya24/scout/assets/138465775/55a855fb-7f0b-4fd1-b20d-4962b19bb2fa)
![booking list](https://github.com/chauhanAditya24/scout/assets/138465775/f76472d8-e356-48af-bfe6-3515c001bb57)

  
---

- Messaging Feature

  https://github.com/chauhanAditya24/scout/assets/138465775/06163f2f-155f-448e-90d0-4ced3b42ae82

- Group Chat

  https://github.com/chauhanAditya24/scout/assets/138465775/94c5ed9d-e25c-4aa2-bebe-e69e89995235


---
### Features

- Authentication
  - User must signup and signin to verify their identity to use the application.
  - Bcryptjs and JWT used for authentication.
  - Role management is implemented.
- Player's Module
  - Authenticated players can perform CURD operations on the players module.
  - Authenticated players can interact with other player with the help of whatsapp.
  - Authenticated players can book properties/grounds.
  - Authenticated players can cancel their bookings.
- Owner's Module
  - Authenticated owners can perform CURD operations on the owners module.
  - Authenticated owners can list their peroperties in the app.
  - Authenticated owners can view all his bookings.
- Admin's Module
  - Authenticated admin can perform CURD operations on the players and owners module.
  - Authenticated admin can view all the users.
  - Authenticated admin can view stats with respect to the city and sport.
- Visualization of data
  - Use of react-google-charts for visualization.
  - Users stats are shown to the admin in the form of a pie chart.
- Pagination
  - PLayers and Owners all can be listed in a page format with specific users in a particular page.
- Search Bar
  - Search bar is available to the admin to find a specific user.
- Slot validation
  - A player desire to book a slot of a ground/property can check the availablity with comparision of date and time for a particular property.
- Connection
  - Users can connect with each other on a single click via whatsapp.

### Backend 
  - [scout-backend](https://github.com/chauhanAditya24/scout-backend)

### Contributors
  - [Aditya Chauhan](https://github.com/chauhanAditya24)
