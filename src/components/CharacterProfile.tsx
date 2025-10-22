import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterBasic } from "@/types/character";
import { Calendar, Users, Trophy, Star } from "lucide-react";

interface CharacterProfileProps {
  character: CharacterBasic;
}

export const CharacterProfile: React.FC<CharacterProfileProps> = ({
  character,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-TW");
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("zh-TW");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-blue-400">
          {character.character_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 角色圖片 */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <img
                src={character.character_image}
                alt={character.character_name}
                className="max-w-full h-auto rounded-lg border-2 border-blue-500/30"
              />
            </div>
          </div>

          {/* 基本資訊 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-800/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-500">
                      職業資訊
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">職業:</span>{" "}
                      {character.character_class}
                    </p>
                    <p>
                      <span className="text-muted-foreground">轉職:</span>{" "}
                      {character.character_class_level}轉
                    </p>
                    <p>
                      <span className="text-muted-foreground">等級:</span> Lv.
                      {character.character_level}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-500">
                      伺服器資訊
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">伺服器:</span>{" "}
                      {character.world_name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">性別:</span>{" "}
                      {character.character_gender}
                    </p>
                    <p>
                      <span className="text-muted-foreground">公會:</span>{" "}
                      {character.character_guild_name || "無公會"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-purple-500">
                      經驗值
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">經驗值:</span>{" "}
                      {formatNumber(character.character_exp)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">經驗值%:</span>{" "}
                      {character.character_exp_rate}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-blue-500">
                      創建資訊
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">創建日期:</span>{" "}
                      {formatDate(character.character_date_create)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">解放任務:</span>{" "}
                      {character.liberation_quest_clear === "1"
                        ? "已完成"
                        : "未完成"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
