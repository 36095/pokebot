require('dotenv').config();

const discord = require('discord.js');

const { REST, Routes } = require('discord.js');

require('http')
  .createServer((req, res) => res.end('Listening'))
  .listen(8000);

// config();

const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new discord.Client({
  intents: [
    'DirectMessageReactions',
    'DirectMessageTyping',
    'DirectMessages',
    'GuildBans',
    'GuildEmojisAndStickers',
    'GuildIntegrations',
    'GuildInvites',
    'GuildMembers',
    'GuildMessageReactions',
    'GuildMessageTyping',
    'GuildMessages',
    'GuildPresences',
    'GuildScheduledEvents',
    'GuildVoiceStates',
    'GuildWebhooks',
    'Guilds',
    'MessageContent',
  ],
});

// -------------

client.on('channelPinsUpdate', (channel, date) => {});

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', (self) => {
  console.log(`${self.user.tag} is ${self.user.presence.status}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'starter') {
    await interaction.reply(
      'You choose **' +
        interaction.options.get('pokémon').value +
        '** as your first partner.'
    );
  }
});

async function main() {
  const commands = [
    {
      name: 'starter',
      description: 'Choose your starter.',
      options: [
        {
          name: 'pokémon',
          description: 'Shows you the list of starter pokémons.',
          type: 3,
          required: true,
          choices: [
            {
              name: 'Bulbasaur',
              value: 'Bulbasaur',
            },
            {
              name: 'Charmander',
              value: 'Charmander',
            },
            {
              name: 'Squirtle',
              value: 'Squirtle',
            },
          ],
        },
      ],
    },
  ];

  try {
    console.clear();
    console.log('Started refreshing application {/} commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log('Successfully reloaded application {/} commands.');
    client.login(token);
  } catch (error) {
    console.error(error);
  }
}

// -------------

main();
