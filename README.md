# Case Submission Portal
A simple Web Application with Node based REST API backend that lets you perform CRUD operations .
TinyMCE has been used for the RichTextBox on the UI that lets you add/edit cases with fonts and styling .
There is no DB where records are stored ,instead data is simply kept in a json file which contains an array of all records.

####Run the following commands to have the application up and running -

* `npm install`
* `npm run start`

####The first command install the node dependencies while the second one starts the express server
####The application should be live [here](http://localhost:8080)


### Work in Progress 

* Replace TinyMCE with Quill.js a light alternative
* Replace Jquery with Sizzle or Zepto 
* Remove Bootstrap and Use custom styling 
* Remove global variables and improve code quality 
* Create a seperate branch where there is no dependancy on backend service and records are held in local storage , host this on gh-pages
* A live toggle button should be available for user to switch between backend service or choose local storage





