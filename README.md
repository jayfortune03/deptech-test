# deptech-test

## Running BE

1. cd employee-management-backend
2. To run it use `yarn` first to install
3. configure env from example env (db name is employment-management). The rest is up to you.
4. JWT_SECRET=inisangatrahasiahehehe
5. `npx prisma migrate deploy`
6. `yarn or npm seed`
7. `yarn or npm start` to run server

Username untuk admin login :

```js
email: 'john.doe@example.com',
password: 'password123'
```

## Running FE

1. cd employee-management-frontend
2. `yarn` or `npm install`
3. configute env to BE from example env (in example using 3001)
4. `yarn dev`
