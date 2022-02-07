function getLastMessageByHeader(game, key) {
  const searchString = game.i18n.localize(key).toLowerCase() + "</h2>";
  const messages = game.messages.filter((msg) => {
    const flavor = (msg?.data?.flavor || "").toLowerCase();
    return flavor.indexOf(searchString) > -1;
  });
  if (messages.length) return messages.pop();
  return false;
}

function getAttackAndDefenseMessagesFromChats(game, messageDefenseId) {
  debugger;
  let messageAttack;
  const messageDefense =
    messageDefenseId && game.messages.get(messageDefenseId);
  if (messageDefense) {
    const messageAttackId = messageDefense.data?.flags?.arm5e?.originMessageId;
    messageAttack = messageAttackId && game.messages.get(messageAttackId);
  }

  return {
    messageAttack:
      messageAttack || getLastMessageByHeader(game, "arm5e.sheet.attack"),
    messageDefense:
      messageDefense || getLastMessageByHeader(game, "arm5e.sheet.defense"),
  };
}

function getDamageMessageFromChats(game, messageDamageId) {
  const messageDamage = messageDamageId && game.messages.get(messageDamageId);
  return messageDamage || getLastMessageByHeader(game, "arm5e.sheet.damage");
}

export { getAttackAndDefenseMessagesFromChats, getDamageMessageFromChats };
