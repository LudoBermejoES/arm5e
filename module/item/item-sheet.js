import { log } from "../tools.js";
import ArM5eActiveEffect from "../helpers/active-effects.js";
/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ArM5eItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["arm5e", "sheet", "item"],
      width: 654,
      height: 750,
      // dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}],
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }

  /** @override */
  get template() {
    const path = "systems/arm5e/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    return `${path}/item-${this.item.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = await super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;

    // Add the item's data to context.system for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;

    context.config = CONFIG.ARM5E;
    if (itemData.type == "weapon") {
      let abilitiesSelect = {};
      const temp = {
        id: "",
        name: "N/A"
      };
      abilitiesSelect["a0"] = temp;
      if (this.actor != null) {
        // find the actor habilities and create the select
        for (let [key, i] of this.actor.system.items.entries()) {
          if (i.type === "ability") {
            const temp = {
              id: i.id,
              name: i.name
            };
            //abilitiesSelect.push(temp);
            abilitiesSelect["a" + key] = temp;
          }
        }
      }

      context.system.abilities = abilitiesSelect;

      //console.log("item-sheet get data weapon")
      //console.log(data)
    } else if (itemData.type == "ability" || itemData.type == "diaryEntry") {
      context.abilityKeysList = CONFIG.ARM5E.ALL_ABILITIES;
    }

    context.ui = { flavor: "Neutral" };
    if (this.item.isOwned) {
      switch (this.actor.type) {
        case "player":
          context.ui.flavor = "PC";
          break;
        case "npc":
          context.ui.flavor = "NPC";
          break;
        case "beast":
          context.ui.flavor = "Beast";
          break;
        case "covenant":
          context.ui.flavor = "Covenant";
          break;
        case "magicCodex":
          context.ui.flavor = "Codex";
          break;
        case "laboratory":
          context.ui.flavor = "Lab";
          break;
        default:
          break;
      }
    }

    if (itemData.type == "virtue" || itemData.type == "flaw") {
      if (this.item.isOwned) {
        context.system.effectCreation = false;
        switch (context.item.parent.type) {
          case "laboratory":
            context.config.virtueFlawTypes.available = {
              ...context.config.virtueFlawTypes.laboratory,
              ...context.config.virtueFlawTypes.all
            };
            break;
          case "covenant":
            context.config.virtueFlawTypes.available = {
              ...context.config.virtueFlawTypes.covenant,
              ...context.config.virtueFlawTypes.all
            };
            break;
          case "player":
          case "npc":
            context.config.virtueFlawTypes.available = {
              ...context.config.virtueFlawTypes.character,
              ...context.config.virtueFlawTypes.all
            };
            break;
        }
      } else {
        context.system.effectCreation = true;
        context.config.virtueFlawTypes.available = {
          ...context.config.virtueFlawTypes.character,
          ...context.config.virtueFlawTypes.laboratory,
          ...context.config.virtueFlawTypes.covenant,
          ...context.config.virtueFlawTypes.all
        };
      }
    }

    context.metagame = game.settings.get("arm5e", "metagame");

    context.devMode = game.modules
      .get("_dev-mode")
      ?.api?.getPackageDebugValue(CONFIG.ARM5E.MODULE_ID);

    // Prepare active effects
    context.effects = ArM5eActiveEffect.prepareActiveEffectCategories(this.item.effects);

    log(false, "item-sheet get data");
    log(false, context);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 500;
    sheetBody.css("height", bodyHeight);
    return position;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // data-id and data-attr needed
    html.find(".increase-ability").click(event => this._increaseScore(this.item));
    html.find(".decrease-ability").click(event => this._deccreaseScore(this.item));
    html.find(".increase-mastery").click(event => this._increaseMastery(this.item));
    html.find(".decrease-mastery").click(event => this._deccreaseMastery(this.item));
    html
      .find(".default-characteristic")
      .change(event => this._onSelectDefaultCharacteristic(this.item, event));
    html.find(".item-enchant").click(event => this._enchantItemQuestion(this.item));
    html.find(".ability-option").change(event => this._cleanUpOption(this.item, event));

    // Active Effect management
    html.find(".effect-control").click(ev => ArM5eActiveEffect.onManageActiveEffect(ev, this.item));
  }

  async _onSelectDefaultCharacteristic(item, event) {
    event.preventDefault();
    await item.update(
      {
        system: {
          defaultChaAb: $(".default-characteristic")
            .find("option:selected")
            .val()
        }
      },
      {}
    );
    return false;
  }

  async _increaseMastery(item) {
    if (item.type != "spell") {
      return;
    }
    let oldXp = item.system.xp;
    let newXp = Math.round(((item.system.mastery + 1) * (item.system.mastery + 2) * 5) / 2);

    await item.update(
      {
        system: {
          xp: newXp
        }
      },
      {}
    );
    let delta = newXp - oldXp;
    console.log(`Added ${delta} xps from ${oldXp} to ${newXp}`);
  }
  async _deccreaseMastery(item) {
    if (item.type != "spell") {
      return;
    }
    if (item.system.mastery != 0) {
      let oldXp = item.system.xp;
      let newXp = Math.round(((item.system.mastery - 1) * item.system.mastery * 5) / 2);
      await item.update(
        {
          system: {
            xp: newXp
          }
        },
        {}
      );
      let delta = newXp - oldXp;
      console.log(`Removed ${delta} xps from ${oldXp} to ${newXp} total`);
    }
  }

  async _increaseScore(item) {
    let oldXp = item.system.xp;
    let newXp = Math.round(
      ((item.system.derivedScore + 1) * (item.system.derivedScore + 2) * 5) /
        (2 * item.system.xpCoeff)
    );

    await item.update(
      {
        system: {
          xp: newXp
        }
      },
      {}
    );
    let delta = newXp - oldXp;
    console.log(`Added ${delta} xps from ${oldXp} to ${newXp}`);
  }
  async _deccreaseScore(item) {
    if (item.system.derivedScore != 0) {
      let oldXp = item.system.xp;
      let newXp = Math.round(
        ((item.system.derivedScore - 1) * item.system.derivedScore * 5) / (2 * item.system.xpCoeff)
      );
      await item.update(
        {
          system: {
            xp: newXp
          }
        },
        {}
      );
      let delta = newXp - oldXp;
      console.log(`Removed ${delta} xps from ${oldXp} to ${newXp} total`);
    }
  }

  async _cleanUpOption(item, event) {
    event.preventDefault();
    if (event.currentTarget.value == "") {
      event.currentTarget.value = "optionName";
    } else {
      // remove any non alphanumeric character
      event.currentTarget.value = event.currentTarget.value.replace(/[^a-zA-Z0-9]/gi, "");
    }
    await item.update(
      {
        system: {
          option: event.currentTarget.value
        }
      },
      {}
    );
  }

  async _enchantItemQuestion(item) {
    const question = game.i18n.localize("arm5e.dialog.enchant-question");
    new Dialog({
      title: game.i18n.localize("arm5e.sheet.enchantment"),
      content: `<p>${question}</p>`,
      buttons: {
        yes: {
          icon: "<i class='fas fa-check'></i>",
          label: game.i18n.localize("arm5e.dialog.button.yes"),
          callback: () => this._onEnchant(item)
        },
        no: {
          icon: "<i class='fas fa-ban'></i>",
          label: game.i18n.localize("arm5e.dialog.button.no"),
          callback: null
        }
      }
    }).render(true);
  }

  async _onEnchant(item) {
    var codex = game.actors.filter(a => a.type === "magicCodex");

    if (codex.length === 0) {
      ui.notifications.warn(game.i18n.localize("arm5e.notification.codex.enchant"), {
        permanent: false
      });
      return;
    }
    this.item.system.list = codex[0].items.filter(i => i.type === "enchantment");

    let template = "systems/arm5e/templates/generic/simpleListPicker.html";
    var item = this.item;
    renderTemplate(template, this.item).then(function(html) {
      new Dialog(
        {
          title: game.i18n.localize("arm5e.sheet.enchantment"),
          content: html,
          buttons: {
            yes: {
              icon: "<i class='fas fa-check'></i>",
              label: `Yes`,
              callback: html => createMagicItem(html, item, codex[0])
            },
            no: {
              icon: "<i class='fas fa-ban'></i>",
              label: `Cancel`,
              callback: null
            }
          }
        },
        {
          height: "140px",
          classes: ["arm5e-dialog", "dialog"]
        }
      ).render(true);
    });
  }

  // /** @inheritdoc */
  // async _onDrop(event) {
  //   return {};
  // }
}

export async function createMagicItem(html, item, codex) {
  let found = html.find(".SelectedItem");
  if (found.length === 0) {
    return null;
  } else {
    log(false, found[0].value);
    const enchantment = codex.items.get(found[0].value).system;
    let itemData = [
      {
        name: item.name,
        type: "magicItem",
        system: foundry.utils.deepClone(enchantment.system)
      }
    ];

    // prepend the item description
    // itemData[0].system.enchantmentName = enchantment.name;
    itemData[0].system.description =
      `<p>${item.system.description}</p>` + itemData[0].system.description;
    let item = await ArM5eItemSheet.createDocument();

    log(false, itemData);
  }
}
