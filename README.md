# Pruvo Express TypeScript Setup Test with Docker
This Repo contains Test Express TypeScript Application with Docker Setup.
## Requirement
    - [TypeScript](https://www.npmjs.com/package/typescript)
    - [TS-Node](https://www.npmjs.com/package/ts-node)

## To Run Docker Build

Set a valid emial and password for Use google SMTP server to send the email. (Optional)

in .env

SMTP_USER=test@gmail.com
SMTP_PASS=PASSWORD_HERE


```
  docker-compose up
```

## ENDPOINT

´´´

http://localhost:8080/api/currency/conversion-rate?mailTo=alt.z9-4qez000@yopmail.com&from=USD&to=EUR&value=1000

´´´