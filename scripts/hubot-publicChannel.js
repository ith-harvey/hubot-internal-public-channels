const {RBU, FU} = require('hubot-doge-utility-functions')
const Resp = require('./responses.js')

const channelsListFlow = async () => {
  const {data:authToken} = await RBU.getAuthToken()
  const {groups:privateRooms} = await RBU.getPrivateRooms(authToken)

  const privGroups =  {obj: {}, string: ''}

  privateRooms.forEach(group => {
    let pubTag = group.name.substr(group.name.length - 4)
    if (pubTag === '-pub') {
      privGroups.string += `*${group.name}*\n`
      privGroups.obj[group.name] = group._id
    }
  })
  return privGroups
}

module.exports = (robot) => {

  robot.respond(/(channels list)/i, async (msg) =>  {

    try {
      const privGroups = await channelsListFlow()
      msg.reply(Resp.listChannels(privGroups))

    } catch (error) {
      console.log(`error in channel list ->`, error);
      return msg.reply(Resp.failListChannels())
    }
  })

  robot.respond(/(channels join)/i, async (msg) => {

    // removes the '@doge channels join' command
    const removeChanJoinCmd = FU.replace(`@${process.env.ROCKETCHAT_USER} channels join`,'')

    // cleans up and retreives the channel name
    const channel = FU.trim(removeChanJoinCmd(msg.message.text))

    try {
      const {data:authToken} = await RBU.getAuthToken()
      const privGroups = await channelsListFlow()

      // checks if channel exists
      if (privGroups.obj[channel]) {

        // adds user to channel
        await RBU.addUserToGroup(authToken, msg, privGroups.obj[channel])
        msg.reply('the invite has been sent!')

      } else {
        msg.reply(Resp.failChannelJoin(channel))
      }

    } catch (error) {
      console.log('error in channel join ->', error);
      msg.reply(Resp.failChannelJoin(channel))
    }
  })
}
