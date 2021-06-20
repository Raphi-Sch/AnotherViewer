# Another Viewer 🤖

Another viewer is twitch chat tracker use to make useless stats about a streamer chat.

## how to run it :

1. Clone the project
```shell
git clone https://github.com/Raphi-Sch/AnotherViewer.git
```
2. in the `src` folder, add `twitch.json` :
```json
{
  "bot_name" : "your bot name",
  "token" : "oauth:token of the twitch bot",
  "channel" : "name of the chanel (ex. ponce)"
}
```

3. you can run the project using docker 🐳 : `docker-compose up --build`

## If you want to run it without docker :
1. create a mysql db 
2. in the `src` folder, add `db2.json.json` :
```json
{
  "db_host" : "your host",
  "db_user" : "user",
  "db_pass" : "password",
  "db_name" : "db"
}
```
3. install the required dependencies using npm :
```shell
npm install tmi.js
npm install fs
npm install mysql2
```
4. run the project : `node ./src/listener.js`

