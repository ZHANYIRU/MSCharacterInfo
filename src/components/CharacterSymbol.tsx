import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterSymbol as CharacterSymbolType } from "@/types/character";
import { Gem, Star, TrendingUp } from "lucide-react";

interface CharacterSymbolProps {
  symbols: CharacterSymbolType;
}

export const CharacterSymbol: React.FC<CharacterSymbolProps> = ({
  symbols,
}) => {
  const formatNumber = (value: string) => {
    const num = parseInt(value);
    return isNaN(num) ? value : num.toLocaleString("zh-TW");
  };

  const getSymbolType = (name: string) => {
    if (name.includes("豪華真實符文")) return "luxury";
    if (name.includes("祕法符文")) return "arcane";
    if (name.includes("真實符文")) return "authentic";
    return "other";
  };

  const getSymbolTypeColor = (type: string) => {
    switch (type) {
      case "arcane":
        return "border-purple-500/50 bg-purple-950/30";
      case "authentic":
        return "border-blue-500/50 bg-blue-950/30";
      case "luxury":
        return "border-yellow-500/50 bg-yellow-950/30";
      default:
        return "border-gray-500/50 bg-gray-950/30";
    }
  };

  const getSymbolTypeTitle = (type: string) => {
    switch (type) {
      case "arcane":
        return "祕法符文";
      case "authentic":
        return "真實符文";
      case "luxury":
        return "豪華真實符文";
      default:
        return "其他符文";
    }
  };

  const getProgressPercentage = (current: number, required: number) => {
    if (required === 0) return 100;
    return Math.min((current / required) * 100, 100);
  };

  // 按類型分組符文
  const groupedSymbols = symbols.symbol.reduce(
    (acc, symbol) => {
      const type = getSymbolType(symbol.symbol_name);
      if (!acc[type]) acc[type] = [];
      acc[type].push(symbol);
      return acc;
    },
    {} as Record<string, typeof symbols.symbol>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-purple-400 flex items-center justify-center space-x-2">
            <Gem className="w-6 h-6" />
            <span>符文系統 - {symbols.character_class}</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {Object.entries(groupedSymbols).map(([type, typeSymbols]) => (
        <Card key={type} className={getSymbolTypeColor(type)}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>{getSymbolTypeTitle(type)}</span>
              <span className="text-sm text-muted-foreground">
                ({typeSymbols.length}個)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typeSymbols.map((symbol, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={symbol.symbol_icon}
                        alt={symbol.symbol_name}
                        className="w-12 h-12 rounded border border-slate-600"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-white truncate">
                          {symbol.symbol_name
                            .replace("祕法符文：", "")
                            .replace("真實符文：", "")
                            .replace("豪華真實符文：", "")}
                        </h4>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">等級</span>
                            <span className="text-blue-300 font-semibold">
                              Lv.{symbol.symbol_level}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">力量</span>
                            <span className="text-green-300">
                              {symbol.symbol_force}
                            </span>
                          </div>

                          {/* 主要能力值 */}
                          {(parseInt(symbol.symbol_str) > 0 ||
                            parseInt(symbol.symbol_dex) > 0 ||
                            parseInt(symbol.symbol_int) > 0 ||
                            parseInt(symbol.symbol_luk) > 0 ||
                            parseInt(symbol.symbol_hp) > 0) && (
                              <div className="border-t border-slate-600 pt-1 mt-2">
                                {parseInt(symbol.symbol_str) > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      STR
                                    </span>
                                    <span className="text-red-300">
                                      +{formatNumber(symbol.symbol_str)}
                                    </span>
                                  </div>
                                )}
                                {parseInt(symbol.symbol_dex) > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      DEX
                                    </span>
                                    <span className="text-green-300">
                                      +{formatNumber(symbol.symbol_dex)}
                                    </span>
                                  </div>
                                )}
                                {parseInt(symbol.symbol_int) > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      INT
                                    </span>
                                    <span className="text-blue-300">
                                      +{formatNumber(symbol.symbol_int)}
                                    </span>
                                  </div>
                                )}
                                {parseInt(symbol.symbol_luk) > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      LUK
                                    </span>
                                    <span className="text-yellow-300">
                                      +{formatNumber(symbol.symbol_luk)}
                                    </span>
                                  </div>
                                )}
                                {parseInt(symbol.symbol_hp) > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      HP
                                    </span>
                                    <span className="text-pink-300">
                                      +{formatNumber(symbol.symbol_hp)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                          {/* 特殊效果 */}
                          {(symbol.symbol_drop_rate !== "0%" ||
                            symbol.symbol_meso_rate !== "0%" ||
                            symbol.symbol_exp_rate !== "0%") && (
                              <div className="border-t border-slate-600 pt-1 mt-2">
                                {symbol.symbol_drop_rate !== "0%" && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      掉落率
                                    </span>
                                    <span className="text-purple-300">
                                      +{symbol.symbol_drop_rate}
                                    </span>
                                  </div>
                                )}
                                {symbol.symbol_meso_rate !== "0%" && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      楓幣
                                    </span>
                                    <span className="text-yellow-300">
                                      +{symbol.symbol_meso_rate}
                                    </span>
                                  </div>
                                )}
                                {symbol.symbol_exp_rate !== "0%" && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      經驗值
                                    </span>
                                    <span className="text-cyan-300">
                                      +{symbol.symbol_exp_rate}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                          {/* 成長進度 */}
                          {symbol.symbol_require_growth_count > 0 && (
                            <div className="border-t border-slate-600 pt-2 mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-muted-foreground text-xs">
                                  成長進度
                                </span>
                                <span className="text-xs text-orange-300">
                                  {(() => {
                                    // 如果符文是滿級且growth_count為0，顯示為滿級進度
                                    const isMaxLevel = (symbol.symbol_level === 20 && symbol.symbol_name.includes('祕法符文')) ||
                                      (symbol.symbol_level === 11 && symbol.symbol_name.includes('真實符文') && !symbol.symbol_name.includes('豪華'));

                                    if (isMaxLevel && symbol.symbol_growth_count === 0) {
                                      return `${symbol.symbol_require_growth_count}/${symbol.symbol_require_growth_count}`;
                                    }
                                    return `${symbol.symbol_growth_count}/${symbol.symbol_require_growth_count}`;
                                  })()}
                                </span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-orange-500 to-yellow-500 h-1.5 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${(() => {
                                      // 如果符文是滿級且growth_count為0，顯示100%進度
                                      const isMaxLevel = (symbol.symbol_level === 20 && symbol.symbol_name.includes('祕法符文')) ||
                                        (symbol.symbol_level === 11 && symbol.symbol_name.includes('真實符文') && !symbol.symbol_name.includes('豪華'));

                                      if (isMaxLevel && symbol.symbol_growth_count === 0) {
                                        return 100;
                                      }
                                      return getProgressPercentage(symbol.symbol_growth_count, symbol.symbol_require_growth_count);
                                    })()}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 符文總覽統計 */}
      <Card className="border-indigo-500/30 bg-indigo-950/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-400">符文總覽</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-400">
                {groupedSymbols.arcane?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">祕法符文</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-400">
                {groupedSymbols.authentic?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">真實符文</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-yellow-400">
                {groupedSymbols.luxury?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">豪華符文</div>
            </div>
            {(() => {
              // 計算所有符文的屬性總和
              const totals = {
                str: symbols.symbol.reduce((sum, s) => sum + parseInt(s.symbol_str || "0"), 0),
                dex: symbols.symbol.reduce((sum, s) => sum + parseInt(s.symbol_dex || "0"), 0),
                int: symbols.symbol.reduce((sum, s) => sum + parseInt(s.symbol_int || "0"), 0),
                luk: symbols.symbol.reduce((sum, s) => sum + parseInt(s.symbol_luk || "0"), 0),
                hp: symbols.symbol.reduce((sum, s) => sum + parseInt(s.symbol_hp || "0"), 0),
              };

              // 找出有數值的屬性
              const activeStats = Object.entries(totals).filter(([_, value]) => value > 0);
              
              // 如果有多個屬性，顯示總屬性
              if (activeStats.length > 1) {
                return (
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-400">總屬性</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      {activeStats.map(([stat, value]) => (
                        <div key={stat} className="flex justify-between">
                          <span>{stat.toUpperCase()}:</span>
                          <span className="text-green-300">+{value.toLocaleString("zh-TW")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // 如果只有一個屬性，顯示該屬性的總和
              if (activeStats.length === 1) {
                const [statName, value] = activeStats[0];
                return (
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-400">
                      {value.toLocaleString("zh-TW")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      總{statName.toUpperCase()}
                    </div>
                  </div>
                );
              }
              
              // 如果沒有屬性加成，顯示0
              return (
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-400">0</div>
                  <div className="text-sm text-muted-foreground">無屬性加成</div>
                </div>
              );
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
