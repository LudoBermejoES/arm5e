import ACTIVE_EFFECTS_TYPES from "../constants/activeEffectsTypes.js";
import ArM5eActiveEffect from "./active-effects.js";
import { log } from "../tools.js";

const ICON = "icons/magic/defensive/barrier-shield-dome-blue-purple.webp";

function getAuraActiveEffect(numericValue) {
  const label = `${game.i18n.localize("arm5e.sheet.levelAura")}`;

  const changeData = [
    {
      key: ACTIVE_EFFECTS_TYPES.spellcasting.subtypes.aura.key,
      value: numericValue,
      mode: CONST.ACTIVE_EFFECT_MODES.ADD
    }
  ];
  const activeEffectData = {
    label: label,
    icon: ICON,
    duration: {
      rounds: undefined
    },
    flags: {
      arm5e: {
        type: ["spellcasting"],
        subtype: ["aura"],
        option: [null],
        value: ["AURA"]
      }
    },
    changes: changeData,
    tint: "#000000"
  };

  return activeEffectData;
}

async function addEffect(actor, activeEffectData) {
  const ae = ArM5eActiveEffect.findAllActiveEffectsWithSubtype(actor.effects, "aura")[0];
  if (ae) {
    log(
      false,
      `AURA_MANAGEMENT Change aura for ${actor.name}, Aura impact: ${activeEffectData.changes[0].value}`
    );
    activeEffectData._id = ae.data._id;
    return await actor.updateEmbeddedDocuments("ActiveEffect", [activeEffectData]);
  }
  log(
    false,
    `AURA_MANAGEMENT Add aura for ${actor.name}, Aura impact: ${activeEffectData.changes[0].value}`
  );
  return await actor.createEmbeddedDocuments("ActiveEffect", [activeEffectData]);
}

async function modifyAuraActiveEffectForAllTokensInScene(scene, value, type) {
  if (!scene.active) {
    return;
  }
  const activeEffectData = getAuraActiveEffect(value);

  const tokens = scene.tokens.filter(token => token.actor);
  for (const token of tokens) {
    if (token.actor._isCharacter()) {
      if (token.isLinked) {
        const modifier = computeAuraModifier(token.actor.system.realmAlignment, value, type);
        // patch the active effect data
        activeEffectData.changes[0].value = modifier;
        await addEffect(token.actor, activeEffectData);
      } else {
        const modifier = computeAuraModifier(token.actor.system.realmAlignment, value, type);
        // patch the active effect data
        activeEffectData.changes[0].value = modifier;
        log(false, `Change aura for ${token.name}`);
        await addEffect(token.actor, activeEffectData);
      }
    }
  }
}

async function addActiveEffectAuraToActor(actor, value, type) {
  const auraEffect = getAuraActiveEffect(value);
  const modifier = computeAuraModifier(actor.system.realmAlignment, Number(value), type);
  // patch the active effect data
  auraEffect.changes[0].value = modifier;
  addEffect(actor, auraEffect);
}

async function clearAuraFromActor(actor) {
  const effects = ArM5eActiveEffect.findAllActiveEffectsWithSubtype(actor.effects, "aura");
  for (const e of effects) {
    log(false, `AURA_MANAGEMENT: clear effect for ${actor.name}`);
    actor.deleteEmbeddedDocuments("ActiveEffect", [e.id]);
  }
}

function computeAuraModifier(alignment, auraVal, type) {
  const realm = CONFIG.ARM5E.lookupRealm[parseInt(type)];
  const char = CONFIG.ARM5E.lookupRealm[parseInt(alignment)];
  const multiplier = CONFIG.ARM5E.realmsExt[realm].influence[parseInt(alignment)];
  log(
    false,
    "Computed aura :" +
      char +
      ", Aura: " +
      auraVal +
      " of type " +
      realm +
      " = " +
      auraVal * multiplier
  );
  return auraVal * multiplier;
}

export {
  computeAuraModifier,
  modifyAuraActiveEffectForAllTokensInScene,
  addActiveEffectAuraToActor,
  clearAuraFromActor
};
