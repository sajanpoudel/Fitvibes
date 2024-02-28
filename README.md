# Fitvibes
![Home Page](https://raw.githubusercontent.com/sajanpoudel/Fitvibes/5d3ae4ac385403dd8cc8f791f5cbf25383759ac6/fitvibes.png)

<h3>Inspiration</h3>
Our conviction that technology has the capacity to enhance our lives serves as our inspiration. In the modern world, where health is mostly ignored, we feel obligated to adapt traditional technologies and smartwatches into personal health coaches. We aim to use technology to provide individuals with the skills and knowledge they need to live longer, healthier lives. 'Health is Wealth' serves as the project's major driving principle. The goal of this effort is to save lives and enhance human health. It goes beyond data technology. It demonstrates how technology can help us live healthier and happier lives.

<h3>What it does ?</h3>
Our health-focused system is an improved human technology and a deep commitment to improving individuals' well-being. The system is built upon a solid foundation, with MongoDB handling backend data storage. All user health and fitness data are securely stored and managed using Terra API. This ensures that the information remains easily accessible and reliably protected. Users can interact with the system seamlessly, making it accessible to individuals of all technical backgrounds. The heart of our system lies in the smartwatch, which serves as a constant companion for users. This device is equipped with sensors and features that monitor various health metrics, including heart rate, physical activity, sleep patterns, and more. Users receive valuable recommendations for improving their fitness and overall well-being. Whether it's suggesting a short walk, a breathing exercise, or reminding them to stay hydrated, the system acts as a proactive guide on the path to better health.

<h3>How we built it ? </h3>
Creating our project was a team effort that involved dividing our tasks to get things done effectively. Some of us focused on the front end, which is the part you see and interact with, while others tackled the back end, handling data storage and processing. We also spent time understanding how Terra API worked; it was like unlocking a puzzle. By experimenting with dummy data and webhooks, we pieced together the API's workings. At the same time, we gathered in brainstorming sessions, throwing around new ideas to make our project even better. This collaborative process made sure we could build a web app that connects to Terra API, fetches your health data from various apps, and stores it safely in MongoDB. It's all part of our mission to provide an accessible and user-friendly solution for health and fitness tracking.

<h3> What's next for Fitlife </h3>
Looking ahead, FitVibes has a promising future, rooted in the lessons from our journey. We see FitVibes growing into a comprehensive health and fitness ecosystem, delivering personalized health recommendations and offering a holistic view of users' well-being. The platform's potential to integrate with a wide range of health and fitness apps, promote community and telehealth, contribute to health science, and expand internationally makes it a catalyst for positive change.

FitVibes aims to become a one-stop destination for health and fitness, where users can not only access data-driven insights but also interact with a supportive community, seek professional guidance, and engage in global health research efforts. The future of FitVibes is characterized by innovation, inclusivity, and a strong commitment to empowering individuals on their journey toward better health and well-being.


## Running the backends

Both servers read the MongoDB connection string from the `MONGO_URI` environment variable. Copy `.env.example` to `.env` inside the folder, fill in your own connection string, then export it before starting.

```
cd backend
npm install
MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/" node index.js   # port 5000
```

```
cd backendforjson
npm install
MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/" node index.js   # port 8080
```

| Endpoint | Server | Returns |
| --- | --- | --- |
| `/api/activity`, `/api/body`, `/api/daily`, `/api/sleep` | backend | The documents of that collection, optionally `?limit=N` (1 to 1000) |
| `/api/cleanData` | backendforjson | A merged summary of selected fields from all four collections, cached for one minute |
| `/api/health` | both | `{ "status": "ok" }` without touching the database |

The chat page in `Health/` expects an OpenAI API key in `API_KEY` inside `ChatAI.js`. It calls the chat completions endpoint with `gpt-3.5-turbo`.
