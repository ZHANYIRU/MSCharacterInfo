import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { characterApi } from "@/api/character";
import { CharacterSearch } from "@/components/CharacterSearch";
import { CharacterProfile } from "@/components/CharacterProfile";
import { CharacterStats } from "@/components/CharacterStats";
import { CharacterSymbol } from "@/components/CharacterSymbol";
import { CharacterHexa } from "@/components/CharacterHexa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const [searchedCharacter, setSearchedCharacter] = useState<string>("");

  // 第一步：獲取 OCID
  const { data: ocid, isLoading: isLoadingOcid } = useQuery({
    queryKey: ["characterOcid", searchedCharacter],
    queryFn: async () => {
      const ocid = await characterApi.getCharacterOcid(searchedCharacter);
      // 將 OCID 存儲到 localStorage
      localStorage.setItem(`ocid_${searchedCharacter}`, ocid);
      return ocid;
    },
    enabled: !!searchedCharacter,
    staleTime: 1000 * 60 * 60, // 1小時內不重新獲取 OCID
  });

  // 第二步：使用 OCID 獲取角色基本資訊
  const { data: characterData, isLoading: isLoadingBasic } = useQuery({
    queryKey: ["characterBasic", ocid],
    queryFn: async () => {
      return await characterApi.getCharacterBasic(ocid!);
    },
    enabled: !!ocid,
  });

  // 獲取角色能力值
  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ["characterStats", ocid],
    queryFn: async () => {
      return await characterApi.getCharacterStats(ocid!);
    },
    enabled: !!ocid,
  });

  // 獲取符文資訊
  const { data: symbolData, isLoading: isLoadingSymbol } = useQuery({
    queryKey: ["characterSymbol", ocid],
    queryFn: async () => {
      return await characterApi.getCharacterSymbol(ocid!);
    },
    enabled: !!ocid,
  });

  // 獲取 HEXA 核心
  const { data: hexaCoreData, isLoading: isLoadingHexaCore } = useQuery({
    queryKey: ["characterHexaCore", ocid],
    queryFn: async () => {
      return await characterApi.getCharacterHexaCore(ocid!);
    },
    enabled: !!ocid,
  });

  // 獲取 HEXA 屬性
  const { data: hexaStatData, isLoading: isLoadingHexaStat } = useQuery({
    queryKey: ["characterHexaStat", ocid],
    queryFn: async () => {
      return await characterApi.getCharacterHexaStat(ocid!);
    },
    enabled: !!ocid,
  });

  const handleSearch = (characterName: string) => {
    setSearchedCharacter(characterName);
  };

  const isLoading =
    isLoadingOcid ||
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
            {/* 角色基本資訊始終顯示在頂部 */}
            <CharacterProfile character={characterData} />

            {/* 分頁標籤系統 */}
            <Tabs defaultValue="stats" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 h-12 p-1">
                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-sm font-medium transition-all duration-200 hover:bg-slate-700"
                >
                  ⚔️ 能力值統計
                </TabsTrigger>
                <TabsTrigger
                  value="symbols"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-sm font-medium transition-all duration-200 hover:bg-slate-700"
                >
                  🔮 符文系統
                </TabsTrigger>
                <TabsTrigger
                  value="hexa"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-sm font-medium transition-all duration-200 hover:bg-slate-700"
                >
                  🌟 HEXA 六轉
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="mt-6">
                {statsData && <CharacterStats stats={statsData} />}
              </TabsContent>

              <TabsContent value="symbols" className="mt-6">
                {symbolData && <CharacterSymbol symbols={symbolData} />}
              </TabsContent>

              <TabsContent value="hexa" className="mt-6">
                {hexaCoreData && hexaStatData && (
                  <CharacterHexa
                    hexaCore={hexaCoreData}
                    hexaStat={hexaStatData}
                  />
                )}
              </TabsContent>
            </Tabs>
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
