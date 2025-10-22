import axios from "axios";
import { CharacterBasic, CharacterStats } from "@/types/character";

const api = axios.create({
  baseURL: "https://open.api.nexon.com/maplestorytw/v1",
  headers: {
    "x-nxopen-api-key": "YOUR_API_KEY_HERE", // 請替換為實際的 API Key
  },
});

export const characterApi = {
  getCharacterBasic: async (characterName: string): Promise<CharacterBasic> => {
    const response = await api.get(
      `/character/basic?character_name=${encodeURIComponent(characterName)}`
    );
    return response.data;
  },

  getCharacterStats: async (ocid: string): Promise<CharacterStats> => {
    const response = await api.get(`/character/stat?ocid=${ocid}`);
    return response.data;
  },
};
