var fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var token = config.token;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity(`try /howto`);
});

function rand(x) {
    return Math.floor(Math.random() * x + 1);
}

client.on('message', msg => {
  input = msg.content.toLowerCase()
  //Prints command list
  if (msg.content === '/howto') {
    msg.reply(`
      commands :
      /r x - roll a dice from 1 to x
      /loot - randomise a chest or a reward
      /heal - heal a certain amount of HP
      /crazy msg - change "msg" with a word and *surprise*
    `);
  }
  switch(input) {
    //Randomises loot!
    case '/loot':
      loot = ['weapon!','armor!','accessory!','item!','edible!','key item!','money!','lot of money!'];
      msg.reply(loot[rand(loot.length)]);
      break;
    case '/heal':
      msg.reply('+' + rand(10) + 'PV!');
      break;
    case '/test':
      TEST = fs.readFile('test.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
        msg.reply(data);
      });
      break;
  };
  //Rolls a dice
  if (msg.content.slice(0, 3) == '/r ') {
      const dice = Number(msg.content.slice(3));
      msg.channel.send(rand(dice));
  }
  //Returns a "tts" message (read lowdly) and delete the command message (to make people crazy, they won't know who is talking)
  if (msg.content.slice(0, 5) === '/crazy ') {
    msg.delete();
    msg.channel.send(msg.content.slice(5), {tts: true});
  }
  if (msg.content.slice(0, 1) == '!') {
    msg.channel.send(`use /howto to get a command list or just ask my Master! Also, try using the same command but with a slash instead! `)
  }
});

client.login(token);
