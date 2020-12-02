# Job Board Powered by GitHub Jobs


## Step 1:Setting up the environment
  •	Install the latest version of Node from the official website https://nodejs.org/en/
  •	Install your favorite editor https://code.visualstudio.com/
  •	Install React using –  npm i create-react-app in the terminal
  •	Creating an application –  npx create-react-app github-jobs in the terminal. Note we use npx and not npm because we won’t have to install the package globally       and also update the create-react package constantly with the latest features introduced

## Step 2: Folder structure of the React application
•	Now, you’ll see 2 options on the screen cd github-jobs and npm start, navigate to the folder where your app is installed and use the command-“npm start” to see     whether the initial boilerplate of React is rendering properly.
•	In the folder we’re concerned with editing the app.js file src folder as it renders the html that we see in the browser. The index.html file contains the root DOM   node which is rendered using App.js file. For our requirements, we are going to split the requirements in different components using React. The GitHub Jobs API     will be scraped in a component. The header will be another component and the data to be displayed will be another component
•	We’re adopting this method to make the code cleaner and also because the Header and Search Toolbar will be static for most of the parts of the UI.
•	We will also be using JSX to keep the code elegant and readable.

## Step 3:Creating the different components
  Naming convention requires us to use snake-case or pascal-case while naming our components
 
A.	The header component



















	
