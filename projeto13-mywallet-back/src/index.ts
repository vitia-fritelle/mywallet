import {MongoClient} from "mongodb";
import app from "./app";
import config from "./config";

const mongo = new MongoClient(config.mongodb_url);
mongo.connect().then(() => {
	console.info("Connected to MongoDB");
	app.listen(config.port, () => {
        console.info(`Listening to port ${config.port}`);
    });
});

export default mongo;