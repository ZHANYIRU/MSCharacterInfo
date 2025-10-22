import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CharacterSearch } from "@/components/CharacterSearch";
import { CharacterProfile } from "@/components/CharacterProfile";
import { CharacterStats } from "@/components/CharacterStats";
import { CharacterSymbol } from "@/components/CharacterSymbol";
import { CharacterHexa } from "@/components/CharacterHexa";
import {
  CharacterBasic,
  CharacterStats as CharacterStatsType,
  CharacterSymbol as CharacterSymbolType,
  CharacterHexaCore,
  CharacterHexaStat,
} from "@/types/character";

// 模擬 API 數據 (因為需要實際的 API Key)
const mockCharacterBasic: CharacterBasic = {
  date: null,
  character_name: "菕苡u",
  world_name: "殺人鯨",
  character_gender: "男",
  character_class: "卡莉",
  character_class_level: "6",
  character_level: 294,
  character_exp: 151489327486288,
  character_exp_rate: "35.157",
  character_guild_name: "海闇藍月",
  character_image:
    "https://open.api.nexon.com/static/maplestorytw/character/look/ANOCPDGEFIMOMLOOCCFNGDOHCPKMGIKFPKCLDFEJBAAEJOMCKKNPHAJIFNBKFJKDAFLCBLEAOKGDPNGOOHODFOEHBIPNOMLECAFNGHBODMPMOLPGONJDJGFIGFDLLPMFOCDFGGFJFJONBNPNANPBNMOMGOMBEPEEDOIHLKEIDELDKDGALINGFCDALBDJBKPKGBJPEOJMAJHNGKJKJPMNOMAACFFGKMAGEOLHABBBFFLNLOIGDIGADCDIJAJFGFEK",
  character_date_create: "2023-07-15T00:00+08:00",
  access_flag: "true",
  liberation_quest_clear: "1",
};

const mockCharacterStats: CharacterStatsType = {
  date: null,
  character_class: "卡莉",
  final_stat: [
    { stat_name: "最低屬性攻擊力", stat_value: "258219472" },
    { stat_name: "最高屬性攻擊力", stat_value: "286910522" },
    { stat_name: "傷害", stat_value: "93.00" },
    { stat_name: "BOSS怪物傷害", stat_value: "444.00" },
    { stat_name: "最終傷害", stat_value: "150.20" },
    { stat_name: "無視防禦率", stat_value: "93.11" },
    { stat_name: "爆擊機率", stat_value: "80" },
    { stat_name: "爆擊傷害", stat_value: "149.85" },
    { stat_name: "狀態異常耐性", stat_value: "60" },
    { stat_name: "格擋", stat_value: "100" },
    { stat_name: "防禦力", stat_value: "61600" },
    { stat_name: "移動速度", stat_value: "160" },
    { stat_name: "跳躍力", stat_value: "123" },
    { stat_name: "星力", stat_value: "411" },
    { stat_name: "神秘力量", stat_value: "1350" },
    { stat_name: "真實之力", stat_value: "750" },
    { stat_name: "STR", stat_value: "6663" },
    { stat_name: "DEX", stat_value: "9493" },
    { stat_name: "INT", stat_value: "6562" },
    { stat_name: "LUK", stat_value: "77810" },
    { stat_name: "HP", stat_value: "53531" },
    { stat_name: "MP", stat_value: "37124" },
    { stat_name: "AP配點STR", stat_value: "4" },
    { stat_name: "AP配點DEX", stat_value: "4" },
    { stat_name: "AP配點INT", stat_value: "4" },
    { stat_name: "AP配點LUK", stat_value: "1488" },
    { stat_name: "AP配點HP", stat_value: "500" },
    { stat_name: "AP配點MP", stat_value: "550" },
    { stat_name: "道具掉落率", stat_value: "245" },
    { stat_name: "楓幣獲得量", stat_value: "144" },
    { stat_name: "Buff持續時間", stat_value: "64" },
    { stat_name: "攻擊速度", stat_value: "6" },
    { stat_name: "一般怪物傷害", stat_value: "91.00" },
    { stat_name: "冷卻時間減少(秒)", stat_value: "7" },
    { stat_name: "冷卻時間減少(％)", stat_value: "6" },
    { stat_name: "未套用冷卻時間", stat_value: "17" },
    { stat_name: "無視屬性耐性", stat_value: "5.00" },
    { stat_name: "狀態異常追加傷害", stat_value: "6.00" },
    { stat_name: "武器熟練度", stat_value: "90" },
    { stat_name: "獲得額外經驗值", stat_value: "264.00" },
    { stat_name: "攻擊力", stat_value: "14250" },
    { stat_name: "魔法攻擊力", stat_value: "2944" },
    { stat_name: "戰鬥力", stat_value: "906273435" },
    { stat_name: "召喚獸持續時間增加", stat_value: "32" },
  ],
  remain_ap: 0,
};

const mockCharacterSymbol: CharacterSymbolType = {
  date: null,
  character_class: "卡莉",
  symbol: [
    {
      symbol_name: "祕法符文：消逝的旅途",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDJHOA",
      symbol_description:
        "消逝的旅途地區的□法符文。□法符文會與擁有神□力量者□生共鳴，可增加和該角色相符的主能力。",
      symbol_force: "220",
      symbol_level: 20,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2200",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 411,
    },
    {
      symbol_name: "祕法符文：啾啾艾爾蘭",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDJHOD",
      symbol_description:
        "□□艾爾蘭地區的□法符文。□法符文會與擁有神□力量者□生共鳴，可增加和該角色相符的主能力。",
      symbol_force: "220",
      symbol_level: 20,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2200",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 411,
    },
    {
      symbol_name: "祕法符文：拉契爾恩",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDJHOC",
      symbol_description:
        "拉契爾恩地區的□法符文。□法符文會與擁有神□力量者□生共鳴，可增加和該角色相符的主能力。",
      symbol_force: "220",
      symbol_level: 20,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2200",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 411,
    },
    {
      symbol_name: "祕法符文：阿爾卡娜",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDJHOF",
      symbol_description:
        "阿爾□娜地區的□法符文。□法符文會與擁有神□力量者□生共鳴，可增加和該角色相符的主能力。",
      symbol_force: "220",
      symbol_level: 20,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2200",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 411,
    },
    {
      symbol_name: "祕法符文：魔菈斯",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDJHOE",
      symbol_description:
        "魔□斯地區的□法符文。□法符文會與擁有神□力量者□生共鳴，可增加和該角色相符的主能力。",
      symbol_force: "220",
      symbol_level: 20,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2200",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 411,
    },
    {
      symbol_name: "祕法符文：艾斯佩拉",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDJHOH",
      symbol_description:
        "艾斯佩拉地區的□法符文。□法符文會與擁有神□力量者□生共鳴，可增加和該角色相符的主能力。",
      symbol_force: "220",
      symbol_level: 20,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2200",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 411,
    },
    {
      symbol_name: "真實符文：賽爾尼溫",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDIHOB",
      symbol_description:
        "賽爾尼溫地區的□實符文。□實符文擁有□實之力，□與持有者□生共鳴，可增加和該角色相符的主能力□。",
      symbol_force: "110",
      symbol_level: 11,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2500",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 1309,
    },
    {
      symbol_name: "真實符文：阿爾克斯",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDIHOA",
      symbol_description:
        "阿爾克斯地區的□實符文。□實符文擁有□實之力，□與持有者□生共鳴，可增加和該角色相符的主能力□。",
      symbol_force: "110",
      symbol_level: 11,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2500",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 1309,
    },
    {
      symbol_name: "真實符文：奧迪溫",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDIHOD",
      symbol_description:
        "奧迪溫地區的□實符文。□實符文擁有□實之力，□與持有者□生共鳴，可增加和該角色相符的主能力□。",
      symbol_force: "110",
      symbol_level: 11,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2500",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 1309,
    },
    {
      symbol_name: "真實符文：桃源境",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDIHOC",
      symbol_description:
        "桃源境地區的□實符文。□實符文擁有□實之力，□與持有者□生共鳴，可增加和該角色相符的主能力□。",
      symbol_force: "110",
      symbol_level: 11,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2500",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 1309,
    },
    {
      symbol_name: "真實符文：阿爾特利亞",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDIHOF",
      symbol_description:
        "阿爾特利亞地區的□實符文。□實符文擁有□實之力，□與持有者□生共鳴，可增加和該角色相符的主能力□。",
      symbol_force: "110",
      symbol_level: 11,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2500",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 1309,
    },
    {
      symbol_name: "真實符文：卡爾西溫",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDIHOE",
      symbol_description:
        "□爾西溫地區的□實符文。□實符文擁有□實之力，□與持有者□生共鳴，可增加和該角色相符的主能力□。",
      symbol_force: "110",
      symbol_level: 11,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "2500",
      symbol_hp: "0",
      symbol_drop_rate: "0%",
      symbol_meso_rate: "0%",
      symbol_exp_rate: "0%",
      symbol_growth_count: 0,
      symbol_require_growth_count: 1309,
    },
    {
      symbol_name: "豪華真實符文：塔拉哈特",
      symbol_icon:
        "https://open.api.nexon.com/static/maplestorytw/item/icon/KEIDPHOB",
      symbol_description:
        "塔拉哈特地區的豪華□實符文。豪華□實符文將和持有□實之力的人□生共鳴，□提升其楓幣獲得量、道具掉落率、追加經驗□獲得量。",
      symbol_force: "90",
      symbol_level: 9,
      symbol_str: "0",
      symbol_dex: "0",
      symbol_int: "0",
      symbol_luk: "0",
      symbol_hp: "0",
      symbol_drop_rate: "13%",
      symbol_meso_rate: "13%",
      symbol_exp_rate: "42%",
      symbol_growth_count: 829,
      symbol_require_growth_count: 909,
    },
  ],
};

const mockCharacterHexaCore: CharacterHexaCore = {
  date: null,
  character_hexa_core_equipment: [
    {
      hexa_core_name: "龍星群",
      hexa_core_level: 9,
      hexa_core_type: "技能核心",
      linked_skill: [{ hexa_skill_id: "龍星群" }],
    },
    {
      hexa_core_name: "魔力之環VI",
      hexa_core_level: 19,
      hexa_core_type: "精通核心",
      linked_skill: [{ hexa_skill_id: "魔力之環VI" }],
    },
    {
      hexa_core_name: "龍之捷VI/閃雷之環VI/閃雷之捷VI/風之捷VI",
      hexa_core_level: 26,
      hexa_core_type: "精通核心",
      linked_skill: [
        { hexa_skill_id: "龍之捷VI" },
        { hexa_skill_id: "閃電之環VI" },
        { hexa_skill_id: "閃雷之捷VI" },
        { hexa_skill_id: "風之捷VI" },
      ],
    },
    {
      hexa_core_name: "龍之躍VI/閃雷之躍VI/地之環VI/塵土之躍VI",
      hexa_core_level: 25,
      hexa_core_type: "精通核心",
      linked_skill: [
        { hexa_skill_id: "龍之躍VI" },
        { hexa_skill_id: "閃雷之躍VI" },
        { hexa_skill_id: "地之環VI" },
        { hexa_skill_id: "塵土之躍VI" },
      ],
    },
    {
      hexa_core_name:
        "風之環VI/龍之火花VI/魔法殘骸VI/龍之氣息VI/大地氣息VI/風之氣息VI",
      hexa_core_level: 19,
      hexa_core_type: "精通核心",
      linked_skill: [
        { hexa_skill_id: "風之環VI" },
        { hexa_skill_id: "龍之火花VI" },
        { hexa_skill_id: "魔法殘骸VI" },
        { hexa_skill_id: "龍之氣息VI" },
        { hexa_skill_id: "大地氣息VI" },
        { hexa_skill_id: "風之氣息VI" },
      ],
    },
    {
      hexa_core_name: "元素滅殺破",
      hexa_core_level: 17,
      hexa_core_type: "強化核心",
      linked_skill: [{ hexa_skill_id: "強化元素滅殺破" }],
    },
    {
      hexa_core_name: "聖龍突襲",
      hexa_core_level: 10,
      hexa_core_type: "強化核心",
      linked_skill: [{ hexa_skill_id: "強化聖龍突襲" }],
    },
    {
      hexa_core_name: "星宮射線",
      hexa_core_level: 11,
      hexa_core_type: "強化核心",
      linked_skill: [{ hexa_skill_id: "強化星宮射線" }],
    },
    {
      hexa_core_name: "魔力之旋",
      hexa_core_level: 10,
      hexa_core_type: "強化核心",
      linked_skill: [{ hexa_skill_id: "強化魔力之旋" }],
    },
    {
      hexa_core_name: "靈魂雅努斯",
      hexa_core_level: 20,
      hexa_core_type: "共用核心",
      linked_skill: [
        { hexa_skill_id: "靈魂雅努斯" },
        { hexa_skill_id: "靈魂雅努斯：清晨" },
        { hexa_skill_id: "靈魂雅努斯：黃昏" },
      ],
    },
  ],
};

const mockCharacterHexaStat: CharacterHexaStat = {
  date: null,
  character_class: "卡莉",
  character_hexa_stat_core: [
    {
      slot_id: "1",
      main_stat_name: "爆擊傷害增加",
      sub_stat_name_1: "boss傷害增加",
      sub_stat_name_2: "主要屬性增加",
      main_stat_level: 8,
      sub_stat_level_1: 5,
      sub_stat_level_2: 7,
      stat_grade: 20,
    },
  ],
  character_hexa_stat_core_2: [
    {
      slot_id: "1",
      main_stat_name: "主要屬性增加",
      sub_stat_name_1: "爆擊傷害增加",
      sub_stat_name_2: "boss傷害增加",
      main_stat_level: 8,
      sub_stat_level_1: 10,
      sub_stat_level_2: 2,
      stat_grade: 20,
    },
  ],
  character_hexa_stat_core_3: [
    {
      slot_id: "1",
      main_stat_name: "boss傷害增加",
      sub_stat_name_1: "主要屬性增加",
      sub_stat_name_2: "爆擊傷害增加",
      main_stat_level: 8,
      sub_stat_level_1: 4,
      sub_stat_level_2: 8,
      stat_grade: 20,
    },
  ],
  preset_hexa_stat_core: [
    {
      slot_id: "0",
      main_stat_name: "爆擊傷害增加",
      sub_stat_name_1: "boss傷害增加",
      sub_stat_name_2: "主要屬性增加",
      main_stat_level: 0,
      sub_stat_level_1: 0,
      sub_stat_level_2: 0,
      stat_grade: 0,
    },
    {
      slot_id: "1",
      main_stat_name: "爆擊傷害增加",
      sub_stat_name_1: "boss傷害增加",
      sub_stat_name_2: "主要屬性增加",
      main_stat_level: 8,
      sub_stat_level_1: 5,
      sub_stat_level_2: 7,
      stat_grade: 20,
    },
  ],
  preset_hexa_stat_core_2: [
    {
      slot_id: "0",
      main_stat_name: "主要屬性增加",
      sub_stat_name_1: "爆擊傷害增加",
      sub_stat_name_2: "boss傷害增加",
      main_stat_level: 0,
      sub_stat_level_1: 0,
      sub_stat_level_2: 0,
      stat_grade: 0,
    },
    {
      slot_id: "1",
      main_stat_name: "主要屬性增加",
      sub_stat_name_1: "爆擊傷害增加",
      sub_stat_name_2: "boss傷害增加",
      main_stat_level: 8,
      sub_stat_level_1: 10,
      sub_stat_level_2: 2,
      stat_grade: 20,
    },
  ],
  preset_hexa_stat_core_3: [
    {
      slot_id: "0",
      main_stat_name: "boss傷害增加",
      sub_stat_name_1: "主要屬性增加",
      sub_stat_name_2: "爆擊傷害增加",
      main_stat_level: 0,
      sub_stat_level_1: 0,
      sub_stat_level_2: 0,
      stat_grade: 0,
    },
    {
      slot_id: "1",
      main_stat_name: "boss傷害增加",
      sub_stat_name_1: "主要屬性增加",
      sub_stat_name_2: "爆擊傷害增加",
      main_stat_level: 8,
      sub_stat_level_1: 4,
      sub_stat_level_2: 8,
      stat_grade: 20,
    },
  ],
};

function App() {
  const [searchedCharacter, setSearchedCharacter] = useState<string>("");

  // 模擬查詢 - 在實際應用中這裡會調用真實的 API
  const { data: characterData, isLoading: isLoadingBasic } = useQuery({
    queryKey: ["character", searchedCharacter],
    queryFn: async () => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockCharacterBasic;
    },
    enabled: !!searchedCharacter,
  });

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ["characterStats", searchedCharacter],
    queryFn: async () => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 800));
      return mockCharacterStats;
    },
    enabled: !!searchedCharacter,
  });

  const { data: symbolData, isLoading: isLoadingSymbol } = useQuery({
    queryKey: ["characterSymbol", searchedCharacter],
    queryFn: async () => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 600));
      return mockCharacterSymbol;
    },
    enabled: !!searchedCharacter,
  });

  const { data: hexaCoreData, isLoading: isLoadingHexaCore } = useQuery({
    queryKey: ["characterHexaCore", searchedCharacter],
    queryFn: async () => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 700));
      return mockCharacterHexaCore;
    },
    enabled: !!searchedCharacter,
  });

  const { data: hexaStatData, isLoading: isLoadingHexaStat } = useQuery({
    queryKey: ["characterHexaStat", searchedCharacter],
    queryFn: async () => {
      // 模擬 API 延遲
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockCharacterHexaStat;
    },
    enabled: !!searchedCharacter,
  });

  const handleSearch = (characterName: string) => {
    setSearchedCharacter(characterName);
  };

  const isLoading =
    isLoadingBasic ||
    isLoadingStats ||
    isLoadingSymbol ||
    isLoadingHexaCore ||
    isLoadingHexaStat;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="container mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            楓之谷角色搜尋系統
          </h1>
          <p className="text-blue-300">查詢角色詳細資訊與能力值</p>
        </div>

        <CharacterSearch onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="mt-2 text-blue-300">載入中...</p>
          </div>
        )}

        {characterData && !isLoading && (
          <div className="space-y-8">
            <CharacterProfile character={characterData} />
            {statsData && <CharacterStats stats={statsData} />}
            {symbolData && <CharacterSymbol symbols={symbolData} />}
            {hexaCoreData && hexaStatData && (
              <CharacterHexa hexaCore={hexaCoreData} hexaStat={hexaStatData} />
            )}
          </div>
        )}

        {searchedCharacter && !characterData && !isLoading && (
          <div className="text-center text-red-400">
            <p>找不到角色資訊，請檢查角色名稱是否正確</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
