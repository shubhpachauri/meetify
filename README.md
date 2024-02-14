# Meetify

This project aims to develop a robust GraphQL Federation architecture that seamlessly interfaces with Google APIs. The backend system is designed to authenticate using Google tokens, ensuring secure access and data privacy. It fetches user data from Google Calendar and Google People APIs, providing a unified platform for users to access and manage their information. This architecture not only simplifies data handling but also enhances the user experience by providing a one-stop solution for managing Google Calendar events and Google People contacts. The system’s interoperability and secure authentication make it a reliable and efficient solution for managing user data across multiple Google services.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install the software

```
· Node.js
. TypeScript
. Fastify
. Graphql & Mercurius
. Google OAuth 2.0.
```

### Installing

Go ready for stating the project we need to get the google developer setup compete first

Let's to go [Google Developer Console](https://console.cloud.google.com/)

### Create a Oauth2 consent

Create your consent for Web application

Update your .env with the **CLIENT_ID CLIENT_SECRET REDIRECT_URL** you recive from the Oauth2 consent form.

**Things to not miss out**

- Add the [scopes](https://developers.google.com/identity/protocols/oauth2/scopes) properly
- Add the email you want to use to for testing in tester email in Oauth2 consent.
- Enable [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- Enable [Google People API](https://developers.google.com/people)
- Use the same redirect URL as in your Fastify server

With this our google setup is complete 🙌🙌

Lets install the node modules

```
npm i
```

Now we are good to go for the demo 😎

## How to Run the Project

As we are using TypeScript we first need to build the code run the following command to run

```
npm run build
```

Once the code is complied we can start the server by running the following command

```
npm run dev
```

If everything goes well we get

```
Server is running on http://localhost:4000
```

Now we need to login to get the google token for that navigate to

```
Server is running on http://localhost:4000/google
```

Login in with the email entered in test email

You should be redirected to Graphiql web editor at

```
Server is running on http://localhost:4000/graphiql
```

## How to Use

#### To make a Google Calendar Event-

Run this mutation in the web editor

```
mutation {
  	createEvent( summary: <"enter meeting summary">
    description: <"enter meeting description">
    start: <"YYYY-MM-DDT11:00:00">
    end: <"YYYY-MM-DDT11:00:00"> )
  }
```

#### To get the contacts from Google People -

Run this query in the web editor

```
query data {
  Name
  Age
  getContacts{
    displayName
  }
}
```

## Authors

- **Shubh Pachauri** - [GitHub](https://github.com/shubhpachauri)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
