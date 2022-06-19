# Title

Earthflix - Watch.Change.Together

# Description

Earthflix is the only VOD platform fighting global warming. We engage people to watch films about the topic. The payment model is classical TVOD (transactional) wher users pay for each film. They can choose themselves whether they pay the basic price, whether they pay for each person watching or whether they want to pay more and support our Change.Together programme. 40 % of all admission support our activities which can be found at About session.

# List of technologies used

- Next.js
- Postgres
- Jest unit tests
- Playwright
- Emotion
- React
- GitHub Actions
- Typescript

# Screenshot

![screenshot1](https://github.com/Drako222/ecommerce-project/blob/main/public/Screenshot%202022-06-19%20at%2017.38.05.png)

# Deployment instructions

# Functionalities
- A landing page
- A products page where all the products are listed
- A page for each single product with the ability to change the amount.
- A shopping cart page with a list of all products. The ability to change the amount, delete one product. It shows the total price.
- A checkout page which shows the items from the shopping cart, shipping and payment information
- A thank you page after a checkout.
- The header will show a shopping cart with the current number of items on all pages

# Setup instructions
Clone the repository with git clone <repo>
Setup the database by downloading and installing PostgreSQL
Create a user and a database
Create a new file .env
Copy the environment variables from .env-example into .env
Replace the placeholders xxxxx with your username, password and name of database
Install dotenv-cli with yarn add dotenv-cli
Run yarn install in your command line
Run the migrations with yarn migrate up
Start the server by running yarn dev

# Deploy on Heroku
Sign up at Heroku: https://www.heroku.com/.
Create a new App
Choose a name and select the "Europe" Region
Click "Connect to GitHub"
Search for your repository and click on "Connect". Click on "Enable Automatic Deploys"
Go to the Overview tab and click "Configure Add-On"
Search for "Postgres" and select "Heroku Postgres"
Trigger a deploy by pushing your repo to GitHub
