# Job Board Powered by GitHub Jobs

The project is to create a Job board powered by Github jobs API. The key components which bonded together are 
-The website UI to match the prototype provided
-Use the API to show all postings currently live on the site
-Implement a search bar to show input fields for searching via location, job description or company and full time
-Show multiple job postings using Load More button pagination
-Open the job description of a posting when clicked on it
-Implement a dark-light mode toggle button
-Unit test the presentational components

## Step 1:Setting up the environment

For the system we will use the following

* Install the latest version of Node from the official website https://nodejs.org/en/
* Install your favorite editor https://code.visualstudio.com/
* Creating an application `npx create-react-app job-board` in the terminal. Note we use npx and not npm because By using the npx command (which is part of the   Node Package Manager (NPM) installation we’re able to execute create-react-app without the need to download and install it first. And we give the name of the project as specified
* Install Material UI using `npm install @material-ui/core` for the Grid layout and presentational components like buttons
* For testing the presentational components we will be using Jest a JAvaScript testing framework `npm install jest --save-dev`
* For implementing the light-dark theme toggle we will use styled components which can be installed by `npm i styled-components`

## Step 2: Folder structure of the React application

* Now, you’ll see 2 options on the screen `cd job-board` and `npm start`, navigate to the folder where your app is installed and use the command `npm start` to see whether the initial boilerplate of React is rendering properly.
* In the folder we’re concerned with editing the app.js file src folder as it renders the html that we see in the browser. 
* The index.html file contains the root DOM node which is rendered using App.js file. The GitHub Jobs API will be scraped in the main App component.
* The header will be another functional component. We’re adopting this method to make the code cleaner and also because the Header and Search Toolbar will be     static for most of the parts of the UI.
* We will also be using JSX to keep the code elegant and readable.

## Step 3:Creating the different components

Naming convention requires us to use snake-case or pascal-case while naming our components and jsx classes should be named using camel casing.

## Step 4: Implementation

Once the React app has been installed, we use the cd github-jobs to open that folder and put in npm start to start the application. The application should directly open in the default browser window or http://localhost:3000/ ideally given in the terminal. Now we can start building the application!
The first thing is to remove the existing code from App.js and App.css files. Then we will add in our code.

### 1.The github jobs api (https://jobs.github.com/api)
This api will return the JSON representation of the jobs listings based on the query parameters you give. When you run this api call in Postman you will receive the accurate response but the same done in Javascript in your local machine will most definitely throw the error 

>No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque >response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

This happens because the browsers block frontend code from accessing the resources cross-origin. The Github api has a no  Access-Control-Allow-Origin in it’s header which is blocking the code from accessing the job data. Such a situation is modified by using a CORS proxy and appending the url to this proxy. CORS proxy makes the request to the website, gets the response, adds Access-Control-Allow-Origin response header and any other CORS headers needed, then passes that back to your requesting code. And that response with Access-Control-Allow-Origin header added is what the browser sees, so it allows your front end code to access the resources.

``` javascript
var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
           targetUrl = 'https://jobs.github.com/positions.json?';
fetch(proxyUrl + targetUrl)
           .then(allData => allData.json())
           .then(d => this.setState({ allData: d }))
           .catch(e => {
               console.log(e);
               return e;
           });
``` 

Now we have the data in JSON which can be mapped to individual items to extract the different parts.

```javascript
{allData.map(item => (
                           <Grid item xl={4} xs={12} md={3}>
                               <div className="jobField">
                                   <div className="CompanyImage" col-sm-4="true">
                                       <img src={item.company_logo} alt="Company logo" className="ImageName"></img>
                                   </div>     
                                   <p className="JobType">{item.type} </p>
                                   <p className="JobTitle">{item.title}</p>
                                   <p className="CompanyName">{item.company}</p>
                                   <p className="CompanyLocation">{item.location} </p>
                               </div>
                           </Grid>
                       ))}
```

We use Grid component of Material UI to display all the job listings in a grid format which is responsive by adding the breakpoints for all screen resolutions ie xl={4} xs={12} md={3}
Now we can see all the job listings which are live on Github jobs site.

### 2. Header Component
The header component is a functional component which we pass to the render() of App.js. It contains the header of our site which is the title and toggle button for light and dark modes. CSS attributes are used along with relative positions to match the mockups provided.

### 3. Implementing the Search bar functionality
According to requirements we need to have search fields which would give us job listings based on a particular field value. To that we examine the API documentations and find out appending the search parameters in the API call will give us the required daa. So we create a form to provide 2 search input fields, a check box and a search button and create functions based on the inputs provided.

#### 3.1 Filter by title, company name or expertise
To filter job listings by title, company name or expertise(java,python) we use the attribute description by appending 
```javascript
targetUrl = targetUrl + "&description=" + titleCompanyExpertise.toString();
```
where titleCompanyExpertise is the input which the user has provided in the input field. The target Url will query the results from the API and display the results

#### 3.2 Filter by location
Filtering a job posting by location is done in identical manner where we use the attribute location by appending 
```javascript
targetUrl = targetUrl + "&location=" + location.toString();
```
location is user inputted which is appended to the url string and queried.

#### 3.3 Full time check box
The full time attribute is a Boolean value which should be toggled as true to get the job posts which are specified as full time. We read the user’s choice as true when the user checks the box and pass it to the targetUrl as 
```javascript
if (fulltime === true) {
           targetUrl = targetUrl + "&full_time=" + fulltime.toString();
       }
```
We bind the functions to the Search Button’s onClick functionality to retrieve the postings.

### 4. Implementing Pagination on Load More button
* Initially in the constructor of App.js we assign the page number to be 0 which means that the first page to be displayed will be 0, the next page will be 1 and so on. The variable page will serve as a counter to decide how many pages are being displayed currently.
* If the user wants to see more posting, the Load More button will be clicked and it will increase the page counter to one and then append that to the targetUrl which will display the job listings for the next page given by the API.

```javascript
targetUrl = targetUrl + "page=" + page.toString();
```

* We have a variable AllData defined which contains the JSON objects currently stored. We initialize a variable previousSearch which will store the current array of Job objects, after the user clicks on Load More, the API retrieves additional 50 listings,which we append in AllData and then render the updated array.

```javascript
const newArray = allData.concat(previousSearches);
       console.log("previous " + previousSearches.length);
       console.log("Size " + newArray.length);
       this.setState({ allData: newArray });
   }
```

### 5. Displaying the Data
* We’ve used components of Material UI to ease the CSS and provide uniformity and clean look to the entire website. These components include Button, Grid and Icons for search and location in the input fields. We used the default website breakpoints for the different screen sizes with a spacing of 2 between individual job posting as demonstrated in the image below.
![GitHub Logo](/images/cssGridBox.png)

* The CSS color scheme is used as defined in the requirements	
1. Light Theme: Purple: #5865E0, Light Gray: #F5F6F8, White: #FFFFFF
2. Dark Theme: Purple: #5865E0, Dark Blue: #131822, Light Blue: #19212D  

* Some images displayed may be stretched due to the difference in dimensions of the image retrieved by the API. We also use CSS position and text formatting features to beautify the text and match the prototype. 

### 6. Unit testing
* We will use Jest to perform unit tests. Install jest using `npm install jest --save-dev`.
* We also have to make changes to package.json file to configure Jest. Under the scripts attribute, edit the test command to include jest. We add coverage to show what percentage of coverage(graphical representation) does the unit test provide for the components rendering. `"test":"jest --coverage",`
* In the App.test.js file we add a sample test to check whether our Jest is configured correctly. To do that, add the following code snippet and then type the command `npm run test` in the terminal
```javascript
describe('Check rendering', () => {
  it('should test that 2 - 2 === 0', () => {
    expect(2-2).toBe(0)
  })
})
```
* The above test will take the expression in expect() and return whether the answer in the toBe() is matching with the expression or not. Once our test is passed, we can now move ahead with testing our components.
* When we're adding unit tests for our jsx expressions in Jest, npm throws an error
>   Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.
>   If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.
* To counteract this error we should do the following:
	1. Install Babel and all it's dependecies using `npm install --save-dev @babel/preset-env` , `npm  add --dev babel-jest @babel/core @babel/preset-env`
	2. Create a file called `babel.config.js` and write the dependencies in it
	```javascript
		module.exports = {
	  plugins: [
	    ['@babel/plugin-proposal-decorators', { legacy: true }],
	    ['@babel/plugin-proposal-class-properties', { loose: true }],
	    '@babel/plugin-syntax-dynamic-import',
	    '@babel/plugin-transform-regenerator',
	    [
	      '@babel/plugin-transform-runtime',
	      {
		helpers: false,
		regenerator: true,
	      },
	    ],
	  ],
	  presets: [
	    "@babel/preset-flow",
	    'module:metro-react-babel-preset',
	  ],
	};
	```
	3. Go to `package.json` and add the jest coverage in script.
	```javascript
	"scripts": {
	    "start": "react-scripts start",
	    "build": "react-scripts build",
	    "eject": "react-scripts eject",
	    "test": "jest --coverage"
 	 },
	```
	4. Go to App.test.js and import the App component and begin writing the unit tests.
	5. Since Enzyme is a JavaScript testing utility for React, it's easier to test the React component's output. Install enzyme `npm i --save-dev enzyme 		   enzyme-adapter-react-16` and import mount, shallow and render in App.test.js 
	```javascript
	import {mount, shallow, render} from 'enzyme'
	```
	6. Our test will check whether the component App is rendering correctly or not. To do that we're going to create a snapshot of the component using Jest and 		Enzyme. Since it's our first time running the test, the snapshot will be generated at this time.
	```javascript
	describe('App', () => {
	  it('renders correctly', ()=> {
	    const wrapper = shallow(<App/>);
	    expect(wrapper).toMatchSnapshot();
	  })
	})
	```


### 7. Light/Dark Theme Toggle
* To implement the light/dark theme toggle we'll begin by installing the styled components package using `npm i styled-components`.Styled-components is a CSS-in-JS library lets you use all of the features of CSS that you love, including media queries, pseudo-selectors, and nesting. 
* They provide full theming support by exporting a `<ThemeProvider>` wrapper components within itself. We will create 2 new files in a `themes` folder called `theme.js` and `global.js`. The file theme.js will include variables for our dark and light modes
```javascript
export const lightTheme = {
    body: '#E2E2E2',
    text: '#363537',
    toggleBorder: '#FFF',
}

export const darkTheme = {
    body: '#19212D',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    p:'#6B8096'
}
```
* and the global.js file will contain base styling for the entire page
```javascript
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};    
    transition: all 0.25s linear;
  }`
```
* Next we will import the ThemeProvider from styled-components, dark.js and normal.js files in App.js which we created to store the basic color schemes and also GlobalStyles and add the default theme as `light` in our constructor.
```javascript
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes/theme';
import { GlobalStyles } from './themes/global';
```
* We will define a function `toggleTheme()` which will check whether the current state is toggled to dark theme or light theme
```javascript
toggleTheme() {
        // if the theme is not light, then set it to dark
        if (this.state.theme === 'light') {
            this.setState({ theme: 'dark' });
            // otherwise, it should be light
        } else {
            this.setState({ theme: 'light' });
        }
    };
```
* In the render() function we add our components of `<ThemeProvider>` and `<GlobalStyles>` and wrap our entire application within `<ThemeProvider>` so it will display the accurate theme for the entire application.
* Now at the click of Toggle Theme button the theme of the entire application will be switched to dark mode and vice versa.



### 8. Uploading the folder on Github
Upload the project to Github so it can be accessed by netlify for deployment.

### 9. Deploying the application
* We register for an account on netlify.com and link the Github account for accessing the repository. 
* In the options provided we select the repository name and add the name of website “Job-Board-Powered-By-Github-Jobs” in the /build input field. This will be the name of the website. 
* After clicking on deploy give it a few minutes and then the link will be live. You can visit the link at http://Job-Board-Powered-By-Github-Jobs.netlify.app

					 				
			
		

