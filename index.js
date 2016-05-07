'use strict';

var _botkit = require('botkit');

var _botkit2 = _interopRequireDefault(_botkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SLACK_TOKEN = process.env.SLACK_TOKEN;


if (!SLACK_TOKEN) {
  console.error('SLACK_TOKEN is required!');
  process.exit(1);
}

var controller = _botkit2.default.slackbot();
var bot = controller.spawn({
  token: SLACK_TOKEN
});

bot.startRTM(function (err, bot, payload) {
  console.log('The payload!', payload);
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, 'I’m here!');
});

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello, %username%.');
});

controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
  bot.reply(message, 'Helloooooooooooooooo.');
});

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:');
});

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = ['I will respond to the following messages:', '`bot hi` for a simple message.', '`bot attachment` to see a Slack attachment message.', '`@<your bot\'s name>` to demonstrate detecting a mention.', '`bot help` to see this again.'];

  bot.reply(message, help.join('\n'));
});

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.';
  var attachments = [{
    fallback: text,
    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
    title: 'Host, deploy and share your bot in seconds.',
    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
    title_link: 'https://beepboophq.com/',
    text: text,
    color: '#7CD197'
  }];

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp);
  });
});

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don’t understand. \n');
});