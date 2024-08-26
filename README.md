

# Next.js app for the UP2TOM API

This is a Next.js app that interfaces with the [UP2TOM API](https://docs.up2tom.com/).

## Setup Guide

I recommend 2 ways to run this app:
1. Locally in dev mode
2. Locally using Docker


Once the setup steps are complete and you've logged in to the app, see the [How It Works](link) section for details on how to use it.

### Setup

#### Run Locally (No Docker Involved)

1. **Install dependencies:**
	```bash
	npm install
	```

2. **Copy the contents of the `.env.local.example` file to a file named `.env` and fill in the required environment variables.**

    2.1 To obtain the value for the `AUTH_SECRET` environment variable, run the following command and copy the output into the `.env` file:
	```bash
	sh generateAuthSecret.sh
	```
    2.2. Remember to paste your `UP2TOM_API_KEY` into the `.env` file.

    2.3 Ensure that the `MONGODB_URI` points to a valid MongoDB instance. Additionally, make sure that the user document is present in the database; otherwise, you won't be able to log in to the website:
	- Database name: `test`
	- Collection name: `users`
	- Document: `{email: "$EMAIL", password: "$PASSWORD"}` (as per the `.env` variables)

3. **Run the development server:**
	```bash
	npm run dev
	```

4. **Open [http://localhost:3000](http://localhost:3000) (assuming `$PORT` is 3000) with your browser and log in using the email and password as per the `.env` file.**


#### Run locally using Docker:
I've included a docker compose file that builds the app and runs it in a container alongside a mongodb instance.

1. **Copy the contents of the `.env.docker.example` file to a file named `.env` and fill in the required environment variables.**

    1.1 To obtain the value for the AUTH_SECRET environment variable, run the following command and copy the output into the env file:
    ```bash
    sh generateAuthSecret.sh
    ```

    1.2 Remember to paste your UP2TOM_API_KEY into the .env file.

    1.3 With this method, you don't need to change the MONGODB_URI variable as long as you don't change the USERNAME and PASSWORD variables in the .env file. If you do change these variables, make sure to update the MONGODB_URI with the approrpiate changes. 

    1.4 Furthermore, Make sure that the AUTH_TRUST_HOST is set to http://localhost:$PORT (where PORT is the port you want the app to run on).

2. **Run the containers:**
    ```bash
    docker-compose up
    ```

3. **Open [http://localhost:3000](http://localhost:3000) (assuming $PORT is 3000) with your browser and login using the email and password as per the .env file.**

## How It Works:

(TODO: add screenshots)

Once logged in, you will be on the homepage. You have 2 options:
1. Get a single decision from the UP2TOM API
2. Upload a csv file to get a batch of decisions from the UP2TOM API

Go ahead and try both options out. 

When you hit the Submit button, the app will send the data to the UP2TOM API and then a dialog will appear with the Successfull/Error response from the API.

If the response is successful, the dialog will show the result and you are able to click the 'save' button to store the decision/batch details in the mongo database. Otherwise, you will have to make some adjustments to the data and try again.

Note: I didn't have enough time to implement the following:
- Client-side or server-side validation using the [Exclusion rules](https://docs.up2tom.com/?python#exclusion-rules) defined in the models.
- Properly displaying & explaining:
-- rules that were violated after a single decision is submitted.
-- reasons for a single decision
-- dashboard routes to view the decisions and batces that were saved in the database
