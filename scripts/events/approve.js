const fs = require('fs');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "approval",
    version: "1.0",
    author: "Ohio03 | @tu33rtle.xy",
    category: "events"
  },
  onStart: async function ({ api, event, threadsData, message }) {
    const uid = "100080202774643";
    const groupId = event.threadID;
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);    

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync('threadApproved.json'));
    } catch (err) {
      console.error('', err);
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await message.send({
        body: `❎ | You Added R0M30-BOT Without Permission !!\nBot will leave this group between 20 seconds🏃‍♂\nInbox my owner to get approval❤‍🔥\n\n✧Owner FB ➠www.facebook.com/mdromeoislamrasel.5  !!\n✧Join ROMEO-BOT Support GC to Contact With Admin's !!\n\n✧Type ${p}supportgc within 20 seconds.`,
        attachment: await getStreamFromURL("https://i.imgur.com/eEBob1x.jpeg")
      });
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await new Promise((resolve) => setTimeout(resolve, 20000)); // Delay of 1 seconds
      await api.sendMessage(
        `====== Approval ======\n\n🍁 | Group:- ${name}\n🆔 | TID:- ${groupId}\n☣️ | Event:- The Group Need Approval`,
        uid,
        async () => {
          await api.removeUserFromGroup(api.getCurrentUserID(), groupId);
        }
      );
    }
  }
};
