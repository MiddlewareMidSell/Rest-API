const mongoose = require("mongoose");

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //         ,
    //         useFindAndModify:true,
    //         useCreateIndex:true,
  })
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Connnection to database failed"));
