import { Client, Users, Databases } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_APIKEY);
  let database = new Databases(client);

  //var jsondata = JSON.parse();
  
  try {
    // answers'ı al
    var link = database.getDocuments(process.env.APPWRITE_DATABASE_ID,"65dc59d55a33e2567c11", req.body);
    // ilgili cevabı al
    var answers = database.listDocuments(process.env.APPWRITE_DATABASE_ID,"65e97978db53e3998c12", [
        Query.equal('EmailOfFilledBy', link.Email)
    ]);

    log(answers[0].RawData);

    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    // log(`Total users: ${response.total}`);

    
  } catch(err) {
    error("Could not list users: " + err.message);
  }

  // cevabı rawdata olarak gönder.
  return res.text("Pong");

  /*return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });*/
};
