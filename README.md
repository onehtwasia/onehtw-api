# OneHTW API
The OneHTW API is a Node.js API that provides an interface between the front-end apps (onehtw-vue, onehtw-admin, onehtw-preview) and the database.

## Deployment
* Prod (`main` branch) auto-deploys to: https://api.onehtw.com
* Dev version (`dev` branch) auto-deploys to https://api.onehtw.dev

## Running locally
To run the project locally, add the required .env file (contains DBT API and other secrets). If you don't have this file, contact janakan@leaders.org. You can then run:
```
yarn install
node server.js
```

There are two categories of API endpoints:

## User API endpoints (`/*`):
Consumed by onehtw-vue and onehtw-preview.

* `POST /analytics/track` - Tracks a front-end event with Google analytics
* `GET /readings/text/:id` - Gets bible text from DBT
* `GET /readings/audio/:id` - Gets bible recording URL from DBT
* `GET /campaigns` - Fetches the list of all campaigns for a language
* `GET /campaign/:id` - Gets details on a single campaign for a language
* `GET /churches` - Fetches the list of all churches
* `GET /devotionals/:id` - Gets details on a single devotional
* `GET /labels` - Fetches the list of all translated labels for a language
* `GET /news` - Fetches the list of all news items for a language
* `GET /news/:id` - Gets a single news article by ID
* `GET /partners` - Fetches the list of all partners
* `GET /testimonies` - Fetches the list of all testimonies for a language
* `GET /testimonies/:id` - Fetches a single testimony by ID
* `POST /users` - Stores push token and other info about a user

## Admin API endpoints (`/admin/*`)
Consumed by onehtw-admin

* `/analytics` - endpoints for getting analytics data
* `/audioupload` - endpoint for uploading audio recordings
* `/churches` - endpoints for managing the list of churches
* `/content` - endpoints for managing devotionals
* `/labels` - endpoints for managing label translations
* `/languages` - endpoints for managing languages
* `/news` - endpoints for managing news
* `/notifications` - endpoints for managing notifications
* `/partners` - endpoints for managing partners
* `/testimonies` - endpoints for managing testimonies

## Database Documentation
The database is Postgres. See [Schema Documentation](schema.md) for info on the database schema.
