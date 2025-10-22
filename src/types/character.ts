export interface CharacterBasic {
  date: string | null;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: string;
  character_guild_name: string;
  character_image: string;
  character_date_create: string;
  access_flag: string;
  liberation_quest_clear: string;
}

export interface CharacterStat {
  stat_name: string;
  stat_value: string;
}

export interface CharacterStats {
  date: string | null;
  character_class: string;
  final_stat: CharacterStat[];
  remain_ap: number;
}

export interface Symbol {
  symbol_name: string;
  symbol_icon: string;
  symbol_description: string;
  symbol_force: string;
  symbol_level: number;
  symbol_str: string;
  symbol_dex: string;
  symbol_int: string;
  symbol_luk: string;
  symbol_hp: string;
  symbol_drop_rate: string;
  symbol_meso_rate: string;
  symbol_exp_rate: string;
  symbol_growth_count: number;
  symbol_require_growth_count: number;
}

export interface CharacterSymbol {
  date: string | null;
  character_class: string;
  symbol: Symbol[];
}

export interface HexaSkill {
  hexa_skill_id: string;
}

export interface HexaCore {
  hexa_core_name: string;
  hexa_core_level: number;
  hexa_core_type: string;
  linked_skill: HexaSkill[];
}

export interface CharacterHexaCore {
  date: string | null;
  character_hexa_core_equipment: HexaCore[];
}

export interface HexaStatCore {
  slot_id: string;
  main_stat_name: string;
  sub_stat_name_1: string;
  sub_stat_name_2: string;
  main_stat_level: number;
  sub_stat_level_1: number;
  sub_stat_level_2: number;
  stat_grade: number;
}

export interface CharacterHexaStat {
  date: string | null;
  character_class: string;
  character_hexa_stat_core: HexaStatCore[];
  character_hexa_stat_core_2: HexaStatCore[];
  character_hexa_stat_core_3: HexaStatCore[];
  preset_hexa_stat_core: HexaStatCore[];
  preset_hexa_stat_core_2: HexaStatCore[];
  preset_hexa_stat_core_3: HexaStatCore[];
}
