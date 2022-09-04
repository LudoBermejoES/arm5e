import { getLabUpkeepCost, log } from "../tools.js";
import { ArM5ePCActor } from "../actor/actor.js";
/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ArM5eItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const system = this.system;
    if (this.isOwned && this.actor.system == undefined) {
      // this is a call from constructor, it will be called again with actor data initialied
      log(false, `Owned Item : ${this.id} : ${this.name}, actor.data= ${this.actor.data}`);
      return;
    }
    const owner = this.actor ? this.actor : {};
    if (this.isOwned) {
      if (this.type == "weapon" && this.actor != null) {
        let abilitiesSelect = {};

        const temp = {
          id: "",
          name: "N/A"
        };
        abilitiesSelect["a0"] = temp;

        // find the actor abilities and create the select
        for (let [key, i] of Object.entries(owner.items)) {
          if (i.type === "ability") {
            const temp = {
              id: i.id,
              name: i.name
            };
            //abilitiesSelect.push(temp);
            abilitiesSelect["a" + key] = temp;
          }
        }

        system.abilities = abilitiesSelect;
      }

      // compute mastery score
      if (this.type == "spell") {
        this.system.mastery = ArM5ePCActor.getAbilityScoreFromXp(this.system.xp);
        this.system.experienceNextLevel =
          ((parseInt(this.system.mastery) + 1) * (parseInt(this.system.mastery) + 2) * 5) / 2 -
          this.system.xp;
      }
    }

    if (this._needLevelComputation()) {
      if (this._isNotMigrated()) {
        return;
      }
      // if base level is 0, the "magicRulesEnforcement" has just been enabled, try to compute the base level
      let recomputeSpellLevel = true;
      if (system.baseLevel == 0 && system.general === false) {
        let newBaseLevel = this.system.level;
        let shouldBeRitual = false;
        if (system.range.value) {
          newBaseLevel = this._addSpellMagnitude(
            newBaseLevel,
            -CONFIG.ARM5E.magic.ranges[system.range.value].impact
          );
        }
        if (system.duration.value) {
          newBaseLevel = this._addSpellMagnitude(
            newBaseLevel,
            -CONFIG.ARM5E.magic.durations[system.duration.value].impact
          );
        }
        if (system.target.value) {
          newBaseLevel = this._addSpellMagnitude(
            newBaseLevel,
            -CONFIG.ARM5E.magic.targets[system.target.value].impact
          );
        }
        if (system.complexity) {
          newBaseLevel = this._addSpellMagnitude(newBaseLevel, -system.complexity);
        }
        if (system.enhancingRequisite) {
          newBaseLevel = this._addSpellMagnitude(newBaseLevel, -system.enhancingRequisite);
        }
        if (system.targetSize) {
          newBaseLevel = this._addSpellMagnitude(newBaseLevel, -system.targetSize);
        }
        if (newBaseLevel < 1) {
          // ui.notifications.warn(`Spell named \"${this.name}\" is not strictly following magic theory, its level will be recomputed using a base effect of level 1`, {
          //     permanent: true
          // });
          newBaseLevel = 1;
          this.system.baseLevel = 1;
        } else {
          this.system.baseLevel = newBaseLevel;

          recomputeSpellLevel = false;
        }
        if (this._id != undefined) {
          this.update(
            {
              "system.baseLevel": newBaseLevel
            },
            {}
          );
        }
      }
      if (recomputeSpellLevel) {
        let effectLevel = this.system.baseLevel;

        if (system.range.value) {
          effectLevel = this._addSpellMagnitude(
            effectLevel,
            CONFIG.ARM5E.magic.ranges[system.range.value].impact
          );
        }
        if (system.duration.value) {
          effectLevel = this._addSpellMagnitude(
            effectLevel,
            CONFIG.ARM5E.magic.durations[system.duration.value].impact
          );
        }
        if (system.target.value) {
          effectLevel = this._addSpellMagnitude(
            effectLevel,
            CONFIG.ARM5E.magic.targets[system.target.value].impact
          );
        }
        if (system.complexity) {
          effectLevel = this._addSpellMagnitude(effectLevel, system.complexity);
        }
        if (system.targetSize) {
          effectLevel = this._addSpellMagnitude(effectLevel, system.targetSize);
        }
        if (system.enhancingRequisite) {
          effectLevel = this._addSpellMagnitude(effectLevel, system.enhancingRequisite);
        }

        if (
          this.type == "enchantment" ||
          (this.type == "laboratoryText" && this.system.type == "enchantment")
        ) {
          effectLevel += parseInt(system.effectfrequency);
          if (system.penetration % 2 == 1) {
            this.system.penetration += 1;
          }
          effectLevel += this.system.penetration / 2;

          if (system.maintainConc) {
            effectLevel += 5;
          }

          if (system.environmentalTrigger) {
            effectLevel += 3;
          }

          if (system.restrictedUse) {
            effectLevel += 3;
          }

          if (system.linkedTrigger) {
            effectLevel += 3;
          }
        } else {
          let shouldBeRitual = system.ritual;
          // Duration above moon are rituals and rituals are minimum level 20
          if (
            CONFIG.ARM5E.magic.durations[system.duration.value].impact > 3 ||
            system.target.value == "bound" ||
            effectLevel > 50
          ) {
            shouldBeRitual = true;
          }

          if (shouldBeRitual && effectLevel < 20) {
            effectLevel = 20;
          }
          this.system.ritual = shouldBeRitual;
        }
        this.system.level = effectLevel;
      }
      system.castingTotal = 0;
    }
    if (this.type == "labCovenant") {
      let pts = getLabUpkeepCost(system.upkeep);
      this.system.points = pts * CONFIG.ARM5E.lab.usage[system.usage].coeff;
    } else if (this.type == "magicItem") {
      this.system.maxLevel = 10 * this.system.materialBase * this.system.sizeMultiplier;
    }
    // log(false,"prepare-item");
    // log(false,itemData);
  }

  prepareDerivedData() {
    if (this.isOwned && this.actor == undefined) {
      // this is a call from constructor, it will be called again with actor data initialied
      log(false, `Owned Item : ${this.id} : ${this.name}, actor.data= ${this.actor.system}`);
      return;
    }
    // add category to ability

    if (this.type == "ability") {
      this.system.category = CONFIG.ARM5E.ALL_ABILITIES[this.system.key]?.category ?? "general";
    } else if (this.type == "diaryEntry") {
      const systemData = this.system;
      if (systemData.optionKey == undefined) {
        systemData.optionKey = "standard";
      }
      if (this.actor !== null && this.actor._isCharacter()) {
        const activityConfig = CONFIG.ARM5E.activities.generic[systemData.activity];

        if (systemData.applied) {
          // keep the existing quality at the time of applying
          // log(false, `Use source quality (${systemData.sourceQuality}) as base for ${this.name}`);
          systemData.baseQuality = systemData.sourceQuality;
        } else {
          // only recompute source quality if the entry is not applied yet
          switch (systemData.activity) {
            case "training": {
              if (systemData.teacher.id === null) {
                systemData.baseQuality = Number(systemData.teacher.score) + 3;
              } else {
                systemData.baseQuality = 0;
                if (
                  Object.values(systemData.progress.abilities).length +
                    Object.values(systemData.progress.spells).length ===
                  1
                ) {
                  if (Object.values(systemData.progress.abilities).length > 0) {
                    systemData.baseQuality =
                      Number(systemData.progress.abilities[0].teacherScore) + 3;
                  } else {
                    systemData.baseQuality = Number(systemData.progress.spells[0].teacherScore) + 3;
                  }
                }
              }
              break;
            }
            case "teaching": {
              systemData.baseQuality = systemData.teacher.teaching + systemData.teacher.com + 3;
              if (systemData.teacher.applySpec) {
                systemData.baseQuality++;
              }
              break;
            }
            case "practice":
            case "exposure": {
              systemData.baseQuality = activityConfig.source.default;
              break;
            }
            case "adventuring": {
              systemData.baseQuality = systemData.sourceQuality;
              break;
            }
            case "hermeticApp":
            case "childhood":
            case "laterLife":
            case "laterLifeMagi":
              {
                systemData.baseQuality = systemData.sourceQuality;
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }

  _needLevelComputation() {
    let enforceEnchantmentLevel =
      this.type == "laboratoryText" &&
      (this.system.type == "spell" || this.system.type == "enchantment");
    return (
      this.type == "magicalEffect" ||
      this.type == "enchantment" ||
      this.type == "spell" ||
      enforceEnchantmentLevel
    );
  }

  _isMagicalEffect() {
    return this.type == "magicalEffect" || this.type == "enchantment" || this.type == "spell";
  }

  // to tell whether a spell needs to be migrated
  _isNotMigrated() {
    if (
      this.system.range.value === undefined ||
      this.system.duration.value === undefined ||
      this.system.target.value === undefined
    ) {
      console.warn(
        `The spell ${this.name} has not been migrated, please trigger a manual migration!`
      );
      return true;
    }
    if (
      CONFIG.ARM5E.magic.ranges[this.system.range.value] === undefined ||
      CONFIG.ARM5E.magic.durations[this.system.duration.value] === undefined ||
      CONFIG.ARM5E.magic.targets[this.system.target.value] === undefined
    ) {
      // if those values are not defined, this spell hasn't been migrated, no need to attempt to compute anything

      console.warn(
        `The spell ${this.name} has not been migrated, please trigger a manual migration!`
      );
      return true;
    }
    return false;
  }

  // return a localize string of a magic effect attributes
  _getEffectAttributesLabel() {
    if (!this._isMagicalEffect()) return "";
    let label =
      "( " +
      this._getTechLabel() +
      " " +
      this._getFormLabel() +
      " " +
      this.system.level +
      " ) - " +
      game.i18n.localize("arm5e.spell.range.short") +
      ": " +
      game.i18n.localize(CONFIG.ARM5E.magic.ranges[this.system.range.value].label) +
      " " +
      game.i18n.localize("arm5e.spell.duration.short") +
      ": " +
      game.i18n.localize(CONFIG.ARM5E.magic.durations[this.system.duration.value].label) +
      " " +
      game.i18n.localize("arm5e.spell.target.short") +
      ": " +
      game.i18n.localize(CONFIG.ARM5E.magic.targets[this.system.target.value].label);
    return label;
  }

  _getTechLabel() {
    let label = CONFIG.ARM5E.magic.arts[this.system.technique.value].short;
    let techReq = Object.entries(this.system["technique-req"]).filter(r => r[1] === true);
    if (techReq.length > 0) {
      label += " (";
      techReq.forEach(key => {
        label += CONFIG.ARM5E.magic.arts[key[0]].short + " ";
      });
      // remove last whitespace
      label = label.substring(0, label.length - 1);
      label += ")";
    }
    return label;
  }

  _getFormLabel() {
    let label = CONFIG.ARM5E.magic.arts[this.system.form.value].short;
    let formReq = Object.entries(this.system["form-req"]).filter(r => r[1] === true);
    if (formReq.length > 0) {
      label += " (";
      formReq.forEach(key => {
        label += CONFIG.ARM5E.magic.arts[key[0]].short + " ";
      });
      // remove last whitespace
      label = label.substring(0, label.length - 1);
      label += ")";
    }

    return label;
  }

  _getTechniqueData(actorSystemData) {
    if (!this._isMagicalEffect()) return ["", 0];

    let label = CONFIG.ARM5E.magic.techniques[this.system.technique.value].label;
    let tech = 1000;
    let techReq = Object.entries(this.system["technique-req"]).filter(r => r[1] === true);
    if (techReq.length > 0) {
      label += " (";
      techReq.forEach(key => {
        tech = Math.min(tech, actorSystemData.arts.techniques[key[0]].finalScore);
        label += CONFIG.ARM5E.magic.arts[key[0]].short + " ";
      });
      // remove last whitespace
      label = label.substring(0, label.length - 1);
      label += ")";
      tech = Math.min(
        actorSystemData.arts.techniques[this.system.technique.value].finalScore,
        tech
      );
    } else {
      tech = actorSystemData.arts.techniques[this.system.technique.value].finalScore;
    }

    return [label, tech];
  }
  _getFormData(actorSystemData) {
    if (!this._isMagicalEffect()) return ["", 0];

    let label = CONFIG.ARM5E.magic.forms[this.system.form.value].label;
    let form = 1000;
    let formReq = Object.entries(this.system["form-req"]).filter(r => r[1] === true);
    if (formReq.length > 0) {
      label += " (";
      formReq.forEach(key => {
        form = Math.min(form, actorSystemData.arts.forms[key[0]].finalScore);
        label += CONFIG.ARM5E.magic.arts[key[0]].short + " ";
      });
      // remove last comma
      label = label.substring(0, label.length - 1);
      label += ")";
      form = Math.min(actorSystemData.arts.forms[this.system.form.value].finalScore, form);
    } else {
      form = actorSystemData.arts.forms[this.system.form.value].finalScore;
    }

    return [label, form];
  }

  _addSpellMagnitude(base, num) {
    if (num == 0) {
      return base;
    }
    // in case base is a string
    base = parseInt(base);
    if (num > 0) {
      // log(false, `Adding ${num} magnitudes from ${base}`);
      if (base + num <= 5) {
        return base + num;
      }
      let loop = num;
      let res = base;
      while (loop > 0) {
        if (res < 5) {
          res++;
        } else {
          res = res + 5;
        }
        loop--;
      }
      return res;
    } else {
      log(false, `Adding ${num} magnitudes from ${base}`);
      if (base + num <= 1) {
        return base + num;
      }
      let loop = num;
      let res = base;
      while (loop < 0) {
        if (res <= 5) {
          res--;
        } else {
          res = res - 5;
        }
        loop++;
      }
      log(false, `returns ${res}`);
      return res;
    }
  }

  _computeCastingTotal(owner, itemData) {
    if (owner.type != "player" && owner.type != "npc") {
      return 0;
    }
    let res = owner.system.characteristics.sta.value;
    let tech = 1000;
    let form = 1000;
    let focusBonus = 0;

    let techReq = Object.entries(itemData["technique-req"]).filter(r => r[1] === true);
    let formReq = Object.entries(itemData["form-req"]).filter(r => r[1] === true);

    if (techReq.length > 0) {
      techReq.forEach(key => {
        tech = Math.min(tech, owner.system.arts.techniques[key[0]].finalScore);
      });

      tech = Math.min(owner.system.arts.techniques[this.system.technique.value].finalScore, tech);
    } else {
      tech = owner.system.arts.techniques[this.system.technique.value].finalScore;
    }
    if (formReq.length > 0) {
      formReq.forEach(key => {
        form = Math.min(tech, owner.system.arts.forms[key[0]].finalScore);
      });
      form = Math.min(owner.system.arts.forms[this.system.form.value].finalScore, form);
    } else {
      form = owner.system.arts.forms[this.system.form.value].finalScore;
    }
    if (this.system.applyFocus) {
      res += tech + form + Math.min(tech, form);
    } else {
      res += tech + form;
    }
    if (this.system.mastery) {
      res += this.system.mastery;
    }

    // log(false, `Casting total: ${res}`)
    return res;
  }
  async _preCreate(data, options, userId) {
    await super._preCreate(data, options, userId);
    if (this._id === null) {
      if (this.type in CONFIG.ARM5E_DEFAULT_ICONS) {
        const img = CONFIG.ARM5E_DEFAULT_ICONS[this.type];
        if (img)
          await this.updateSource({
            img
          });
      }
    }
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  // TODOV10 needed?
  async roll() {
    // Basic template rendering data
    const token = this.actor.token;
    const item = this;
    const actorData = this.actor ? this.actor.system : {};
    const itemData = item.system;

    let roll = new Roll("d20+@abilities.str.mod", actorData);
    let label = `Rolling ${item.name}`;
    roll.roll().toMessage({
      speaker: ChatMessage.getSpeaker({
        actor: this.actor
      }),
      flavor: label
    });
  }
}
