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

export interface ItemOption {
  str: string;
  dex: string;
  int: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
  boss_damage?: string;
  ignore_monster_armor?: string;
  all_stat?: string;
  damage?: string;
  equipment_level_decrease?: number;
  max_hp_rate?: string;
  max_mp_rate?: string;
  base_equipment_level?: number;
  exceptional_upgrade?: number;
}

export interface ItemEquipment {
  item_equipment_part: string;
  item_equipment_slot: string;
  item_name: string;
  item_icon: string;
  item_description: string | null;
  item_shape_name: string;
  item_shape_icon: string;
  item_gender: string | null;
  item_total_option: ItemOption;
  item_base_option: ItemOption;
  potential_option_grade: string;
  additional_potential_option_grade: string;
  potential_option_flag: string;
  potential_option_1: string | null;
  potential_option_2: string | null;
  potential_option_3: string | null;
  additional_potential_option_flag: string;
  additional_potential_option_1: string | null;
  additional_potential_option_2: string | null;
  additional_potential_option_3: string | null;
  equipment_level_increase: number;
  item_exceptional_option: ItemOption;
  item_add_option: ItemOption;
  growth_exp: number;
  growth_level: number;
  scroll_upgrade: string;
  cuttable_count: string;
  golden_hammer_flag: string;
  scroll_resilience_count: string;
  scroll_upgradeable_count: string;
  soul_name: string | null;
  soul_option: string | null;
  item_etc_option: ItemOption;
  starforce: string;
  starforce_scroll_flag: string;
  item_starforce_option: ItemOption;
  special_ring_level: number;
  date_expire: string | null;
}

export interface CharacterItemEquipment {
  date: string | null;
  character_gender: string;
  character_class: string;
  preset_no: number;
  item_equipment: ItemEquipment[];
  item_equipment_preset_1: ItemEquipment[];
  item_equipment_preset_2: ItemEquipment[];
  item_equipment_preset_3: ItemEquipment[];
}
