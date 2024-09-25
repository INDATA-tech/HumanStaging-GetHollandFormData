import { Client, Users, Databases, Query } from 'node-appwrite';

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
     var linkData = await database.getDocument("65dc57b1e8322b0426ae","65dc59d55a33e2567c11","66f3d7f300089d76b8e7");
    log("Onur")
    log(linkData)
    log("requst")
    log(req.body)
    log(req.bodyRaw)
    log("appwrite db id")
    var link = await database.getDocument("65dc57b1e8322b0426ae","65dc59d55a33e2567c11", req.bodyRaw);
    log("link")
    log(link)
    log(link.Email)

    // ilgili cevabı al
    var answers = database.listDocuments("65dc57b1e8322b0426ae","65e97978db53e3998c12", [
        Query.equal('EmailOfFilledBy', "onur.demir@indata.com.tr")
    ]);
    log(answers);
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
