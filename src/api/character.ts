import axios from "axios";
import { CharacterBasic, CharacterStats, CharacterSymbol, CharacterHexaCore, CharacterHexaStat } from "@/types/character";

const api = axios.create({
  baseURL: "https://open.api.nexon.com/maplestorytw/v1",
  headers: {
    "x-nxopen-api-key": "test_3b58da8904abf294fdcd7ab94e7fbcb568d6c21754facb150679d8b30d7017c7efe8d04e6d233bd35cf2fabdeb93fb0d",
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
  }
};
