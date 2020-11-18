
# Task-Management App

Project Deploy Link

<a href="https://task-manager-843ac.web.app/">Click Here </a>


# Create a new project

make sure you have npm, node and create-react-app tool

```
create-react-app project-name
```

OR

```
git clone https://github.com/rks107/Task-Management/
```

# Starting of Project

```
npm start
```

# Project Structure

```
src
├── components
│   ├── index.js
│   ├── App.js
│   ├── DateByTasks.js
│   ├── Calender.js
│   ├── Task.js
│   ├── TaskForm.js
│   └── Header.js
├── helper
│   ├── buildCalendar.js
│   └── dayStyles.js
├── index.css
└── index.js
```

# Hosting the project on Github

Open package.json and add

```
Steps:

1. npm run build

2. Install the gh-pages package as a “dev-dependency” of the app (npm i gh-pages)

3. "homepage": "http://{Github-username}.github.io/{Github-repo-name}"

4. "scripts": {
      //…
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }

5. npm run deploy
  
```


