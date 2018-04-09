# Angular User Management App Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3. It uses version 5.2 of the Angular framework.

The main intention of this code repo is to create a small web app that handles users and their membership in groups. User can add and remove users as well edit the Groups and its members.

You can see a live, running example in this web address: https://ngx-usermgmt-demo.netlify.com/

## Prerequisites

 The project has dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher. Click the [link](https://nodejs.org/en/) and go install Node/NPM before you continue.

## Downloading and running the app

1. Download the Zip file version of this code from this Github repository
2. Extract the contents into a folder on your documents or desktop machine
3. Open a command terminal and navigate to the extracted contents folder directory
4. Run `npm install` to install of the dependencies for the app
5. To run, follow the instructions below to initiate the development server.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## API Descriptions

These are the mock REST endpoints used for back-end database for Users and Groups

* GET /api/users --> get all of the users
* GET /api/users/${id} --> get a specific user
* GET /api/users/?userName=${term} --> search for a user using 'term' value
* POST /api/users/${userName} --> add a user to Users list; response is success with ID number created
* PUT /api/users/${id} --> Update a user detail; response is success with ID number
* DELETE /api/users/${id} --> Delete a user from Users list; response is success or failure

* GET /api/groups --> get all of the groups in the database
* GET /api/groups/${id} --> get a specific user
* GET /api/users/?groupName=${term} --> search for a user using 'term' value
* POST /api/groups/${groupName} --> add a user to Users list; response is success with ID number created
* PUT /api/groups/${id} --> Update a user detail; response is success with ID number
* DELETE /api/groups/${id} --> Delete a user from Users list; response is success or failure

## Entity Models

User = {
	id: number;
	userName: string;
}

Groups = {
	id: number;
	groupName: string;
	groupMembers: number[];
}

The mock database collections can be found in the _/src/app/in-memory-data.service.ts_ file

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

Feel free to reach out to me via Twitter -- @kegxa40

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
