import { log } from "../tools.js";
import { getActorFromToken } from "../helpers/tokens.js";

function getDatasetForDefense(actor) {
  return {
    "data-roll": "combat",
    "data-name": game.i18n.localize("arm5e.sheet.defense"),
    "data-option1": actor.data.data.characteristics.qik.value,
    "data-txtoption1": game.i18n.localize("arm5e.sheet.quickness"),
    "data-option2": actor.data.data.combat.ability,
    "data-txtoption2": game.i18n.localize("arm5e.sheet.ability"),
    "data-option3": actor.data.data.combat.dfn,
    "data-txtoption3": game.i18n.localize("arm5e.sheet.attack"),
  };
}

function getDatasetForDamage(actor) {
  return {
    "data-roll": "combat",
    "data-name": game.i18n.localize("arm5e.sheet.soak"),
    "data-option1": actor.data.data.characteristics.sta.value,
    "data-txtoption1": game.i18n.localize("arm5e.sheet.stamina"),
    "data-option2": actor.data.data.combat.prot,
    "data-txtoption2": game.i18n.localize("arm5e.sheet.protection"),
  };
}

function getDatasetForSoak(actor) {
  return {
    "data-roll": "combat",
    "data-name": game.i18n.localize("arm5e.sheet.soak"),
    "data-option1": actor.data.data.characteristics.sta.value,
    "data-txtoption1": game.i18n.localize("arm5e.sheet.stamina"),
    "data-option2": actor.data.data.combat.prot,
    "data-txtoption2": game.i18n.localize("arm5e.sheet.protection"),
  };
}

function getConfidenceButton(data, actorId) {
  if (
    !(
      game.users.get(game.userId).isGM ||
      game.users.get(game.userId).data.character == actorId
    )
  ) {
    return;
  }

  // confidence has been used already => no button
  if (
    !data?.message?.flags?.arm5e ||
    (data.message.flags.arm5e.usedConf ?? 0) >=
      data.message.flags.arm5e?.confScore
  ) {
    return false;
  }

  let title = game.i18n.localize("arm5e.messages.useConf");
  let divide = data.message.flags.arm5e.divide;
  const useConfButton = $(
    `<button class="dice-confidence chat-button" data-divide="${divide}" data-msg-id="${data.message._id}" data-actor-id="${actorId}"><i class="fas fa-user-plus" title="${title}" ></i></button>`
  );
  // Handle button clicks
  useConfButton.click((ev) => useConfidence(ev));
  return useConfButton;
}

function getDefenseButton(data) {
  if (
    !messageInHeader(data.message, game.i18n.localize("arm5e.sheet.attack"))
  ) {
    return false;
  }
  let title = game.i18n.localize("arm5e.sheet.defense");
  const buttonDefense = $(
    `<button class="dice-confidence chat-button" data-msg-id="${data.message._id}"><i class="fas fa-user-shield" title="${title}" ></i></button>`
  );

  buttonDefense.click((evt) => {
    evt.preventDefault();
    const actor = getActorFromToken();
    const datasetForDefense = {
      ...getDatasetForDefense(actor),
      "data-msg-id": data.message._id,
      "data-actor-id": actor.id,
      "data-contest": JSON.parse(data.message.roll).total,
    };
    Object.keys(datasetForDefense).forEach((key) =>
      $(evt.target).attr(key, datasetForDefense[key])
    );
    actor.sheet._onRoll($(evt.target).data());
  });
  return buttonDefense;
}

function getDamageButton(data) {
  if (
    !messageInHeader(data.message, game.i18n.localize("arm5e.sheet.defense"))
  ) {
    return false;
  }

  let title = game.i18n.localize("arm5e.sheet.damage");
  const buttonDamage = $(
    `<button class="dice-confidence chat-button" data-msg-id="${data.message._id}" ><i class="fas fa-fire" title="${title}" ></i></button>`
  );

  buttonDamage.click((evt) => {
    evt.preventDefault();
    const actor = getActorFromToken();
    const datasetForDamage = {
      ...getDatasetForDamage(actor),
      "data-msg-id": data.message._id,
      "data-actor-id": actor.id,
    };
    Object.keys(datasetForDamage).forEach((key) =>
      $(evt.target).attr(key, datasetForDamage[key])
    );
    actor.sheet._onCalculateDamage($(evt.target).data());
  });
  return buttonDamage;
}

function getSoakButton(data) {
  if (
    !messageInHeader(data.message, game.i18n.localize("arm5e.sheet.damage"))
  ) {
    return false;
  }

  let title = game.i18n.localize("arm5e.sheet.soak");

  const buttonSoak = $(
    `<button class="dice-confidence chat-button" data-msg-id="${data.message._id}" ><i class="fas fa-arrow-down" title="${title}" ></i></button>`
  );

  buttonSoak.click((evt) => {
    evt.preventDefault();
    const actor = getActorFromToken();
    const datasetForSoak = {
      ...getDatasetForSoak(actor),
      "data-msg-id": data.message._id,
      "data-actor-id": actor.id,
    };
    Object.keys(datasetForSoak).forEach((key) =>
      $(evt.target).attr(key, datasetForSoak[key])
    );
    actor.sheet._onSoakDamage($(evt.target).data());
  });
  return buttonSoak;
}

function messageInHeader(msg, searchString) {
  const flavor = (msg?.flavor || "").toLowerCase();
  return flavor.indexOf(`ars-chat-title">${searchString.toLowerCase()}`) > -1;
}

function getChatButtons(actorId, data) {
  const btnContainer = $(
    '<span class="btn-container" style="position:absolute; right:0; bottom:1px;"></span>'
  );

  const chatButtons = [
    getConfidenceButton(data, actorId),
    getDefenseButton(data, actorId),
    getDamageButton(data, actorId),
    getSoakButton(data, actorId),
  ].filter((b) => b);

  chatButtons.forEach((button) => btnContainer.append(button));

  return btnContainer;
}

export function addChatListeners(message, html, data) {
  const isDamage = messageInHeader(
    data.message,
    game.i18n.localize("arm5e.sheet.damage")
  );

  if (!message.isRoll && !isDamage) return;

  let actorId = data.message.speaker.actor;

  // old chat messages, ignore them
  if (!isDamage && data.message.flags.arm5e === undefined) {
    return;
  }

  html.find(".dice-total").append(getChatButtons(actorId, data));
}

async function useConfidence(ev) {
  ev.stopPropagation();
  const actorId = ev.currentTarget.dataset.actorId;
  const message = game.messages.get(ev.currentTarget.dataset.msgId);
  const actor = game.actors.get(actorId);

  if (
    (message.data.flags.arm5e.usedConf ?? 0) <
    message.data.flags.arm5e.confScore
  ) {
    if (await actor.useConfidencePoint()) {
      // add +3 * useConf to roll
      let bonus = 3;
      if (parseInt(ev.currentTarget.dataset.divide) === 2) {
        bonus /= 2;
      }

      // horrible code, TODO find a cleaner way.
      let total = $(ev.currentTarget).closest(".dice-total").text();
      let usedConf = message.data.flags.arm5e.usedConf + 1 || 1;
      let flavor = message.data.flavor;
      if (usedConf == 1) {
        flavor +=
          "<br/> --------------- <br/>" +
          game.i18n.localize("arm5e.dialog.button.roll") +
          " : ";
        if ((message.data.flags.arm5e.botchCheck ?? 0) == 0) {
          flavor += message.roll.dice[0].results[0].result;
        } else {
          flavor += 0;
        }
      }
      flavor +=
        "<br/>" + game.i18n.localize("arm5e.sheet.confidence") + " : + 3";

      log(false, flavor);
      let newContent = parseFloat(total) + bonus;
      const dieRoll = new Roll(newContent.toString(10));
      await dieRoll.evaluate({ async: true });
      let msgData = {};
      msgData.speaker = message.data.speaker;
      msgData.flavor = flavor;
      msgData.flags = {
        arm5e: {
          usedConf: usedConf,
          confScore: message.data.flags.arm5e.confScore,
        },
      };
      msgData.content = newContent;
      msgData.roll = message.data.roll;

      // updateData["data.flags.arm5e.usedConf"] = 1;
      // updateData["data.content"] = newContent;
      dieRoll.toMessage(msgData);
      // let msg = await ChatMessage.create(msgData);
      message.delete();
    }
  }
}
