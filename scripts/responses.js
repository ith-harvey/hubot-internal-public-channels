const resp = {

  listChannels: (privGroups) => `Below are the public internal groups that you are welcome to join:\n${privGroups.string}\n\nIf you would like to join one of the groups above type \`@doge channels join <name-of-channel>\`. For example: \`@doge channels join design-pub\``,

  failChannelJoin: (channel) => `:x: I was unable to add you to the ${channel} channel, If the channel is listed when you run \`@doge channels list\` and your still having trouble, reach out to the bot creator \`@iant\``,

  failListChannels: () => `:x: There was an error when trying to list the internal-public channels. Please reach out to the bot creator \`@iant\` with the error.`

}

module.exports = resp
