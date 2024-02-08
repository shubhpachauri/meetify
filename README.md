# meetify
yettel onbording task

to run the propject follow these steps 

1> clone the directory in your local 

2> open your terminal ( navigate to the folder directory) run "npm i"

3> then run "npm run build"

4> then run "npm run start"

after this you will recive the link to the server ([localhost](http://localhost:4000/) 
hit http://localhost:4000/google then login with your google account 
now you can go to [http://localhost:4000/](http://localhost:4000/graphiql#)http://localhost:4000/graphiql# 

their hit this mutation 
mutation {
  createEvent(
    summary: <"enter meeting summary">
    description: <"enter meeting description">
    start: <"YYYY-MM-DDT11:00:00">
    end: <"YYYY-MM-DDT11:00:00">
  )
}

and Volla the meeting has been created check your google calander to see the meeting.
