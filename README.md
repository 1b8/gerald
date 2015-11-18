# Gerald

Hello! This is a Minecraft bot created with
[Mineflayer](https://github.com/andrewrk/mineflayer). It's similar to
[Helperbot](https://github.com/Darthfett/helperbot) and
[rbot](https://github.com/rom1504/rbot), and is **NOT** intended for
cheating! Only use it on servers where you have permission to...

### Installation

Note! The bot requires a username and password for online-mode=true servers.
These can be the credentials of any Minecraft account, but cannot be yours, as
you will need to be online to issue the bot commands. This may be changed in
future.

To use, you must have [Node.js](https://nodejs.org/en/download/) and
[Git](http://git-scm.com/). Well, you don't need Git; you can just click the
"Download as ZIP" button somewhere to the right of this text, and extract it.

Run this command in the `gerald` directory to install Gerald's dependencies:
```
npm install
```

To start the bot:
```
node gerald.js [host:port] [username|email] [password]
```

NOTE: To use the <https://cleverbot.io/> `chat` API, you must create a `keys.json` file in this directory, with these contents:
```json
{
  "chat": {
    "user": "<USER>",
    "key": "<KEY>"
  }
}
```
where `<USER>` and `<KEY>` are your API user and key from <https://cleverbot.io/keys>.

Usage documentation can be found [here](https://github.com/1b8/gerald/wiki).

### Updating
```
git pull
```
