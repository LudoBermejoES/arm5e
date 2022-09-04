// Rule: all subtypes of a given type must have a different "key" value or it becomes impossible to edit them properly
export default {
  none: {
    category: "magic",
    type: "none",
    label: "arm5e.sheet.activeEffect.types.nullEffect",
    subtypes: {
      none: {
        label: "arm5e.sheet.activeEffect.types.nullEffect",
        key: "",
        mode: CONST.ACTIVE_EFFECT_MODES.CUSTOM
      }
    }
  },
  spellcasting: {
    category: "magic",
    type: "spellcasting",
    label: "arm5e.sheet.activeEffect.type.spellcasting",
    subtypes: {
      voice: {
        label: "arm5e.sheet.magic.voice",
        key: "system.bonuses.arts.voice",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      gestures: {
        label: "arm5e.sheet.magic.gestures",
        key: "system.bonuses.arts.spellcasting",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      aura: {
        label: "arm5e.sheet.magic.aura",
        key: "system.bonuses.arts.spellcasting",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      }
    }
  },
  penetration: {
    category: "magic",
    type: "penetration",
    label: "arm5e.skill.arcane.penetration",
    subtypes: {
      bonus: {
        label: "arm5e.sheet.activeEffect.bonuses.penetration",
        key: "system.bonuses.arts.penetration",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      }
    }
  },
  realm: {
    category: "magic",
    type: "realm",
    label: "arm5e.sheet.activeEffect.types.realmAlignment",
    subtypes: {
      magic: {
        label: "arm5e.sheet.realm.label",
        key: "system.realmAlignment",
        mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
        default: 1,
        choice: {
          1: "arm5e.sheet.realm.magical",
          2: "arm5e.sheet.realm.faeric",
          3: "arm5e.sheet.realm.divine",
          4: "arm5e.sheet.realm.infernal"
        }
      }
    }
  },
  activities: {
    category: "progress",
    type: "activities",
    label: "arm5e.activity.label",
    subtypes: {
      practice: {
        label: "arm5e.activity.practice",
        key: "system.bonuses.activities.practice",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      training: {
        label: "arm5e.activity.training",
        key: "system.bonuses.activities.training",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 5
      },
      teaching: {
        label: "arm5e.activity.teaching",
        key: "system.bonuses.activities.teaching",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 5
      },
      teacher: {
        label: "arm5e.activity.teacher.label",
        key: "system.bonuses.activities.teacher",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 5
      },
      writing: {
        label: "arm5e.activity.writing",
        key: "system.bonuses.activities.writing",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      reading: {
        label: "arm5e.activity.reading",
        key: "system.bonuses.activities.reading",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      }
    }
  },
  art: {
    category: "magic",
    type: "art",
    label: "arm5e.sheet.arts",
    subtypes: {
      cr: {
        label: "Creo",
        key: "system.arts.techniques.cr.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      in: {
        label: "Intellego",
        key: "system.arts.techniques.in.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      mu: {
        label: "Muto",
        key: "system.arts.techniques.mu.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      pe: {
        label: "Perdo",
        key: "system.arts.techniques.pe.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      re: {
        label: "Rego",
        key: "system.arts.techniques.re.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      an: {
        label: "Animal",
        key: "system.arts.forms.an.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      aq: {
        label: "Aquam",
        key: "system.arts.forms.aq.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      au: {
        label: "Auram",
        key: "system.arts.forms.au.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      co: {
        label: "Corpus",
        key: "system.arts.forms.co.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      he: {
        label: "Herbam",
        key: "system.arts.forms.he.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      ig: {
        label: "Ignem",
        key: "system.arts.forms.ig.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      im: {
        label: "Imaginem",
        key: "system.arts.forms.im.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      me: {
        label: "Mentem",
        key: "system.arts.forms.me.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      te: {
        label: "Terram",
        key: "system.arts.forms.te.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      vi: {
        label: "Vim",
        key: "system.arts.forms.vi.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      }
    }
  },

  affinity: {
    category: "magic",
    type: "artAffinity",
    label: "arm5e.sheet.activeEffect.types.arts.affinity",
    subtypes: {
      cr: {
        label: "Creo",
        key: "system.arts.techniques.cr.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      in: {
        label: "Intellego",
        key: "system.arts.techniques.in.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      mu: {
        label: "Muto",
        key: "system.arts.techniques.mu.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      pe: {
        label: "Perdo",
        key: "system.arts.techniques.pe.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      re: {
        label: "Rego",
        key: "system.arts.techniques.re.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      an: {
        label: "Animal",
        key: "system.arts.forms.an.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      aq: {
        label: "Aquam",
        key: "system.arts.forms.aq.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      au: {
        label: "Auram",
        key: "system.arts.forms.au.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      co: {
        label: "Corpus",
        key: "system.arts.forms.co.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      he: {
        label: "Herbam",
        key: "system.arts.forms.he.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      ig: {
        label: "Ignem",
        key: "system.arts.forms.ig.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      im: {
        label: "Imaginem",
        key: "system.arts.forms.im.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      me: {
        label: "Mentem",
        key: "system.arts.forms.me.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      te: {
        label: "Terram",
        key: "system.arts.forms.te.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      },
      vi: {
        label: "Vim",
        key: "system.arts.forms.vi.xpCoeff",
        mode: CONST.ACTIVE_EFFECT_MODES.MULTIPLY,
        default: 1.5
      }
    }
  },

  vitals: {
    category: "traits",
    type: "vitals",
    label: "arm5e.sheet.activeEffect.types.vitals",
    subtypes: {
      size: {
        label: "arm5e.sheet.size",
        key: "system.vitals.siz.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      soak: {
        label: "arm5e.sheet.soak",
        key: "system.bonuses.traits.soak",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 3
      },
      aging: {
        label: "arm5e.sheet.aging",
        key: "system.bonuses.traits.aging",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      }
    }
  },
  characteristics: {
    category: "traits",
    type: "characteristics",
    label: "arm5e.sheet.activeEffect.types.characteristics",
    subtypes: {
      int: {
        label: "arm5e.sheet.intelligence",
        key: "system.characteristics.int.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      per: {
        label: "arm5e.sheet.perception",
        key: "system.characteristics.per.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      str: {
        label: "arm5e.sheet.strength",
        key: "system.characteristics.str.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      sta: {
        label: "arm5e.sheet.stamina",
        key: "system.characteristics.sta.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      pre: {
        label: "arm5e.sheet.presence",
        key: "system.characteristics.pre.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      com: {
        label: "arm5e.sheet.communication",
        key: "system.characteristics.com.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      dex: {
        label: "arm5e.sheet.dexterity",
        key: "system.characteristics.dex.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      qik: {
        label: "arm5e.sheet.quickness",
        key: "system.characteristics.qik.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      }
    }
  },
  fatigue: {
    category: "traits",
    type: "fatigue",
    label: "arm5e.sheet.activeEffect.types.fatigue",
    subtypes: {
      total: {
        label: "arm5e.sheet.activeEffect.subtypes.fatigueTotal",
        key: "system.bonuses.traits.fatigue",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      winded: {
        label: "arm5e.sheet.winded",
        key: "system.fatigue.winded.number",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      weary: {
        label: "arm5e.sheet.weary",
        key: "system.fatigue.weary.number",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      tired: {
        label: "arm5e.sheet.tired",
        key: "system.fatigue.tired.number",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      dazed: {
        label: "arm5e.sheet.dazed",
        key: "system.fatigue.dazed.number",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      windedLevel: {
        label: "arm5e.sheet.windedLvl",
        key: "system.fatigue.winded.amount",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      wearyLevel: {
        label: "arm5e.sheet.wearyLvl",
        key: "system.fatigue.weary.amount",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      tiredLevel: {
        label: "arm5e.sheet.tiredLvl",
        key: "system.fatigue.tired.amount",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      dazedLevel: {
        label: "arm5e.sheet.dazedLvl",
        key: "system.fatigue.dazed.amount",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      }
    }
  },
  wounds: {
    category: "traits",
    type: "wounds",
    label: "arm5e.sheet.activeEffect.types.wounds",
    subtypes: {
      total: {
        label: "arm5e.sheet.activeEffect.subtypes.woundsTotal",
        key: "system.bonuses.traits.wounds",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      light: {
        label: "arm5e.sheet.light",
        key: "system.wounds.light.penalty.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      medium: {
        label: "arm5e.sheet.medium",
        key: "system.wounds.medium.penalty.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      },
      heavy: {
        label: "arm5e.sheet.heavy",
        key: "system.wounds.heavy.penalty.value",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 0
      }
    }
  },
  bonusGeneralAbility: {
    category: "abilities",
    type: "bonusGeneralAbility",
    label: "arm5e.sheet.activeEffect.types.generalAbilitiesBonus",
    subtypes: {
      animalHandling: {
        label: "arm5e.skill.general.animalHandling",
        key: "system.bonuses.skills.animalHandling.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      areaLore: {
        label: "arm5e.skill.general.areaLore",
        key: "system.bonuses.skills.areaLore_#OPTION#.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2,
        option: "areaName"
      },
      athletics: {
        label: "arm5e.skill.general.athletics",
        key: "system.bonuses.skills.athletics.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      awareness: {
        label: "arm5e.skill.general.awareness",
        key: "system.bonuses.skills.awareness.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      bargain: {
        label: "arm5e.skill.general.bargain",
        key: "system.bonuses.skills.bargain.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      brawl: {
        label: "arm5e.skill.general.brawl",
        key: "system.bonuses.skills.brawl.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      carouse: {
        label: "arm5e.skill.general.carouse",
        key: "system.bonuses.skills.carouse.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      charm: {
        label: "arm5e.skill.general.charm",
        key: "system.bonuses.skills.charm.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      concentration: {
        label: "arm5e.skill.general.concentration",
        key: "system.bonuses.skills.concentration.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      craft: {
        label: "arm5e.skill.general.craft",
        key: "system.bonuses.skills.craft_#OPTION#.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2,
        option: "craftName"
      },
      etiquette: {
        label: "arm5e.skill.general.etiquette",
        key: "system.bonuses.skills.etiquette.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      folkKen: {
        label: "arm5e.skill.general.folkKen",
        key: "system.bonuses.skills.folkKen.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      guile: {
        label: "arm5e.skill.general.guile",
        key: "system.bonuses.skills.guile.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      hunt: {
        label: "arm5e.skill.general.hunt",
        key: "system.bonuses.skills.hunt.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      intrigue: {
        label: "arm5e.skill.general.intrigue",
        key: "system.bonuses.skills.intrigue.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      leadership: {
        label: "arm5e.skill.general.leadership",
        key: "system.bonuses.skills.leadership.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      legerdemain: {
        label: "arm5e.skill.general.legerdemain",
        key: "system.bonuses.skills.legerdemain.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      livingLanguage: {
        label: "arm5e.skill.general.livingLanguage",
        key: "system.bonuses.skills.livingLanguage_#OPTION#.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2,
        option: "languageName"
      },
      music: {
        label: "arm5e.skill.general.music",
        key: "system.bonuses.skills.music.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      organizationLore: {
        label: "arm5e.skill.general.organizationLore",
        key: "system.bonuses.skills.organizationLore_#OPTION#.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2,
        option: "organizationName"
      },
      profession: {
        label: "arm5e.skill.general.profession",
        key: "system.bonuses.skills.profession_#OPTION#.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2,
        option: "professionName"
      },
      ride: {
        label: "arm5e.skill.general.ride",
        key: "system.bonuses.skills.ride.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      stealth: {
        label: "arm5e.skill.general.stealth",
        key: "system.bonuses.skills.stealth.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      survival: {
        label: "arm5e.skill.general.survival",
        key: "system.bonuses.skills.survival.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      swim: {
        label: "arm5e.skill.general.swim",
        key: "system.bonuses.skills.swim.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      },
      teaching: {
        label: "arm5e.skill.general.teaching",
        key: "system.bonuses.skills.teaching.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 2
      }
    }
  },
  bonusArcaneAbility: {
    category: "abilities",
    type: "bonusArcaneAbility",
    label: "arm5e.sheet.activeEffect.types.arcaneAbilitiesBonus",
    subtypes: {
      hermeticCode: {
        label: "arm5e.skill.arcane.hermeticCode",
        key: "system.bonuses.skills.hermeticCode.bonus",
        mode: 2,
        default: 2
      },
      dominionLore: {
        label: "arm5e.skill.arcane.dominionLore",
        key: "system.bonuses.skills.dominionLore.bonus",
        mode: 2,
        default: 2
      },
      faerieLore: {
        label: "arm5e.skill.arcane.faerieLore",
        key: "system.bonuses.skills.faerieLore.bonus",
        mode: 2,
        default: 2
      },
      finesse: {
        label: "arm5e.skill.arcane.finesse",
        key: "system.bonuses.skills.finesse.bonus",
        mode: 2,
        default: 2
      },
      infernalLore: {
        label: "arm5e.skill.arcane.infernalLore",
        key: "system.bonuses.skills.infernalLore.bonus",
        mode: 2,
        default: 2
      },
      magicLore: {
        label: "arm5e.skill.arcane.magicLore",
        key: "system.bonuses.skills.magicLore.bonus",
        mode: 2,
        default: 2
      },
      magicTheory: {
        label: "arm5e.skill.arcane.magicTheory",
        key: "system.bonuses.skills.magicTheory.bonus",
        mode: 2,
        default: 2
      },
      parma: {
        label: "arm5e.skill.arcane.parma",
        key: "system.bonuses.skills.parma.bonus",
        mode: 2,
        default: 2
      },
      penetration: {
        label: "arm5e.skill.arcane.penetration",
        key: "system.bonuses.skills.penetration.bonus",
        mode: 2,
        default: 2
      }
    }
  },
  bonusAcademicAbility: {
    category: "abilities",
    type: "bonusAcademicAbility",
    label: "arm5e.sheet.activeEffect.types.academicAbilitiesBonus",
    subtypes: {
      artesLib: {
        label: "arm5e.skill.academic.artesLib",
        key: "system.bonuses.skills.artesLib.bonus",
        mode: 2,
        default: 2
      },
      civilCanonLaw: {
        label: "arm5e.skill.academic.civilCanonLaw",
        key: "system.bonuses.skills.civilCanonLaw.bonus",
        mode: 2,
        default: 2
      },
      commonLaw: {
        label: "arm5e.skill.academic.commonLaw",
        key: "system.bonuses.skills.commonLaw.bonus",
        mode: 2,
        default: 2
      },
      deadLanguage: {
        label: "arm5e.skill.academic.deadLanguage",
        key: "system.bonuses.skills.deadLanguage_#OPTION#.bonus",
        mode: 2,
        default: 2,
        option: "languageName"
      },
      medicine: {
        label: "arm5e.skill.academic.medicine",
        key: "system.bonuses.skills.medicine.bonus",
        mode: 2,
        default: 2
      },
      philosophy: {
        label: "arm5e.skill.academic.philosophy",
        key: "system.bonuses.skills.philosophy.bonus",
        mode: 2,
        default: 2
      },
      theology: {
        label: "arm5e.skill.academic.theology",
        key: "system.bonuses.skills.theology.bonus",
        mode: 2,
        default: 2
      }
    }
  },
  bonusMartialAbility: {
    category: "abilities",
    type: "bonusMartialAbility",
    label: "arm5e.sheet.activeEffect.types.martialAbilitiesBonus",
    subtypes: {
      bows: {
        label: "arm5e.skill.martial.bows",
        key: "system.bonuses.skills.bows.bonus",
        mode: 2,
        default: 2
      },
      singleWeapon: {
        label: "arm5e.skill.martial.singleWeapon",
        key: "system.bonuses.skills.singleWeapon.bonus",
        mode: 2,
        default: 2
      },
      greatWeapon: {
        label: "arm5e.skill.martial.greatWeapon",
        key: "system.bonuses.skills.greatWeapon.bonus",
        mode: 2,
        default: 2
      },
      trownWeapon: {
        label: "arm5e.skill.martial.trownWeapon",
        key: "system.bonuses.skills.trownWeapon.bonus",
        mode: 2,
        default: 2
      }
    }
  },
  bonusMysteryAbility: {
    category: "abilities",
    type: "bonusMysteryAbility",
    label: "arm5e.sheet.activeEffect.types.mysteryAbilitiesBonus",
    subtypes: {
      enigma: {
        label: "arm5e.skill.mystery.enigma",
        key: "system.bonuses.skills.enigma.bonus",
        mode: 2,
        default: 2
      },
      faerieMagic: {
        label: "arm5e.skill.mystery.faerieMagic",
        key: "system.bonuses.skills.faerieMagic.bonus",
        mode: 2,
        default: 2
      },
      heartbeast: {
        label: "arm5e.skill.mystery.heartbeast",
        key: "system.bonuses.skills.heartbeast.bonus",
        mode: 2,
        default: 2
      },
      verditiusMagic: {
        label: "arm5e.skill.mystery.verditiusMagic",
        key: "system.bonuses.skills.verditiusMagic.bonus",
        mode: 2,
        default: 2
      },
      cult: {
        label: "arm5e.skill.mystery.cult",
        key: "system.bonuses.skills.cult_#OPTION#.bonus",
        mode: 2,
        default: 2,
        option: "cultName"
      }
    }
  },
  bonusSupernaturalAbility: {
    category: "abilities",
    type: "bonusSupernaturalAbility",
    label: "arm5e.sheet.activeEffect.types.supernaturalAbilitiesBonus",
    subtypes: {
      animalKen: {
        label: "arm5e.skill.supernatural.animalKen",
        key: "system.bonuses.skills.animalKen.bonus",
        mode: 2,
        default: 2
      },
      dowsing: {
        label: "arm5e.skill.supernatural.dowsing",
        key: "system.bonuses.skills.dowsing.bonus",
        mode: 2,
        default: 2
      },
      enchantingMusic: {
        label: "arm5e.skill.supernatural.enchantingMusic",
        key: "system.bonuses.skills.enchantingMusic.bonus",
        mode: 2,
        default: 2
      },
      entrancement: {
        label: "arm5e.skill.supernatural.entrancement",
        key: "system.bonuses.skills.entrancement.bonus",
        mode: 2,
        default: 2
      },
      magicSensitivity: {
        label: "arm5e.skill.supernatural.magicSensitivity",
        key: "system.bonuses.skills.magicSensitivity.bonus",
        mode: 2,
        default: 2
      },
      premonitions: {
        label: "arm5e.skill.supernatural.premonitions",
        key: "system.bonuses.skills.premonitions.bonus",
        mode: 2,
        default: 2
      },
      secondSight: {
        label: "arm5e.skill.supernatural.secondSight",
        key: "system.bonuses.skills.secondSight.bonus",
        mode: 2,
        default: 2
      },
      senseHolyAndUnholy: {
        label: "arm5e.skill.supernatural.senseHolyAndUnholy",
        key: "system.bonuses.skills.senseHolyAndUnholy.bonus",
        mode: 2,
        default: 2
      },
      shapeshifter: {
        label: "arm5e.skill.supernatural.shapeshifter",
        key: "system.bonuses.skills.shapeshifter.bonus",
        mode: 2,
        default: 2
      },
      supernatural: {
        label: "arm5e.skill.supernatural.generic",
        key: "system.bonuses.skills.supernatural_#OPTION#.bonus",
        mode: 2,
        default: 2,
        option: "supernaturalAbilityName"
      },
      wildernessSense: {
        label: "arm5e.skill.supernatural.wildernessSense",
        key: "system.bonuses.skills.wildernessSense.bonus",
        mode: 2,
        default: 2
      }
    }
  },
  affinityGeneralAbility: {
    category: "abilities",
    type: "affinityGeneralAbility",
    label: "arm5e.sheet.activeEffect.types.generalAbilitiesAffinity",
    subtypes: {
      animalHandling: {
        label: "arm5e.skill.general.animalHandling",
        key: "system.bonuses.skills.animalHandling.xpCoeff",
        mode: 1,
        default: 1.5
      },
      areaLore: {
        label: "arm5e.skill.general.areaLore",
        key: "system.bonuses.skills.areaLore_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "areaName"
      },
      athletics: {
        label: "arm5e.skill.general.athletics",
        key: "system.bonuses.skills.athletics.xpCoeff",
        mode: 1,
        default: 1.5
      },
      awareness: {
        label: "arm5e.skill.general.awareness",
        key: "system.bonuses.skills.awareness.xpCoeff",
        mode: 1,
        default: 1.5
      },
      bargain: {
        label: "arm5e.skill.general.bargain",
        key: "system.bonuses.skills.bargain.xpCoeff",
        mode: 1,
        default: 1.5
      },
      brawl: {
        label: "arm5e.skill.general.brawl",
        key: "system.bonuses.skills.brawl.xpCoeff",
        mode: 1,
        default: 1.5
      },
      carouse: {
        label: "arm5e.skill.general.carouse",
        key: "system.bonuses.skills.carouse.xpCoeff",
        mode: 1,
        default: 1.5
      },
      charm: {
        label: "arm5e.skill.general.charm",
        key: "system.bonuses.skills.charm.xpCoeff",
        mode: 1,
        default: 1.5
      },
      concentration: {
        label: "arm5e.skill.general.concentration",
        key: "system.bonuses.skills.concentration.xpCoeff",
        mode: 1,
        default: 1.5
      },
      craft: {
        label: "arm5e.skill.general.craft",
        key: "system.bonuses.skills.craft_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "craftName"
      },
      etiquette: {
        label: "arm5e.skill.general.etiquette",
        key: "system.bonuses.skills.etiquette.xpCoeff",
        mode: 1,
        default: 1.5
      },
      folkKen: {
        label: "arm5e.skill.general.folkKen",
        key: "system.bonuses.skills.folkKen.xpCoeff",
        mode: 1,
        default: 1.5
      },
      guile: {
        label: "arm5e.skill.general.guile",
        key: "system.bonuses.skills.guile.xpCoeff",
        mode: 1,
        default: 1.5
      },
      hunt: {
        label: "arm5e.skill.general.hunt",
        key: "system.bonuses.skills.hunt.xpCoeff",
        mode: 1,
        default: 1.5
      },
      intrigue: {
        label: "arm5e.skill.general.intrigue",
        key: "system.bonuses.skills.intrigue.xpCoeff",
        mode: 1,
        default: 1.5
      },
      leadership: {
        label: "arm5e.skill.general.leadership",
        key: "system.bonuses.skills.leadership.xpCoeff",
        mode: 1,
        default: 1.5
      },
      legerdemain: {
        label: "arm5e.skill.general.legerdemain",
        key: "system.bonuses.skills.legerdemain.xpCoeff",
        mode: 1,
        default: 1.5
      },
      livingLanguage: {
        label: "arm5e.skill.general.livingLanguage",
        key: "system.bonuses.skills.livingLanguage_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "languageName"
      },
      music: {
        label: "arm5e.skill.general.music",
        key: "system.bonuses.skills.music.xpCoeff",
        mode: 1,
        default: 1.5
      },
      organizationLore: {
        label: "arm5e.skill.general.organizationLore",
        key: "system.bonuses.skills.organizationLore_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "orgName"
      },
      profession: {
        label: "arm5e.skill.general.profession",
        key: "system.bonuses.skills.profession_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "professionName"
      },
      ride: {
        label: "arm5e.skill.general.ride",
        key: "system.bonuses.skills.ride.xpCoeff",
        mode: 1,
        default: 1.5
      },
      stealth: {
        label: "arm5e.skill.general.stealth",
        key: "system.bonuses.skills.stealth.xpCoeff",
        mode: 1,
        default: 1.5
      },
      survival: {
        label: "arm5e.skill.general.survival",
        key: "system.bonuses.skills.survival.xpCoeff",
        mode: 1,
        default: 1.5
      },
      swim: {
        label: "arm5e.skill.general.swim",
        key: "system.bonuses.skills.swim.xpCoeff",
        mode: 1,
        default: 1.5
      },
      teaching: {
        label: "arm5e.skill.general.teaching",
        key: "system.bonuses.skills.teaching.xpCoeff",
        mode: 1,
        default: 1.5
      }
    }
  },
  affinityArcaneAbility: {
    category: "abilities",
    type: "affinityArcaneAbility",
    label: "arm5e.sheet.activeEffect.types.arcaneAbilitiesAffinity",
    subtypes: {
      hermeticCode: {
        label: "arm5e.skill.arcane.hermeticCode",
        key: "system.bonuses.skills.hermeticCode.xpCoeff",
        mode: 1,
        default: 1.5
      },
      dominionLore: {
        label: "arm5e.skill.arcane.dominionLore",
        key: "system.bonuses.skills.dominionLore.xpCoeff",
        mode: 1,
        default: 1.5
      },
      faerieLore: {
        label: "arm5e.skill.arcane.faerieLore",
        key: "system.bonuses.skills.faerieLore.xpCoeff",
        mode: 1,
        default: 1.5
      },
      finesse: {
        label: "arm5e.skill.arcane.finesse",
        key: "system.bonuses.skills.finesse.xpCoeff",
        mode: 1,
        default: 1.5
      },
      infernalLore: {
        label: "arm5e.skill.arcane.infernalLore",
        key: "system.bonuses.skills.infernalLore.xpCoeff",
        mode: 1,
        default: 1.5
      },
      magicLore: {
        label: "arm5e.skill.arcane.magicLore",
        key: "system.bonuses.skills.magicLore.xpCoeff",
        mode: 1,
        default: 1.5
      },
      magicTheory: {
        label: "arm5e.skill.arcane.magicTheory",
        key: "system.bonuses.skills.magicTheory.xpCoeff",
        mode: 1,
        default: 1.5
      },
      parma: {
        label: "arm5e.skill.arcane.parma",
        key: "system.bonuses.skills.parma.xpCoeff",
        mode: 1,
        default: 1.5
      },
      penetration: {
        label: "arm5e.skill.arcane.penetration",
        key: "system.bonuses.skills.penetration.xpCoeff",
        mode: 1,
        default: 1.5
      }
    }
  },
  affinityAcademicAbility: {
    category: "abilities",
    type: "affinityAcademicAbility",
    label: "arm5e.sheet.activeEffect.types.academicAbilitiesAffinity",
    subtypes: {
      artesLib: {
        label: "arm5e.skill.academic.artesLib",
        key: "system.bonuses.skills.artesLib.xpCoeff",
        mode: 1,
        default: 1.5
      },
      civilCanonLaw: {
        label: "arm5e.skill.academic.civilCanonLaw",
        key: "system.bonuses.skills.civilCanonLaw.xpCoeff",
        mode: 1,
        default: 1.5
      },
      commonLaw: {
        label: "arm5e.skill.academic.commonLaw",
        key: "system.bonuses.skills.commonLaw.xpCoeff",
        mode: 1,
        default: 1.5
      },
      deadLanguage: {
        label: "arm5e.skill.academic.deadLanguage",
        key: "system.bonuses.skills.deadLanguage_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "languageName"
      },
      medicine: {
        label: "arm5e.skill.academic.medicine",
        key: "system.bonuses.skills.medicine.xpCoeff",
        mode: 1,
        default: 1.5
      },
      philosophy: {
        label: "arm5e.skill.academic.philosophy",
        key: "system.bonuses.skills.philosophy.xpCoeff",
        mode: 1,
        default: 1.5
      },
      theology: {
        label: "arm5e.skill.academic.theology",
        key: "system.bonuses.skills.theology.xpCoeff",
        mode: 1,
        default: 1.5
      }
    }
  },
  affinityMartialAbility: {
    category: "abilities",
    type: "affinityMartialAbility",
    label: "arm5e.sheet.activeEffect.types.martialAbilitiesAffinity",
    subtypes: {
      bows: {
        label: "arm5e.skill.martial.bows",
        key: "system.bonuses.skills.bows.xpCoeff",
        mode: 1,
        default: 1.5
      },
      singleWeapon: {
        label: "arm5e.skill.martial.singleWeapon",
        key: "system.bonuses.skills.singleWeapon.xpCoeff",
        mode: 1,
        default: 1.5
      },
      greatWeapon: {
        label: "arm5e.skill.martial.greatWeapon",
        key: "system.bonuses.skills.greatWeapon.xpCoeff",
        mode: 1,
        default: 1.5
      },
      trownWeapon: {
        label: "arm5e.skill.martial.trownWeapon",
        key: "system.bonuses.skills.trownWeapon.xpCoeff",
        mode: 1,
        default: 1.5
      }
    }
  },
  affinityMysteryAbility: {
    category: "abilities",
    type: "affinityMysteryAbility",
    label: "arm5e.sheet.activeEffect.types.mysteryAbilitiesAffinity",
    subtypes: {
      enigma: {
        label: "arm5e.skill.mystery.enigma",
        key: "system.bonuses.skills.enigma.xpCoeff",
        mode: 1,
        default: 1.5
      },
      faerieMagic: {
        label: "arm5e.skill.mystery.faerieMagic",
        key: "system.bonuses.skills.faerieMagic.xpCoeff",
        mode: 1,
        default: 1.5
      },
      heartbeast: {
        label: "arm5e.skill.mystery.heartbeast",
        key: "system.bonuses.skills.heartbeast.xpCoeff",
        mode: 1,
        default: 1.5
      },
      verditiusMagic: {
        label: "arm5e.skill.mystery.verditiusMagic",
        key: "system.bonuses.skills.verditiusMagic.xpCoeff",
        mode: 1,
        default: 1.5
      },
      cult: {
        label: "arm5e.skill.mystery.cult",
        key: "system.bonuses.skills.cult_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "cultName"
      }
    }
  },
  affinitySupernaturalAbility: {
    category: "abilities",
    type: "affinitySupernaturalAbility",
    label: "arm5e.sheet.activeEffect.types.supernaturalAbilitiesAffinity",
    subtypes: {
      animalKen: {
        label: "arm5e.skill.supernatural.animalKen",
        key: "system.bonuses.skills.animalKen.xpCoeff",
        mode: 1,
        default: 1.5
      },
      dowsing: {
        label: "arm5e.skill.supernatural.dowsing",
        key: "system.bonuses.skills.dowsing.xpCoeff",
        mode: 1,
        default: 1.5
      },
      enchantingMusic: {
        label: "arm5e.skill.supernatural.enchantingMusic",
        key: "system.bonuses.skills.enchantingMusic.xpCoeff",
        mode: 1,
        default: 1.5
      },
      entrancement: {
        label: "arm5e.skill.supernatural.entrancement",
        key: "system.bonuses.skills.entrancement.xpCoeff",
        mode: 1,
        default: 1.5
      },
      magicSensitivity: {
        label: "arm5e.skill.supernatural.magicSensitivity",
        key: "system.bonuses.skills.magicSensitivity.xpCoeff",
        mode: 1,
        default: 1.5
      },
      premonitions: {
        label: "arm5e.skill.supernatural.premonitions",
        key: "system.bonuses.skills.premonitions.xpCoeff",
        mode: 1,
        default: 1.5
      },
      secondSight: {
        label: "arm5e.skill.supernatural.secondSight",
        key: "system.bonuses.skills.secondSight.xpCoeff",
        mode: 1,
        default: 1.5
      },
      senseHolyAndUnholy: {
        label: "arm5e.skill.supernatural.senseHolyAndUnholy",
        key: "system.bonuses.skills.senseHolyAndUnholy.xpCoeff",
        mode: 1,
        default: 1.5
      },
      shapeshifter: {
        label: "arm5e.skill.supernatural.shapeshifter",
        key: "system.bonuses.skills.shapeshifter.xpCoeff",
        mode: 1,
        default: 1.5
      },
      supernatural: {
        label: "arm5e.skill.supernatural.generic",
        key: "system.bonuses.skills.supernatural_#OPTION#.xpCoeff",
        mode: 1,
        default: 1.5,
        option: "supernaturalAbilityName"
      },
      wildernessSense: {
        label: "arm5e.skill.supernatural.wildernessSense",
        key: "system.bonuses.skills.wildernessSense.xpCoeff",
        mode: 1,
        default: 1.5
      }
    }
  },

  laboratory: {
    category: "laboratory",
    type: "laboratory",
    label: "arm5e.sheet.activeEffect.types.laboratory",
    subtypes: {
      size: {
        label: "arm5e.sheet.size",
        key: "system.size.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      generalQuality: {
        label: "arm5e.sheet.generalQuality",
        key: "system.generalQuality.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      safety: {
        label: "arm5e.sheet.safety",
        key: "system.safety.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      health: {
        label: "arm5e.sheet.health",
        key: "system.health.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      refinement: {
        label: "arm5e.sheet.refinement",
        key: "system.refinement.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      upkeep: {
        label: "arm5e.sheet.upkeep",
        key: "system.upkeep.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      warping: {
        label: "arm5e.sheet.warping",
        key: "system.warping.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      },
      aesthetics: {
        label: "arm5e.sheet.aesthetics",
        key: "system.aesthetics.bonus",
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        default: 1
      }
    }
  }
};
