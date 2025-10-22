import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterHexaCore, CharacterHexaStat } from "@/types/character";
import { Hexagon, Star, TrendingUp, Zap, Target, Flame } from "lucide-react";

interface CharacterHexaProps {
  hexaCore: CharacterHexaCore;
  hexaStat: CharacterHexaStat;
}

export const CharacterHexa: React.FC<CharacterHexaProps> = ({
  hexaCore,
  hexaStat,
}) => {
  // 檢查是否有六轉技能
  const hasHexaCore = hexaCore?.character_hexa_core_equipment && hexaCore.character_hexa_core_equipment.length > 0;
  
  // 如果沒有六轉技能，顯示提示訊息
  if (!hasHexaCore) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl text-cyan-400 flex items-center justify-center space-x-2">
              <Hexagon className="w-6 h-6" />
              <span>HEXA 六轉技能系統</span>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-gray-500/30 bg-gray-950/20">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <Hexagon className="w-16 h-16 text-gray-400 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-300">尚未六轉</h3>
                <p className="text-gray-400">
                  此角色尚未進行六轉，無法查看 HEXA 技能資訊
                </p>
                <p className="text-sm text-gray-500">
                  需要達到 260 等級並完成六轉任務才能使用 HEXA 系統
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  // 共用核心升級材料表 (累積需求)
  const commonCoreRequirements = [
    { level: 1, souls: 7, fragments: 125 },
    { level: 2, souls: 9, fragments: 163 },
    { level: 3, souls: 11, fragments: 207 },
    { level: 4, souls: 13, fragments: 257 },
    { level: 5, souls: 16, fragments: 314 },
    { level: 6, souls: 19, fragments: 377 },
    { level: 7, souls: 22, fragments: 446 },
    { level: 8, souls: 27, fragments: 521 },
    { level: 9, souls: 32, fragments: 603 },
    { level: 10, souls: 46, fragments: 903 },
    { level: 11, souls: 51, fragments: 1013 },
    { level: 12, souls: 56, fragments: 1137 },
    { level: 13, souls: 62, fragments: 1275 },
    { level: 14, souls: 68, fragments: 1427 },
    { level: 15, souls: 74, fragments: 1592 },
    { level: 16, souls: 80, fragments: 1771 },
    { level: 17, souls: 86, fragments: 1964 },
    { level: 18, souls: 92, fragments: 2171 },
    { level: 19, souls: 99, fragments: 2391 },
    { level: 20, souls: 116, fragments: 2916 },
    { level: 21, souls: 123, fragments: 3150 },
    { level: 22, souls: 130, fragments: 3398 },
    { level: 23, souls: 137, fragments: 3660 },
    { level: 24, souls: 144, fragments: 3935 },
    { level: 25, souls: 151, fragments: 4224 },
    { level: 26, souls: 160, fragments: 4527 },
    { level: 27, souls: 169, fragments: 4844 },
    { level: 28, souls: 178, fragments: 5174 },
    { level: 29, souls: 188, fragments: 5518 },
    { level: 30, souls: 208, fragments: 6268 },
  ];

  // 技能核心升級材料表 (起源技能 - 累積需求)
  const skillCoreRequirements = [
    { level: 1, souls: 0, fragments: 0 }, // 0→1 自動獲得
    { level: 2, souls: 1, fragments: 30 },
    { level: 3, souls: 2, fragments: 65 },
    { level: 4, souls: 3, fragments: 105 },
    { level: 5, souls: 5, fragments: 150 },
    { level: 6, souls: 7, fragments: 200 },
    { level: 7, souls: 9, fragments: 255 },
    { level: 8, souls: 12, fragments: 315 },
    { level: 9, souls: 15, fragments: 380 },
    { level: 10, souls: 25, fragments: 580 },
    { level: 11, souls: 28, fragments: 660 },
    { level: 12, souls: 31, fragments: 750 },
    { level: 13, souls: 35, fragments: 850 },
    { level: 14, souls: 39, fragments: 960 },
    { level: 15, souls: 43, fragments: 1080 },
    { level: 16, souls: 47, fragments: 1210 },
    { level: 17, souls: 51, fragments: 1350 },
    { level: 18, souls: 55, fragments: 1500 },
    { level: 19, souls: 60, fragments: 1660 },
    { level: 20, souls: 75, fragments: 2010 },
    { level: 21, souls: 80, fragments: 2180 },
    { level: 22, souls: 85, fragments: 2360 },
    { level: 23, souls: 90, fragments: 2550 },
    { level: 24, souls: 95, fragments: 2750 },
    { level: 25, souls: 100, fragments: 2960 },
    { level: 26, souls: 106, fragments: 3180 },
    { level: 27, souls: 112, fragments: 3410 },
    { level: 28, souls: 118, fragments: 3650 },
    { level: 29, souls: 125, fragments: 3900 },
    { level: 30, souls: 145, fragments: 4400 },
  ];

  // 精通核心升級材料表 (精通技能 - 累積需求)
  const masteryRequirements = [
    { level: 1, souls: 3, fragments: 50 }, // 0→1 需要材料
    { level: 2, souls: 4, fragments: 65 },
    { level: 3, souls: 5, fragments: 83 },
    { level: 4, souls: 6, fragments: 103 },
    { level: 5, souls: 7, fragments: 126 },
    { level: 6, souls: 8, fragments: 151 },
    { level: 7, souls: 9, fragments: 179 },
    { level: 8, souls: 11, fragments: 209 },
    { level: 9, souls: 13, fragments: 242 },
    { level: 10, souls: 18, fragments: 342 },
    { level: 11, souls: 20, fragments: 382 },
    { level: 12, souls: 22, fragments: 427 },
    { level: 13, souls: 24, fragments: 477 },
    { level: 14, souls: 26, fragments: 532 },
    { level: 15, souls: 28, fragments: 592 },
    { level: 16, souls: 30, fragments: 657 },
    { level: 17, souls: 32, fragments: 727 },
    { level: 18, souls: 34, fragments: 802 },
    { level: 19, souls: 37, fragments: 882 },
    { level: 20, souls: 45, fragments: 1057 },
    { level: 21, souls: 48, fragments: 1142 },
    { level: 22, souls: 51, fragments: 1232 },
    { level: 23, souls: 54, fragments: 1327 },
    { level: 24, souls: 57, fragments: 1427 },
    { level: 25, souls: 60, fragments: 1532 },
    { level: 26, souls: 63, fragments: 1642 },
    { level: 27, souls: 66, fragments: 1757 },
    { level: 28, souls: 69, fragments: 1877 },
    { level: 29, souls: 73, fragments: 2002 },
    { level: 30, souls: 83, fragments: 2252 },
  ];

  // 強化核心升級材料表 (強化技能 - 累積需求)
  const enhanceRequirements = [
    { level: 1, souls: 4, fragments: 75 }, // 0→1 需要材料
    { level: 2, souls: 5, fragments: 98 },
    { level: 3, souls: 6, fragments: 125 },
    { level: 4, souls: 7, fragments: 155 },
    { level: 5, souls: 9, fragments: 189 },
    { level: 6, souls: 11, fragments: 227 },
    { level: 7, souls: 13, fragments: 269 },
    { level: 8, souls: 16, fragments: 314 },
    { level: 9, souls: 19, fragments: 363 },
    { level: 10, souls: 27, fragments: 513 },
    { level: 11, souls: 30, fragments: 573 },
    { level: 12, souls: 33, fragments: 641 },
    { level: 13, souls: 36, fragments: 716 },
    { level: 14, souls: 39, fragments: 799 },
    { level: 15, souls: 42, fragments: 889 },
    { level: 16, souls: 45, fragments: 987 },
    { level: 17, souls: 48, fragments: 1092 },
    { level: 18, souls: 51, fragments: 1205 },
    { level: 19, souls: 55, fragments: 1325 },
    { level: 20, souls: 67, fragments: 1588 },
    { level: 21, souls: 71, fragments: 1716 },
    { level: 22, souls: 75, fragments: 1851 },
    { level: 23, souls: 79, fragments: 1994 },
    { level: 24, souls: 83, fragments: 2144 },
    { level: 25, souls: 87, fragments: 2302 },
    { level: 26, souls: 92, fragments: 2467 },
    { level: 27, souls: 97, fragments: 2640 },
    { level: 28, souls: 102, fragments: 2820 },
    { level: 29, souls: 108, fragments: 3008 },
    { level: 30, souls: 123, fragments: 3383 },
  ];

  // 計算升級所需材料
  const calculateUpgradeMaterials = (
    currentLevel: number,
    coreType: string,
    maxLevel: number = 30
  ) => {
    if (currentLevel >= maxLevel) return { souls: 0, fragments: 0 };

    let requirements;
    switch (coreType) {
      case "共用核心":
        requirements = commonCoreRequirements;
        break;
      case "技能核心":
        requirements = skillCoreRequirements;
        break;
      case "精通核心":
        requirements = masteryRequirements;
        break;
      case "強化核心":
        requirements = enhanceRequirements;
        break;
      default:
        requirements = skillCoreRequirements; // 默認使用技能核心
    }

    const currentReq = requirements.find((r) => r.level === currentLevel) || {
      souls: 0,
      fragments: 0,
    };
    const maxReq =
      requirements.find((r) => r.level === maxLevel) ||
      requirements[requirements.length - 1];

    return {
      souls: maxReq.souls - currentReq.souls,
      fragments: maxReq.fragments - currentReq.fragments,
    };
  };

  const getHexaCoreTypeColor = (type: string) => {
    switch (type) {
      case "技能核心":
        return "border-red-500/50 bg-red-950/30";
      case "精通核心":
        return "border-blue-500/50 bg-blue-950/30";
      case "強化核心":
        return "border-purple-500/50 bg-purple-950/30";
      case "共用核心":
        return "border-yellow-500/50 bg-yellow-950/30";
      default:
        return "border-gray-500/50 bg-gray-950/30";
    }
  };

  const getHexaCoreTypeIcon = (type: string) => {
    switch (type) {
      case "技能核心":
        return <Flame className="w-5 h-5 text-red-400" />;
      case "精通核心":
        return <Star className="w-5 h-5 text-blue-400" />;
      case "強化核心":
        return <Zap className="w-5 h-5 text-purple-400" />;
      case "共用核心":
        return <Target className="w-5 h-5 text-yellow-400" />;
      default:
        return <Hexagon className="w-5 h-5 text-gray-400" />;
    }
  };

  // 按類型分組核心
  const groupedCores = hexaCore.character_hexa_core_equipment.reduce(
    (acc, core) => {
      const type = core.hexa_core_type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(core);
      return acc;
    },
    {} as Record<string, typeof hexaCore.character_hexa_core_equipment>
  );

  // 獲取活躍的 HEXA 屬性核心，並標記來源
  const activeHexaStats = [
    ...(hexaStat.character_hexa_stat_core || [])
      .filter((stat) => stat.stat_grade > 0)
      .map((stat) => ({ ...stat, coreGroup: 1 })),
    ...(hexaStat.character_hexa_stat_core_2 || [])
      .filter((stat) => stat.stat_grade > 0)
      .map((stat) => ({ ...stat, coreGroup: 2 })),
    ...(hexaStat.character_hexa_stat_core_3 || [])
      .filter((stat) => stat.stat_grade > 0)
      .map((stat) => ({ ...stat, coreGroup: 3 })),
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-cyan-400 flex items-center justify-center space-x-2">
            <Hexagon className="w-6 h-6" />
            <span>HEXA 六轉技能系統</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* HEXA 核心技能 */}
      <div className="space-y-4">
        {Object.entries(groupedCores).map(([type, cores]) => (
          <Card key={type} className={getHexaCoreTypeColor(type)}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                {getHexaCoreTypeIcon(type)}
                <span>{type}</span>
                <span className="text-sm text-muted-foreground">
                  ({cores.length}個)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cores.map((core, index) => {
                  const materials = calculateUpgradeMaterials(
                    core.hexa_core_level,
                    core.hexa_core_type
                  );
                  return (
                    <Card
                      key={index}
                      className="bg-slate-800/50 border-slate-700/50"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white text-sm">
                              {core.hexa_core_name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded">
                                Lv.{core.hexa_core_level}
                              </span>
                              {core.hexa_core_level < 30 && (
                                <span className="text-xs text-orange-400">
                                  未滿級
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 連結技能 */}
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">
                              連結技能:
                            </div>
                            {core.linked_skill.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className="text-xs text-blue-300 pl-2"
                              >
                                • {skill.hexa_skill_id}
                              </div>
                            ))}
                          </div>

                          {/* 升級材料需求 */}
                          {core.hexa_core_level < 30 && (
                            <div className="border-t border-slate-600 pt-2 space-y-1">
                              <div className="text-xs text-muted-foreground">
                                升級至滿級還需要:
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-purple-300">
                                  靈魂艾爾達
                                </span>
                                <span className="text-purple-300">
                                  {materials.souls.toLocaleString("zh-TW")}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-blue-300">
                                  靈魂艾爾達碎片
                                </span>
                                <span className="text-blue-300">
                                  {materials.fragments.toLocaleString("zh-TW")}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* 進度條 */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">
                                等級進度
                              </span>
                              <span className="text-cyan-300">
                                {core.hexa_core_level}/30
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(core.hexa_core_level / 30) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* HEXA 屬性核心 */}
      {activeHexaStats.length > 0 && (
        <Card className="border-emerald-500/50 bg-emerald-950/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400">HEXA 屬性核心</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeHexaStats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700/50"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-emerald-300">
                          屬性核心 #{stat.coreGroup}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          等級 {stat.stat_grade}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-emerald-900/30 rounded">
                          <span className="text-xs text-emerald-200">
                            主屬性
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-emerald-300">
                              {stat.main_stat_name}
                            </div>
                            <div className="text-xs text-emerald-400">
                              Lv.{stat.main_stat_level}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-blue-900/30 rounded">
                          <span className="text-xs text-blue-200">副屬性1</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-blue-300">
                              {stat.sub_stat_name_1}
                            </div>
                            <div className="text-xs text-blue-400">
                              Lv.{stat.sub_stat_level_1}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-2 bg-purple-900/30 rounded">
                          <span className="text-xs text-purple-200">
                            副屬性2
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-purple-300">
                              {stat.sub_stat_name_2}
                            </div>
                            <div className="text-xs text-purple-400">
                              Lv.{stat.sub_stat_level_2}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* HEXA 系統總覽 */}
      <Card className="border-indigo-500/30 bg-indigo-950/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Hexagon className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-400">HEXA 系統總覽</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 進度統計 */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 總進度 */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="text-3xl font-bold text-blue-400">
                    {(() => {
                      // 計算總需要碎片數和剩餘碎片數
                      let totalMaxFragments = 0;
                      let totalRemainingFragments = 0;

                      hexaCore.character_hexa_core_equipment.forEach((core) => {
                        let maxFragments;
                        switch (core.hexa_core_type) {
                          case "共用核心":
                            maxFragments = 6268;
                            break;
                          case "技能核心":
                            maxFragments = 4400;
                            break;
                          case "精通核心":
                            maxFragments = 2252;
                            break;
                          case "強化核心":
                            maxFragments = 3383;
                            break;
                          default:
                            maxFragments = 4400;
                        }
                        totalMaxFragments += maxFragments;

                        const materials = calculateUpgradeMaterials(
                          core.hexa_core_level,
                          core.hexa_core_type
                        );
                        totalRemainingFragments += materials.fragments;
                      });

                      const progress =
                        totalMaxFragments > 0
                          ? ((totalMaxFragments - totalRemainingFragments) /
                            totalMaxFragments) *
                          100
                          : 0;
                      return Math.round(progress);
                    })()}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    總進度 (包含共用核心)
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(() => {
                        let totalMaxFragments = 0;
                        let totalRemainingFragments = 0;

                        hexaCore.character_hexa_core_equipment.forEach(
                          (core) => {
                            let maxFragments;
                            switch (core.hexa_core_type) {
                              case "共用核心":
                                maxFragments = 6268;
                                break;
                              case "技能核心":
                                maxFragments = 4400;
                                break;
                              case "精通核心":
                                maxFragments = 2252;
                                break;
                              case "強化核心":
                                maxFragments = 3383;
                                break;
                              default:
                                maxFragments = 4400;
                            }
                            totalMaxFragments += maxFragments;

                            const materials = calculateUpgradeMaterials(
                              core.hexa_core_level,
                              core.hexa_core_type
                            );
                            totalRemainingFragments += materials.fragments;
                          }
                        );

                        const progress =
                          totalMaxFragments > 0
                            ? ((totalMaxFragments - totalRemainingFragments) /
                              totalMaxFragments) *
                            100
                            : 0;
                        return Math.round(progress);
                      })()}%`,
                    }}
                  />
                </div>
              </div>

              {/* 不含共用核心進度 */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="text-3xl font-bold text-emerald-400">
                    {(() => {
                      // 計算不含共用核心的總需要碎片數和剩餘碎片數
                      let totalMaxFragments = 0;
                      let totalRemainingFragments = 0;

                      const nonCommonCores =
                        hexaCore.character_hexa_core_equipment.filter(
                          (core) => core.hexa_core_type !== "共用核心"
                        );

                      nonCommonCores.forEach((core) => {
                        let maxFragments;
                        switch (core.hexa_core_type) {
                          case "技能核心":
                            maxFragments = 4400;
                            break;
                          case "精通核心":
                            maxFragments = 2252;
                            break;
                          case "強化核心":
                            maxFragments = 3383;
                            break;
                          default:
                            maxFragments = 4400;
                        }
                        totalMaxFragments += maxFragments;

                        const materials = calculateUpgradeMaterials(
                          core.hexa_core_level,
                          core.hexa_core_type
                        );
                        totalRemainingFragments += materials.fragments;
                      });

                      const progress =
                        totalMaxFragments > 0
                          ? ((totalMaxFragments - totalRemainingFragments) /
                            totalMaxFragments) *
                          100
                          : 0;
                      return Math.round(progress);
                    })()}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    進度 (不含共用核心)
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(() => {
                        let totalMaxFragments = 0;
                        let totalRemainingFragments = 0;

                        const nonCommonCores =
                          hexaCore.character_hexa_core_equipment.filter(
                            (core) => core.hexa_core_type !== "共用核心"
                          );

                        nonCommonCores.forEach((core) => {
                          let maxFragments;
                          switch (core.hexa_core_type) {
                            case "技能核心":
                              maxFragments = 4400;
                              break;
                            case "精通核心":
                              maxFragments = 2252;
                              break;
                            case "強化核心":
                              maxFragments = 3383;
                              break;
                            default:
                              maxFragments = 4400;
                          }
                          totalMaxFragments += maxFragments;

                          const materials = calculateUpgradeMaterials(
                            core.hexa_core_level,
                            core.hexa_core_type
                          );
                          totalRemainingFragments += materials.fragments;
                        });

                        const progress =
                          totalMaxFragments > 0
                            ? ((totalMaxFragments - totalRemainingFragments) /
                              totalMaxFragments) *
                            100
                            : 0;
                        return Math.round(progress);
                      })()}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 其他統計 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-cyan-400">
                {hexaCore.character_hexa_core_equipment.length}
              </div>
              <div className="text-sm text-muted-foreground">總核心數</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-400">
                {
                  hexaCore.character_hexa_core_equipment.filter(
                    (core) => core.hexa_core_level === 30
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">滿級核心</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-400">
                {
                  hexaCore.character_hexa_core_equipment.filter(
                    (core) => core.hexa_core_level < 30
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">未滿級核心</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-yellow-400">
                {activeHexaStats.length}
              </div>
              <div className="text-sm text-muted-foreground">屬性核心</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-red-400">
                {hexaCore.character_hexa_core_equipment
                  .reduce((sum, core) => {
                    const materials = calculateUpgradeMaterials(
                      core.hexa_core_level,
                      core.hexa_core_type
                    );
                    return sum + materials.souls;
                  }, 0)
                  .toLocaleString("zh-TW")}
              </div>
              <div className="text-sm text-muted-foreground">
                需要靈魂艾爾達
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-400">
                {hexaCore.character_hexa_core_equipment
                  .reduce((sum, core) => {
                    const materials = calculateUpgradeMaterials(
                      core.hexa_core_level,
                      core.hexa_core_type
                    );
                    return sum + materials.fragments;
                  }, 0)
                  .toLocaleString("zh-TW")}
              </div>
              <div className="text-sm text-muted-foreground">
                需要靈魂艾爾達碎片
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
