/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

import { simpleDie, stressDie } from "../dice.js";
import { resetOwnerFields } from "../item/item-converter.js";
import { ARM5E } from "../metadata.js";
import { log, calculateWound, getDataset } from "../tools.js";
import { getActorFromToken } from "../helpers/tokens.js";
import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from "../helpers/effects.js";

import {
  findVoiceAndGesturesActiveEffects,
  modifyVoiceOrGesturesActiveEvent,
} from "../helpers/voiceAndGestures.js";

import {
  prepareRollVariables,
  prepareRollFields,
  cleanBooleans,
  updateCharacteristicDependingOnRoll,
  renderRollTemplate,
  chooseTemplate,
} from "../helpers/rollWindow.js";
import {
  getAttackAndDefenseMessagesFromChats,
  getDamageMessageFromChats,
} from "../helpers/chatMessages.js";

export class ArM5eActorSheet extends ActorSheet {
  // /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      dragDrop: [{ dragSelector: ".macro-ready" }],
      /*         classes: ["arm5e", "sheet", "actor"],
         template: "systems/arm5e/templates/actor/actor-pc-sheet.html",
         width: 1100,
         height: 900,
         tabs: [{
             navSelector: ".sheet-tabs",
             contentSelector: ".sheet-body",
             initial: "description"
         }]*/
    });
  }

  /* -------------------------------------------- */

  isItemDropAllowed(type) {
    return false;

    // template for future sheet:
    // switch (type) {
    //     case "weapon":
    //     case "armor":
    //     case "spell":
    //     case "vis":
    //     case "item":
    //     case "book":
    //     case "virtue":
    //     case "flaw":
    //     case "ability":
    //     case "abilityFamiliar":
    //     case "diaryEntry":
    //     case "might":
    //     case "mightFamiliar":
    //     case "speciality":
    //     case "distinctive":
    //     case "sanctumRoom":
    //     case "magicItem":
    //     case "personality":
    //     case "reputation":
    //     case "habitantMagi":
    //     case "habitantCompanion":
    //     case "habitantSpecialists":
    //     case "habitantHabitants":
    //     case "habitantHorses":
    //     case "habitantLivestock":
    //     case "possessionsCovenant":
    //     case "visSourcesCovenant":
    //     case "visStockCovenant":
    //     case "magicalEffect":
    //     case "baseEffect":
    //     case "calendarCovenant":
    //     case "incomingSource":
    //     case "laboratoryText":
    //     case "mundaneBook":
    //         return true;
    //     default:
    //         return false;
    // }
  }

  isActorDropAllowed(type) {
    return false;
    // template for future sheet:
    // switch (type) {
    //     case "player":
    //     case "npc":
    //     case "laboratory":
    //     case "covenant":
    //     case "magicCodex":
    //         return true;
    //     default:
    //         return false;
    // }
  }

  // tells whether or not a type of item needs to be converted when dropped to a specific sheet.
  needConversion(type) {
    return false;
  }

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = context.actor.data;

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = actorData.data;
    context.flags = actorData.flags;

    context.metadata = CONFIG.ARM5E;

    context.data.dtypes = ["String", "Number", "Boolean"];

    // Xzotl : not sure what this was used for
    // for (let attr of Object.values(context.data.attributes)) {
    //   attr.isCheckbox = attr.dtype === "Boolean";
    // }

    if (actorData.type == "player" || actorData.type == "npc") {
      context.data.world = {};
      if (
        context.data.charType.value == "magusNPC" ||
        context.data.charType.value == "magus"
      ) {
        // Arts icons style
        context.artsIcons = game.settings.get("arm5e", "artsIcons");
        context.data.world.labs = game.actors
          .filter((a) => a.type == "laboratory")
          .map(({ name, id }) => ({
            name,
            id,
          }));
        if (context.data.sanctum) {
          let lab = context.data.world.labs.filter(
            (c) => c.name == context.data.sanctum.value
          );
          if (lab.length > 0) {
            context.data.sanctum.linked = true;
            context.data.sanctum.actorId = lab[0].id;
          } else {
            context.data.sanctum.linked = false;
          }
        }
      }

      context.data.world.covenants = game.actors
        .filter((a) => a.type == "covenant")
        .map(({ name, id }) => ({
          name,
          id,
        }));
      if (context.data.covenant) {
        let cov = context.data.world.covenants.filter(
          (c) => c.name == context.data.covenant.value
        );
        if (cov.length > 0) {
          context.data.covenant.linked = true;
          context.data.covenant.actorId = cov[0].id;
        } else {
          context.data.covenant.linked = false;
        }
      }
    }
    context.devMode = game.modules
      .get("_dev-mode")
      ?.api?.getPackageDebugValue(ARM5E.MODULE_ID);
    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(this.actor.effects);
    if (context.data?.arts?.voiceAndGestures) {
      context.data.arts.voiceAndGestures = findVoiceAndGesturesActiveEffects(
        this.actor.effects
      );
    }
    this._prepareCharacterItems(context);

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(sheetData) {
    //let actorData = sheetData.actor.data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;
    // Render the linked actor sheet for viewing/editing prior to the editable check.
    html.find(".actor-link").click(this._onActorRender.bind(this));

    // Add Inventory Item
    html.find(".item-create").click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find(".item-edit").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
      // const item = this.actor.items.get(li.data("itemId"))
      item.sheet.render(true);
    });

    html.find(".increase-tech").click((event) => {
      const element = $(event.currentTarget).parents(".art");
      this._increaseArt("techniques", element[0].dataset.attribute);
    });
    html.find(".decrease-tech").click((event) => {
      const element = $(event.currentTarget).parents(".art");
      this._deccreaseArt("techniques", element[0].dataset.attribute);
    });

    html.find(".increase-form").click((event) => {
      const element = $(event.currentTarget).parents(".art");
      this._increaseArt("forms", element[0].dataset.attribute);
    });
    html.find(".decrease-form").click((event) => {
      const element = $(event.currentTarget).parents(".art");
      this._deccreaseArt("forms", element[0].dataset.attribute);
    });

    // Quick edit of Item from inside Actor sheet
    html.find(".quick-edit").change((event) => {
      const li = $(event.currentTarget).parents(".item");
      let field = $(event.currentTarget).attr("name");
      let itemId = li.data("itemId");
      const item = this.actor.getEmbeddedDocument("Item", itemId);
      let value = event.target.value;
      if ($(event.currentTarget).attr("data-dtype") === "Number") {
        value = Number(event.target.value);
      } else if ($(event.currentTarget).attr("data-dtype") === "Boolean") {
        // let oldValue = getProperty(item, "data.data." + field);;
        let oldValue = item.data.data[[field]];
        value = !oldValue;
      }

      this.actor.updateEmbeddedDocuments("Item", [
        {
          _id: itemId,
          data: {
            [field]: value,
          },
        },
      ]);
    });

    // Delete Inventory Item
    html.find(".item-delete").click((ev) => {
      const li = $(ev.currentTarget).parents(".item");
      let itemId = li.data("itemId");
      itemId = itemId instanceof Array ? itemId : [itemId];
      this.actor.deleteEmbeddedDocuments("Item", itemId, {});
      li.slideUp(200, () => this.render(false));
    });

    // Generate abilities automatically
    html
      .find(".abilities-generate")
      .click(this._onGenerateAbilities.bind(this));

    html.find(".rest").click((ev) => {
      if (this.actor.data.type === "player" || this.actor.data.type === "npc") {
        this.actor.rest();
      }
    });

    html.find(".sortable").click((ev) => {
      const listName = ev.currentTarget.dataset.list;
      let val = this.actor.getFlag("arm5e", "sorting", listName);
      if (val === undefined) {
        this.actor.setFlag("arm5e", "sorting", {
          [listName]: true,
        });
      } else {
        this.actor.setFlag("arm5e", "sorting", {
          [listName]: !val[listName],
        });
      }
    });

    // Rollable abilities.
    html.find(".rollable").click(this._onRoll.bind(this));

    html.find(".pick-covenant").click(this._onPickCovenant.bind(this));
    html.find(".soak-damage").click(this._onSoakDamage.bind(this));
    html.find(".damage").click(this._onCalculateDamage.bind(this));
    html
      .find(".voice-and-gestures")
      .change(this._onSelectVoiceAndGestures.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find("li.item").each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }

    // Active Effect management
    html
      .find(".effect-control")
      .click((ev) => onManageActiveEffect(ev, this.actor));
  }

  async _increaseArt(type, art) {
    let oldXp = this.actor.data.data.arts[type][art].xp;
    let updateData = {};
    updateData[`data.arts.${type}.${art}.xp`] =
      ((this.actor.data.data.arts[type][art].derivedScore + 1) *
        (this.actor.data.data.arts[type][art].derivedScore + 2)) /
      2;
    await this.actor.update(updateData, {});
    let newXp = this.actor.data.data.arts[type][art].xp;
    let delta = newXp - oldXp;
    console.log(`Added ${delta} xps from ${oldXp} to ${newXp}`);
  }

  async _deccreaseArt(type, art) {
    if (this.actor.data.data.arts[type][art].derivedScore != 0) {
      let oldXp = this.actor.data.data.arts[type][art].xp;
      let updateData = {};
      updateData[`data.arts.${type}.${art}.xp`] =
        ((this.actor.data.data.arts[type][art].derivedScore - 1) *
          this.actor.data.data.arts[type][art].derivedScore) /
        2;

      await this.actor.update(updateData, {});
      let newXp = this.actor.data.data.arts[type][art].xp;
      let delta = newXp - oldXp;
      console.log(`Removed ${delta} xps from ${oldXp} to ${newXp} total`);
    }
  }

  async _onActorRender(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const id = header.dataset.actorid;
    const actor = game.actors.get(id);
    actor.sheet.render(true);
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = [
      {
        name: name,
        type: type,
        data: foundry.utils.deepClone(header.dataset),
      },
    ];
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData[0].data["type"];

    // Finally, create the item!
    // console.log("Add item");
    // console.log(itemData);

    let newItem = await this.actor.createEmbeddedDocuments(
      "Item",
      itemData,
      {}
    );

    newItem[0].sheet.render(true);
    return newItem;
  }

  /* Handle covenant pick */
  async _onPickCovenant(event) {
    event.preventDefault();
    const element = event.currentTarget;
    log("false", this.actor.data);
    var actor = this.actor;
    let template = "systems/arm5e/templates/generic/simpleListPicker.html";
    renderTemplate(template, this.actor).then(function (html) {
      new Dialog(
        {
          title: game.i18n.localize("arm5e.dialog.chooseCovenant"),
          content: html,
          buttons: {
            yes: {
              icon: "<i class='fas fa-check'></i>",
              label: `Yes`,
              callback: (html) => setCovenant(html, actor),
            },
            no: {
              icon: "<i class='fas fa-ban'></i>",
              label: `Cancel`,
              callback: null,
            },
          },
        },
        {
          jQuery: true,
          height: "140px",
          classes: ["arm5e-dialog", "dialog"],
        }
      ).render(true);
    });
  }

  async _onSoakDamage(html, actor) {
    const messageDamage = getDamageMessageFromChats(game, html.msgId);
    const damage = parseInt($(messageDamage?.data?.content).text()) || 0;
    const extraData = {
      damage,
      modifier: 0,
    };

    const element = event.currentTarget;
    var actor = getActorFromToken();
    log("false", actor.data);

    const data = {
      actor,
      extraData,
    };
    let template = "systems/arm5e/templates/actor/parts/actor-soak.html";
    renderTemplate(template, data).then(function (html) {
      new Dialog(
        {
          title: game.i18n.localize("arm5e.dialog.woundCalculator"),
          content: html,
          buttons: {
            yes: {
              icon: "<i class='fas fa-check'></i>",
              label: `Yes`,
              callback: (html) => setWounds(html, actor),
            },
            no: {
              icon: "<i class='fas fa-ban'></i>",
              label: `Cancel`,
              callback: null,
            },
          },
        },
        {
          jQuery: true,
          height: "140px",
          classes: ["arm5e-dialog", "dialog"],
        }
      ).render(true);
    });
  }

  async _onSelectVoiceAndGestures(event) {
    event.preventDefault();
    const name = $(event.target).attr("name").split(".").pop();
    await modifyVoiceOrGesturesActiveEvent(this, name, $(event.target).val());
  }

  async _onCalculateDamage(html, actor) {
    event.preventDefault();
    const { messageAttack, messageDefense } =
      getAttackAndDefenseMessagesFromChats(game, html.msgId);
    const attack = parseInt(messageAttack?.data?.content || "0");
    const defense = parseInt(messageDefense?.data?.content || "0");
    const advantage = attack - defense;

    const extraData = {
      advantage,
      modifier: 0,
    };

    const element = event.currentTarget;
    log("false", this.actor.data);
    var actor = this.actor;

    const data = {
      actor,
      extraData,
    };
    let template =
      "systems/arm5e/templates/actor/parts/actor-calculateDamage.html";
    renderTemplate(template, data).then(function (html) {
      new Dialog(
        {
          title: game.i18n.localize("arm5e.dialog.damageCalculator"),
          content: html,
          buttons: {
            yes: {
              icon: "<i class='fas fa-check'></i>",
              label: `Yes`,
              callback: (html) => calculateDamage(html, actor),
            },
            no: {
              icon: "<i class='fas fa-ban'></i>",
              label: `Cancel`,
              callback: null,
            },
          },
        },
        {
          jQuery: true,
          height: "140px",
          classes: ["arm5e-dialog", "dialog"],
        }
      ).render(true);
    });
  }

  async _onGenerateAbilities(event) {
    let charType = this.actor.data.data.charType.value;
    let updateData = {};
    if (charType === "magus" || charType === "magusNPC") {
      let abilities = this.actor.items.filter((i) => i.type == "ability");
      let newAbilities = [];
      for (let [key, a] of Object.entries(CONFIG.ARM5E.character.abilities)) {
        let localizedA = game.i18n.localize(a);
        // check if the ability already exists in the Actor
        let abs = abilities.filter(
          (ab) => ab.name == localizedA || ab.name === localizedA + "*"
        );

        if (abs.length == 0) {
          log(false, `Did not find ${game.i18n.localize(a)}, creating it...`);
          const itemData = {
            name: localizedA,
            type: "ability",
          };
          // First, check if the Ability is found in the world
          abs = game.items.filter(
            (i) =>
              i.type === "ability" &&
              (i.name === localizedA || i.name === localizedA + "*")
          );
          if (abs.length == 0) {
            // Then, check if the Abilities compendium exists
            let abPack = game.packs.filter(
              (p) =>
                p.metadata.package === "arm5e" &&
                p.metadata.name === "abilities"
            );
            const documents = await abPack[0].getDocuments();
            for (let doc of documents) {
              if (doc.name === localizedA || doc.name === localizedA + "*") {
                itemData.data = foundry.utils.deepClone(doc.data.data);
                break;
              }
            }
          } else {
            itemData.data = foundry.utils.deepClone(abs[0].data.data);
          }

          newAbilities.push(itemData);
        } else {
          // found the ability, assign its Id
          updateData[`data.laboratory.abilitiesSelected.${key}.abilityID`] =
            abs[0].id;
        }
      }
      this.actor.update(updateData, {});
      this.actor.createEmbeddedDocuments("Item", newAbilities, {});
    }
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onRoll(event) {
    const dataset = getDataset(event);

    if (this.actor.data.data.wounds.dead.number > 0) {
      ui.notifications.info(game.i18n.localize("arm5e.notification.dead"), {
        permanent: true,
      });
      return;
    }
    if (dataset.roll != "char") {
      if (this.actor.data.data.fatigue.unconscious.level.value == true) {
        ui.notifications.info(
          game.i18n.localize("arm5e.notification.unconscious"),
          {
            permanent: true,
          }
        );
        return;
      }
    }

    prepareRollVariables(dataset, this.actor.data, this.actor.effects);
    prepareRollFields(dataset, this.actor.data);
    cleanBooleans(dataset, this.actor.data);

    var actor = this.actor;
    this.actor.data.data.charmetadata = ARM5E.character.characteristics;
    updateCharacteristicDependingOnRoll(dataset, this.actor.data);

    const template = chooseTemplate(dataset);
    renderRollTemplate(dataset, template, actor, this.actor.data);
  }

  // Overloaded core functions (TODO: review at each Foundry update)

  /**
   * Handle the final creation of dropped Item data on the Actor.
   * This method is factored out to allow downstream classes the opportunity to override item creation behavior.
   * @param {object[]|object} itemData     The item data requested for creation
   * @return {Promise<Item[]>}
   * @private
   */
  async _onDropItemCreate(itemData) {
    itemData = itemData instanceof Array ? itemData : [itemData];
    let filtered = itemData.filter((e) => this.isItemDropAllowed(e.type));
    for (let item of filtered) {
      // log(false, "Before reset " + JSON.stringify(item.data));
      item = resetOwnerFields(item);
      // log(false, "After reset " + JSON.stringify(item.data));
    }

    return super._onDropItemCreate(filtered);
  }

  /**
   * Handle dropping of an actor reference or item data onto an Actor Sheet
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @return {Promise<Object>}    A data object which describes the result of the drop
   * @private
   * @override
   */
  async _onDropActor(event, data) {
    if (!super._onDropActor(event, data)) {
      return false;
    }
    let droppedActor;
    // if coming from a compendium, reject
    if (data.pack) {
      return false;
    } else if (data.id != undefined) {
      droppedActor = game.actors.get(data.id);
    } else {
      console.warn("No Id for actor dropped");
      return false;
    }
    // link both ways
    let res = await this._bindActor(droppedActor);
    let res2 = await droppedActor.sheet._bindActor(this.actor);
    return res && res2;
  }

  async _bindActor(actor) {
    return false;
  }
}

export async function setCovenant(selector, actor) {
  let actorUpdate = {};
  let found = selector.find(".SelectedItem");
  if (found.length > 0) {
    actorUpdate["data.covenant.value"] = found[0].value;
  }

  await actor.update(actorUpdate);
}

export async function setWounds(selector, actor) {
  const damageToApply = parseInt(selector.find('input[name$="damage"]').val());
  const modifier = parseInt(selector.find('input[name$="modifier"]').val());
  const prot = parseInt(
    selector.find('label[name$="prot"]').attr("value") || 0
  );
  const stamina = parseInt(
    selector.find('label[name$="stamina"]').attr("value") || 0
  );
  const damage = damageToApply - modifier - prot - stamina;
  const size = actor?.data?.data?.vitals?.siz?.value || 0;
  const typeOfWound = calculateWound(damage, size);
  if (typeOfWound === false) {
    ui.notifications.info(
      game.i18n.localize("arm5e.notification.notPossibleToCalculateWound"),
      {
        permanent: true,
      }
    );
    return false;
  }

  const title =
    '<h2 class="ars-chat-title">' +
    game.i18n.localize("arm5e.sheet.soak") +
    "</h2>";
  const messageDamage = `${game.i18n.localize(
    "arm5e.sheet.damage"
  )} (${damage})`;
  const messageStamina = `${game.i18n.localize(
    "arm5e.sheet.stamina"
  )} (${stamina})`;
  const messageProt = `${game.i18n.localize("arm5e.sheet.soak")} (${prot})`;
  const messageModifier = `${game.i18n.localize(
    "arm5e.sheet.modifier"
  )} (${modifier})`;
  const messageWound = typeOfWound
    ? game.i18n
        .localize("arm5e.messages.woundResult")
        .replace(
          "$typeWound$",
          game.i18n.localize(
            "arm5e.messages.wound." + typeOfWound.toLowerCase()
          )
        )
    : game.i18n.localize("arm5e.messages.noWound");

  ChatMessage.create({
    content: `<h4 class="dice-total">${messageWound}</h4>`,
    flavor: `${title} ${messageDamage}<br/> ${messageStamina}<br/> ${messageProt}<br/> ${messageModifier}<br/>`,
    speaker: ChatMessage.getSpeaker({
      actor,
    }),
  });

  if (typeOfWound) {
    let actorUpdate = {
      data: {
        wounds: {
          [typeOfWound]: {
            number: {
              value: actor.data.data.wounds[typeOfWound].number.value + 1,
            },
          },
        },
      },
    };

    await actor.update(actorUpdate);
  }
}

export async function calculateDamage(selector, actor) {
  const strenght = parseInt(
    selector.find('label[name$="strenght"]').attr("value") || 0
  );
  const weapon = parseInt(
    selector.find('label[name$="weapon"]').attr("value") || 0
  );
  const advantage = parseInt(selector.find('input[name$="advantage"]').val());
  const modifier = parseInt(selector.find('input[name$="modifier"]').val());
  const damage = strenght + weapon + advantage + modifier;
  const title =
    '<h2 class="ars-chat-title">' +
    game.i18n.localize("arm5e.sheet.damage") +
    "</h2>";
  const messageStrenght = `${game.i18n.localize(
    "arm5e.sheet.strength"
  )} (${strenght})`;
  const messageWeapon = `${game.i18n.localize(
    "arm5e.sheet.damage"
  )} (${weapon})`;
  const messageAdvantage = `${game.i18n.localize(
    "arm5e.sheet.advantage"
  )} (${advantage})`;
  const messageModifier = `${game.i18n.localize(
    "arm5e.sheet.modifier"
  )} (${modifier})`;
  const messageDamage = `<h4 class="dice-total">${damage}</h4>`;
  ChatMessage.create({
    content: messageDamage,
    flavor: `${title} ${messageStrenght}<br/> ${messageWeapon}<br/> ${messageAdvantage}<br/> ${messageModifier}<br/>`,
    speaker: ChatMessage.getSpeaker({
      actor,
    }),
  });
}
