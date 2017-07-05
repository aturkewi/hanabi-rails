# Hanabi App

This is the server side repo for a react rails app that plays the game Hanabi

The react repo is located: https://github.com/aturkewi/hanabi-react

## How to start the app

- Clone down the repo
- `cp .env.sample .env`
- Set your secret and auth algo in your `.env` file
 - TODO: Add some instructions on how that's done
- Make sure you have redis installed (on a mac, you can do `brew install redis` and `brew install redis-server`)
- Make sure you have postgres installed
- `bundle`
- `rake db:create`
- `rake db:migrate`
- Start on port 3001 `rails s -p 3001`
- Start up the react client