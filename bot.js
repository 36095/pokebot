import { config } from 'dotenv';
import 'colors';
import {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { REST } from '@discordjs/rest';
// import OrderCommand from './commands/order.js';
// import RolesCommand from './commands/roles.js';
// import UsersCommand from './commands/user.js';
// import ChannelsCommand from './commands/channel.js';
// import BanCommand from './commands/ban.js';
// import RegisterCommand from './commands/register.js';

config();

const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
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

client.on('messageCreate', (message) => {
  // console.log(message.author.tag + ':');
  console.log(message.content);
  // console.log(message.createdAt.toDateString());
});

client.on('channelPinsUpdate', (channel, date) => {});

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', (self) => {
  console.log(`${self.user.tag.rainbow} is ${self.user.presence.status.green}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'store') {
    await interaction.reply(
      'Item purchased: **x1 ' + interaction.options.get('food').value + '**'
    );
  }
});

async function main() {
  const commands = [
    {
      name: 'store',
      description: 'Store where you can buy things',
      options: [
        {
          name: 'food',
          description: 'The type of food',
          type: 3,
          required: true,
        },
      ],
    },
  ];

  try {
    console.clear();
    console.log('Started refreshing application {/} commands.'.blue);
    await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log('Successfully reloaded application {/} commands.'.green);
    client.login(token);
  } catch (error) {
    console.error(error);
  }
}

// -------------

main();
