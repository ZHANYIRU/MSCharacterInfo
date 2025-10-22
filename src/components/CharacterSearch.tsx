import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterSearchProps {
  onSearch: (characterName: string) => void;
  isLoading: boolean;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({
  onSearch,
  isLoading,
}) => {
  const [characterName, setCharacterName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characterName.trim()) {
      onSearch(characterName.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-blue-400">
          楓之谷角色搜尋
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="輸入角色名稱..."
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || !characterName.trim()}
          >
            {isLoading ? "搜尋中..." : "搜尋角色"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
