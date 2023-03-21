# Rowmate

## Basic Overview

This is a React application that allows users to create and save customized tables for their data. Logged-in users can view a list of created tables and add their own. The application uses virtualized table rows to handle large datasets efficiently, so users can work with even the most complex data structures without performance issues.

The user interface is built using the MUI library, which provides pre-built components that are customizable and easy to use. The application is designed to be responsive and fast, with real-time updates that make it easy for users to see changes without having to refresh the page.

In summary, this React application offers a flexible solution for managing data in tables, with a user-friendly interface built using the MUI library and efficient handling of large datasets through virtualized table rows.

## Stack

- Vite
- React & TypeScript
- MUI
- React Router
- Apollo Client
- React Virtuoso
- Notistack

## API

GraphQL API:

- [Github project](https://github.com/kacperlachowski/nestjs_graphql/)
- [Docker image](https://hub.docker.com/repository/docker/kacperlachowski/rowmate_api/)

## Installation

Before running the React application, please make sure to start the API project by following the instructions in its documentation. You can find the API project [here - Rowmate API](https://github.com/kacperlachowski/nestjs_graphql)

- with npm

```
npm intall
npm run build
npm run preview
```

- with docker

```
docker-compose up --build
```

## Demo

![](./demo.gif)
