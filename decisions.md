# Decisions
Here I will outline why I decided to use some frameworks, tools etc. to make my life easier

## Frontend

### Clerk
Basically a ready-to-go Auth.js/NextAuth solution resp. SaaS. Hosted components, absolute breeze to set up and integrate

### Vite
Decided to use Vite because very fast workflow, reportedly faster build time as Webpack, hot relooad is very fast

### Shadcdn UI
Very fast UI workflow, ready-to-go components, accessible out of the box

## Backend
### Sqlite
File-based so easiest to setup for a quick project like this

### Drizzle ORM
Very hyped at the moment so I wanted to try it. Very easy to use abstraction layer for SQL. Drizzle Kit provides easy view on database and easy migrations

### Express
Standard for Node.js servers, easy and quick to integrate

### Clerk
Very easy to integrate, instant access to auth context in API handlers
