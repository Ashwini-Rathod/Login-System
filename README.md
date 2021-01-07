# SignUp and Login System using React.

## Idea:

This project consists of a login page designed using react components for creating a login functionality. It also consists of Signup page which will help the new user to register first and then use the services.

### Backend:

Backend is designed using nodejs. Here, api endpoint are defined for signup and login. After successful login, the user will see a dummy page consisting of some dummy data. This dummy page is protected and hence, only the authenticated users will be able to access it after login.

#### Backend api enpoints supports the following operations:

1. Register: http://localhost:5000/users/register (This endpoint is designed for the new users to sign up).

2. Login: http://localhost:5000/users/login (This endpoint is designed for user login)

3. Dummy Page: http://localhost:5000/users/tasks (After successful login, the user gets directed to dummy page and the data of this page is fetched using the provided url)

### Frontend:

The UI of the application is designed using react. The routing to different pages is implemented using React Routing. The frontend consists of the following pages:

#### Home Page: 

The home page consists of options to either Register or Login to the application. The route used for the home page is "/".

#### Login Page:

The Login page asks the user to enter the email and password. In case of any wrong input by the user, there will be a pop of alert. If the email and password are correct, a post request is sent to the backend and if all the validations are successful, the user will be logged in successfully. After the succesful login, a cookie is set. This cookie is passed in authorization header of the dummy page. And hence the dummy page will be displayed only when the login is successful and the user is authorized. The route for the login page is "/login".

#### Register Page:

New users can register themselves using this page. The user will have to enter its email, password and confirm the password. As soon as the user clicks on resgiter button, a post request sent to the backend. After all the validations are checked, the user will get a message of "Successfully Registered". In case of some invalidations, the user will get the alert with relevent error messages. The route used for this page is "/register"

#### Not Found Page:

This page will be displayed in case of any invalid Url other than the routes defined in the Router.jsx file.

### Running the Application:

1. Clone the repository using

      https://github.com/Ashwini-Rathod/Login-System

2. Run this command only once:

      nmp install

To install all the dependencies.

3. Then run the command:

      npm run start

To start the React Server whenever you need to see the Webpage.

4. The Backend is hosted on Heroku.

[Link for Backend](https://signup-login-backend.herokuapp.com/)

5. The application is hosted on vercel.

The Live link for the same is: https://login-system-k8j0mb2ts.vercel.app/


 


