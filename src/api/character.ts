import axios from "axios";
import { CharacterBasic, CharacterStats, CharacterSymbol, CharacterHexaCore, CharacterHexaStat, CharacterItemEquipment, CharacterUnion } from "@/types/character";

const apiKey = import.meta.env.VITE_NEXON_API_KEY;

if (!apiKey) {
  console.warn("VITE_NEXON_API_KEY 環境變數未設定，API 調用可能會失敗");
}

const api = axios.create({
  baseURL: "https://open.api.nexon.com/maplestorytw/v1",
  headers: {
    "x-nxopen-api-key": apiKey || "",
  },
});

// OCID 查詢介面
interface OcidResponse {
  ocid: string;
}

export const characterApi = {
  // 第一步：根據角色名稱獲取 OCID
  getCharacterOcid: async (characterName: string): Promise<string> => {
    const response = await api.get<OcidResponse>(`/id?character_name=${encodeURIComponent(characterName)}`);
    return response.data.ocid;
  },

  // 第二步：使用 OCID 獲取各種角色資訊
  getCharacterBasic: async (ocid: string): Promise<CharacterBasic> => {
    const response = await api.get(`/character/basic?ocid=${ocid}`);
    return response.data;
  },

  getCharacterStats: async (ocid: string): Promise<CharacterStats> => {
    const response = await api.get(`/character/stat?ocid=${ocid}`);
    return response.data;
  },

  getCharacterSymbol: async (ocid: string): Promise<CharacterSymbol> => {
    const response = await api.get(`/character/symbol-equipment?ocid=${ocid}`);
    return response.data;
  },

  getCharacterHexaCore: async (ocid: string): Promise<CharacterHexaCore> => {
    const response = await api.get(`/character/hexamatrix?ocid=${ocid}`);
    return response.data;
  },

  getCharacterHexaStat: async (ocid: string): Promise<CharacterHexaStat> => {
    const response = await api.get(`/character/hexamatrix-stat?ocid=${ocid}`);
    return response.data;
  },

  getCharacterItemEquipment: async (ocid: string): Promise<CharacterItemEquipment> => {
    const response = await api.get(`/character/item-equipment?ocid=${ocid}`);
    return response.data;
  },

  getCharacterUnion: async (ocid: string): Promise<CharacterUnion> => {
    const response = await api.get(`/user/union?ocid=${ocid}`);
    return response.data;
  }
};
