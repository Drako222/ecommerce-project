# Title

Earthflix - Watch.Change.Together

# Description

Earthflix is the only VOD platform fighting global warming. We engage people to watch films about the topic. The payment model is classical TVOD (transactional) wher users pay for each film. They can choose themselves whether they pay the basic price, whether they pay for each person watching or whether they want to pay more and support our Change.Together programme. 40 % of all admission support our activities which can be found at About session.

# List of technologies used

- Next.js
- Postgres.js
- Jest
- Playwright
- GitHub Actions
- Typescript

# Screenshots


# Setup instructions

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
yarn migrate up
```

To reverse the last single migration, run:

```bash
yarn migrate down
```


# Deployment instructions
