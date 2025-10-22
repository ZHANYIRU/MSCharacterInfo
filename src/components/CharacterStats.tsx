import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterStats as CharacterStatsType } from "@/types/character";
import { Sword, Shield, Zap, Target, Trophy } from "lucide-react";
import { formatPowerValue } from "@/lib/utils";

interface CharacterStatsProps {
  stats: CharacterStatsType;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ stats }) => {
  const formatNumber = (value: string) => {
    const num = parseInt(value);
    return isNaN(num) ? value : num.toLocaleString("zh-TW");
  };

  const getStatIcon = (statName: string) => {
    if (statName.includes("攻擊力") || statName.includes("傷害")) {
      return <Sword className="w-4 h-4 text-red-500" />;
    }
    if (
      statName.includes("防禦") ||
      statName.includes("HP") ||
      statName.includes("MP")
    ) {
      return <Shield className="w-4 h-4 text-blue-500" />;
    }
    if (statName.includes("爆擊") || statName.includes("速度")) {
      return <Zap className="w-4 h-4 text-yellow-500" />;
    }
    return <Target className="w-4 h-4 text-gray-500" />;
  };

  const getStatCategory = (statName: string) => {
    if (
      statName.includes("攻擊力") ||
      statName.includes("傷害") ||
      statName.includes("爆擊")
    ) {
      return "attack";
    }
    if (
      statName.includes("防禦") ||
      statName.includes("HP") ||
      statName.includes("MP") ||
      statName.includes("耐性")
    ) {
      return "defense";
    }
    if (
      statName.includes("STR") ||
      statName.includes("DEX") ||
      statName.includes("INT") ||
      statName.includes("LUK")
    ) {
      return "stats";
    }
    if (
      statName.includes("速度") ||
      statName.includes("跳躍") ||
      statName.includes("冷卻")
    ) {
      return "mobility";
    }
    return "misc";
  };

  const categorizedStats = stats.final_stat.reduce(
    (acc, stat) => {
      const category = getStatCategory(stat.stat_name);
      if (!acc[category]) acc[category] = [];
      acc[category].push(stat);
      return acc;
    },
    {} as Record<string, typeof stats.final_stat>
  );

  const categoryTitles = {
    attack: "攻擊能力",
    defense: "防禦能力",
    stats: "基礎能力值",
    mobility: "移動能力",
    misc: "其他能力",
  };

  const categoryColors = {
    attack: "border-red-500/30 bg-red-950/20",
    defense: "border-blue-500/30 bg-blue-950/20",
    stats: "border-green-500/30 bg-green-950/20",
    mobility: "border-yellow-500/30 bg-yellow-950/20",
    misc: "border-purple-500/30 bg-purple-950/20",
  };

  // 找到戰鬥力數值
  const battlePowerStat = stats.final_stat.find(
    (stat) => stat.stat_name === "戰鬥力"
  );
  const battlePower = battlePowerStat ? battlePowerStat.stat_value : "0";

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-400">
            角色能力值 - {stats.character_class}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 戰鬥力顯示區塊 */}
      <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-950/30 to-orange-950/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-semibold text-yellow-400">
                戰鬥力
              </span>
            </div>
            <div className="text-3xl font-bold text-yellow-300">
              {formatPowerValue(battlePower)}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(categorizedStats).map(([category, categoryStats]) => (
          <Card
            key={category}
            className={categoryColors[category as keyof typeof categoryColors]}
          >
            <CardHeader>
              <CardTitle className="text-lg">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categoryStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded bg-slate-800/30"
                  >
                    <div className="flex items-center space-x-2">
                      {getStatIcon(stat.stat_name)}
                      <span className="text-sm font-medium">
                        {stat.stat_name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-300">
                      {formatNumber(stat.stat_value)}
                      {stat.stat_name.includes("%") ||
                      stat.stat_name.includes("率")
                        ? ""
                        : ""}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.remain_ap > 0 && (
        <Card className="border-orange-500/30 bg-orange-950/20">
          <CardContent className="p-4">
            <div className="text-center">
              <span className="text-orange-400 font-semibold">
                剩餘 AP: {stats.remain_ap}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
