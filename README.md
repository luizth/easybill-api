## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Files

- **.env**
Environment variables from the application (DB credentials, DB connection string). It is best practice to omit it from the repository.

- **package.json**
Dependencies from the project.

### Folders

---
## Setup

Install packages.
```bash
$ npm install
```

Start postgres instance from docker. Check
```bash
$ docker-compose up
```

Run prisma migrations to create the tables.
```bash
$ npx prisma migrate dev --name "init"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running locally

If you are running locally, type `localhost:3000/` in your browser. You should see the `Hello Dev!` page.

To see the swagger documentation, type `localhost:3000/api`.


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
