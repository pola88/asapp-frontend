# ASAPP Challenge

This project is to resolve the challenge from ASAPP [Link](https://t.lever-analytics.com/email-link?dest=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1nmz8BuMGjVU1YwsQhjHYZCsg-By_6DVFwKLpclWAgsA%2Fedit%3Fts%3D5e384dc1%23heading%3Dh.89vf84rtv8zr&eid=b07ff87d-76af-47a5-be01-704bdb85f40a&idx=1&token=6B_kfT68W8Q_bwFx42hYSyxhCLc)
To accomplish that, I used Create-React-App + Redux

## Set up

Before start the project, you have to add `.env` in the root. See `.env.example` to see with params you have to set

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test:eslint`

Run eslint to find and fix problmes in the code

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Some improvements

## UI/UX

- [x] Add the option to remove the city from the selected list
- [x] Add option to remove all selected city in one click
- [ ] Another improvement, it could be the way that we show the cities, now we have a list is showing all time, maybe we can change this, adding a multiselect instead the list and the filter input. I mean, the list only show up after the user starts writing in the filter input
      Example Design:
      ![No selected cities](images/1.png?raw=true)
      ![Searching city](images/2.png?raw=true)
      ![Selecting city](images/3.png?raw=true)
      ![With chips](images/4.png?raw=true)
## API

- it would be better if we can get the information of the city in batches instead of doing a request for each city
- it would be better if we can add/remove selected city in batches instead of doing a request for each city

### Kown Issue

- Only show the first 100 preferences, I am not sure how to make it performance 