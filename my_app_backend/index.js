const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const mongoose = require('mongoose')
require("dotenv").config();

const APP_PORT = process.env.PORT || 8081;

const app = express();
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.once('open', ()=>{
//     console.log('connect to mongodb');
// });

let reminders = [
  // {
  //   id: 1,
  //   title: "check",
  //   message: "hello world",
  //   userId: "asd@gmail.com",
  //   timeFormat: "AM",
  //   hours: "2",
  //   minutes: "3",
  //   modifiedOn: "12/03/2021",
  //   createdOn: "12/02/2020",
  //   status: "New",
  // },
  // {
  //   id: 2,
  //   title: "meeting",
  //   message: "remind me",
  //   userId: "as@gmail.com",
  //   timeFormat: "PM",
  //   hours: "11",
  //   minutes: "3",
  //   modifiedOn: "12/03/2021",
  //   createdOn: "12/02/2020",
  //   status: "New",
  // },
];

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (_, response) => {
  response.send("Welcome to Talentship backend");
});

app.get("/get_reminders", (_, response) => {
  response.status(200).json(reminders.sort((a,b)=>{
    return a.id-b.id
  }));
});

app.post("/create_reminder", (request, response) => {
  const currentDateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  if (reminders?.length > 0) {
    const new_id = reminders[reminders?.length - 1].id + 1;
    reminders.push({
      ...request.body,
      createdOn: currentDateTime,
      modifiedOn: currentDateTime,
      status: "NEW",
      id: new_id,
    });
    response.status(201).json({
      id: new_id,
      createdOn: currentDateTime,
      modifiedOn: currentDateTime,
      status: "NEW",
    });
  } else {
    const new_id = 1;
    reminders.push({
      ...request.body,
      id: new_id,
      createdOn: currentDateTime,
      modifiedOn: currentDateTime,
      status: "NEW",
    });
    response.status(201).json({
      id: new_id,
      createdOn: currentDateTime,
      modifiedOn: currentDateTime,
      status: "NEW",
    });
  }
});

app.patch("/update_reminder/:id", (request, response) => {
  const data_to_be_modified = reminders?.find(
    (reminder) => reminder?.id === parseInt(request?.params?.id)
  );
  const currentDateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

  if (!data_to_be_modified) {
    response?.sendStatus(404);
  } else if (Object.keys(request?.body)?.length === 0) {
    response.sendStatus(400);
  } else {
    reminders = [
      ...reminders?.filter(
        (reminder) => reminder?.id !== parseInt(request?.params?.id)
      ),
      {
        ...data_to_be_modified,
        ...request?.body,
        modifiedOn: currentDateTime,
        status:"MODIFIED"
      },
    ];
    response.sendStatus(204);
  }
});

app.delete("/delete_reminder/:id", (request, response) => {
  const data_to_be_deleted = reminders?.find(
    (reminder) => reminder?.id === parseInt(request?.params?.id)
  );
  if (!data_to_be_deleted) {
    response.sendStatus(404);
  } else {
    reminders = [
      ...reminders?.filter(
        (reminder) => reminder?.id !== parseInt(request?.params?.id)
      ),
    ];
    response.sendStatus(200);
  }
});

app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
