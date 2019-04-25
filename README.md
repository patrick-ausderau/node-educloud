# node-educloud
Deploy a node.js app on educloud server

## Environment variables
Create ```.env``` file with the following keys:

```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
USR=
PWD=
KEY=
CERT=
SEC=
```

* DB_* connect the databse. 
* USR and PWD are hard coded username and bcrypt hash of password to demonstrate login (you would normally put it in database). 
* KEY and CERT are the path to the ssl cerifiates for https.
* SEC is the secret for session.
