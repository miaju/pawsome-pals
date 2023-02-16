# Getting Started

## Set up database

Type the following command on your vagrant machine to connect to your postgres server:

```
psql -U vagrant -d template1
```

(if not using vagrant just do `psql`)

Run the following SQL commands to create the necessary objects in the DB:

```
CREATE ROLE labber WITH LOGIN password 'labber';
CREATE DATABASE finals OWNER labber;
```

## Available Scripts

In the project directory, you can run:

### `npm run db:reset`

Resets the database

### `npm start`

Runs the app in the development mode. \
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
