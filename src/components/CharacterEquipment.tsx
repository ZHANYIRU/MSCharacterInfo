import React from 'react';
import { CharacterItemEquipment, ItemEquipment } from '../types/character';

interface CharacterEquipmentProps {
  equipment: CharacterItemEquipment | null;
}

// 根據潛在能力等級獲取顏色
const getPotentialColor = (grade: string) => {
  switch (grade) {
    case '傳說':
      return 'text-green-400';
    case '罕見':
      return 'text-yellow-400';
    case '稀有':
      return 'text-purple-400';
    case '特殊':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

// 星力顯示組件
const StarforceDisplay: React.FC<{ starforce: string; itemSlot: string }> = ({ starforce, itemSlot }) => {
  // 這些裝備部位不顯示星力
  const noStarforceSlots = ['輔助武器', '徽章', '勳章', '口袋道具'];
  
  if (noStarforceSlots.includes(itemSlot)) {
    return null;
  }
  
  const stars = parseInt(starforce) || 0;
  
  if (stars === 0) return null;
  
  // 胸章特殊處理：只顯示實際星數
  if (itemSlot === '胸章') {
    return (
      <div className="mb-2 flex justify-center">
        <div className="flex gap-0.5">
          {Array.from({ length: stars }, (_, i) => (
            <span key={i} className="text-xs text-yellow-400">★</span>
          ))}
        </div>
      </div>
    );
  }
  
  // 其他裝備：30顆星星格式
  // 渲染星星組（每5顆為一組）
  const renderStarGroup = (startIndex: number) => {
    return (
      <div key={startIndex} className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const starIndex = startIndex + i;
          return (
            <span
              key={starIndex}
              className={`text-xs ${
                starIndex < stars ? 'text-yellow-400' : 'text-gray-600'
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="mb-2">
      {/* 上排15顆星星 (0-14) */}
      <div className="flex gap-2 justify-center mb-1">
        {renderStarGroup(0)}
        {renderStarGroup(5)}
        {renderStarGroup(10)}
      </div>
      
      {/* 下排15顆星星 (15-29) */}
      <div className="flex gap-2 justify-center">
        {renderStarGroup(15)}
        {renderStarGroup(20)}
        {renderStarGroup(25)}
      </div>
    </div>
  );
};

// 裝備詳細資訊Tooltip組件
const EquipmentTooltip: React.FC<{ item: ItemEquipment }> = ({ item }) => {
  const formatStatValue = (value: string | number) => {
    const num = typeof value === 'string' ? parseInt(value) || 0 : value;
    return num > 0 ? `+${num}` : num === 0 ? '' : num.toString();
  };

  const getStatBreakdown = (
    total: string,
    base: string,
    starforce: string,
    etc: string,
    add: string
  ) => {
    const totalNum = parseInt(total) || 0;
    const baseNum = parseInt(base) || 0;
    const starforceNum = parseInt(starforce) || 0;
    const etcNum = parseInt(etc) || 0;
    const addNum = parseInt(add) || 0;
    
    if (totalNum === 0) return null;
    
    const parts = [];
    if (baseNum > 0) parts.push(<span key="base" className="text-white">{baseNum}</span>);
    if (starforceNum > 0) parts.push(<span key="star" className="text-yellow-400">+{starforceNum}</span>);
    if (etcNum > 0) parts.push(<span key="etc" className="text-cyan-400">+{etcNum}</span>);
    if (addNum > 0) parts.push(<span key="add" className="text-green-400">+{addNum}</span>);
    
    return (
      <span>
        {formatStatValue(totalNum)} ({parts.map((part, i) => (
          <React.Fragment key={i}>
            {i > 0 && ' '}
            {part}
          </React.Fragment>
        ))})
      </span>
    );
  };

  // 檢查是否為特殊戒指
  const isSpecialRing = item.special_ring_level > 0;
  const isRing = item.item_equipment_slot.includes('戒指');
  const shouldShowStarforce = !isSpecialRing || !isRing;

  return (
    <div className="absolute z-50 bg-gray-900/95 border border-yellow-500/50 rounded-lg p-4 shadow-2xl min-w-80 max-w-96 backdrop-blur-sm">
      {shouldShowStarforce && <StarforceDisplay starforce={item.starforce} itemSlot={item.item_equipment_slot} />}
      
      {/* 特殊戒指等級顯示 */}
      {isSpecialRing && isRing && (
        <div className="mb-2">
          <span className="text-purple-400 font-bold">{item.item_name} Lv.{item.special_ring_level}</span>
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-3">
        <img src={item.item_icon} alt={item.item_name} className="w-10 h-10" />
        <div>
          <h3 className="text-white font-bold text-lg">{item.item_name}</h3>
          <p className="text-gray-300 text-sm">
            Lv. {item.item_base_option.base_equipment_level || 0}
            {item.item_add_option.equipment_level_decrease ? 
              ` (${item.item_base_option.base_equipment_level} - ${item.item_add_option.equipment_level_decrease})`:""
            }
          </p>
        </div>
      </div>

      <div className="space-y-1 text-sm mb-3">
        {/* 主要屬性 */}
        {getStatBreakdown(
          item.item_total_option.str,
          item.item_base_option.str,
          item.item_starforce_option.str,
          item.item_etc_option.str,
          item.item_add_option.str
        ) && (
          <div className="text-white">
            STR {getStatBreakdown(
              item.item_total_option.str,
              item.item_base_option.str,
              item.item_starforce_option.str,
              item.item_etc_option.str,
              item.item_add_option.str
            )}
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.dex,
          item.item_base_option.dex,
          item.item_starforce_option.dex,
          item.item_etc_option.dex,
          item.item_add_option.dex
        ) && (
          <div className="text-white">
            DEX {getStatBreakdown(
              item.item_total_option.dex,
              item.item_base_option.dex,
              item.item_starforce_option.dex,
              item.item_etc_option.dex,
              item.item_add_option.dex
            )}
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.int,
          item.item_base_option.int,
          item.item_starforce_option.int,
          item.item_etc_option.int,
          item.item_add_option.int
        ) && (
          <div className="text-white">
            INT {getStatBreakdown(
              item.item_total_option.int,
              item.item_base_option.int,
              item.item_starforce_option.int,
              item.item_etc_option.int,
              item.item_add_option.int
            )}
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.luk,
          item.item_base_option.luk,
          item.item_starforce_option.luk,
          item.item_etc_option.luk,
          item.item_add_option.luk
        ) && (
          <div className="text-white">
            LUK {getStatBreakdown(
              item.item_total_option.luk,
              item.item_base_option.luk,
              item.item_starforce_option.luk,
              item.item_etc_option.luk,
              item.item_add_option.luk
            )}
          </div>
        )}

        {/* 其他屬性 */}
        {item.item_total_option.all_stat && parseInt(item.item_total_option.all_stat) > 0 && (
          <div className="text-white">
            全屬性 {formatStatValue(item.item_total_option.all_stat)}% (
            <span className="text-white">{item.item_base_option.all_stat || '0'}%</span>
            {item.item_add_option.all_stat && parseInt(item.item_add_option.all_stat) > 0 && (
              <> <span className="text-green-400">+{item.item_add_option.all_stat}%</span></>
            )}
            )
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.max_hp,
          item.item_base_option.max_hp,
          item.item_starforce_option.max_hp,
          item.item_etc_option.max_hp,
          item.item_add_option.max_hp
        ) && (
          <div className="text-white">
            最大HP {getStatBreakdown(
              item.item_total_option.max_hp,
              item.item_base_option.max_hp,
              item.item_starforce_option.max_hp,
              item.item_etc_option.max_hp,
              item.item_add_option.max_hp
            )}
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.attack_power,
          item.item_base_option.attack_power,
          item.item_starforce_option.attack_power,
          item.item_etc_option.attack_power,
          item.item_add_option.attack_power
        ) && (
          <div className="text-white">
            攻擊力 {getStatBreakdown(
              item.item_total_option.attack_power,
              item.item_base_option.attack_power,
              item.item_starforce_option.attack_power,
              item.item_etc_option.attack_power,
              item.item_add_option.attack_power
            )}
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.magic_power,
          item.item_base_option.magic_power,
          item.item_starforce_option.magic_power,
          item.item_etc_option.magic_power,
          item.item_add_option.magic_power
        ) && (
          <div className="text-white">
            魔法攻擊力 {getStatBreakdown(
              item.item_total_option.magic_power,
              item.item_base_option.magic_power,
              item.item_starforce_option.magic_power,
              item.item_etc_option.magic_power,
              item.item_add_option.magic_power
            )}
          </div>
        )}
        
        {getStatBreakdown(
          item.item_total_option.armor,
          item.item_base_option.armor,
          item.item_starforce_option.armor,
          item.item_etc_option.armor,
          item.item_add_option.armor
        ) && (
          <div className="text-white">
            防禦力 {getStatBreakdown(
              item.item_total_option.armor,
              item.item_base_option.armor,
              item.item_starforce_option.armor,
              item.item_etc_option.armor,
              item.item_add_option.armor
            )}
          </div>
        )}

        {item.item_total_option.boss_damage && parseInt(item.item_total_option.boss_damage) > 0 && (
          <div className="text-white">BOSS怪物傷害 +{item.item_total_option.boss_damage}%</div>
        )}

        {item.item_total_option.ignore_monster_armor && parseInt(item.item_total_option.ignore_monster_armor) > 0 && (
          <div className="text-white">無視怪物防禦率 +{item.item_total_option.ignore_monster_armor}%</div>
        )}
      </div>

      {/* 潛在能力 */}
      {item.potential_option_grade && item.potential_option_grade !== '없음' && (
        <div className="mb-3">
          <div className={`${getPotentialColor(item.potential_option_grade)} font-bold mb-1`}>
            🔸 潛在能力：{item.potential_option_grade}
          </div>
          <div className="space-y-1 text-sm">
            {item.potential_option_1 && <div className={getPotentialColor(item.potential_option_grade)}>• {item.potential_option_1}</div>}
            {item.potential_option_2 && <div className={getPotentialColor(item.potential_option_grade)}>• {item.potential_option_2}</div>}
            {item.potential_option_3 && <div className={getPotentialColor(item.potential_option_grade)}>• {item.potential_option_3}</div>}
          </div>
        </div>
      )}

      {/* 附加潛在能力 */}
      {item.additional_potential_option_grade && item.additional_potential_option_grade !== '없음' && (
        <div className="mb-3">
          <div className={`${getPotentialColor(item.additional_potential_option_grade)} font-bold mb-1`}>
            🔸 附加潛在能力：{item.additional_potential_option_grade}
          </div>
          <div className="space-y-1 text-sm">
            {item.additional_potential_option_1 && <div className={getPotentialColor(item.additional_potential_option_grade)}>• {item.additional_potential_option_1}</div>}
            {item.additional_potential_option_2 && <div className={getPotentialColor(item.additional_potential_option_grade)}>• {item.additional_potential_option_2}</div>}
            {item.additional_potential_option_3 && <div className={getPotentialColor(item.additional_potential_option_grade)}>• {item.additional_potential_option_3}</div>}
          </div>
        </div>
      )}

      {/* 靈魂 */}
      {item.soul_name && (
        <div className="mb-3">
          <div className="text-purple-400 font-bold mb-1">
            💎 {item.soul_name}
          </div>
          {item.soul_option && <div className="text-purple-300 text-sm">• {item.soul_option}</div>}
        </div>
      )}

      {/* 強化次數 */}
      {item.scroll_upgrade && parseInt(item.scroll_upgrade) > 0 && (
        <div className="text-cyan-400 text-sm">
          卷軸 強化 {item.scroll_upgrade}次 (剩餘{item.scroll_upgradeable_count}次，可恢復{item.scroll_resilience_count}次)
        </div>
      )}
    </div>
  );
};

// 單個裝備項目組件
const EquipmentItem: React.FC<{ item: ItemEquipment }> = ({ item }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setShowTooltip(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // 檢查是否為特殊戒指
  const isSpecialRing = item.special_ring_level > 0;
  const isRing = item.item_equipment_slot.includes('戒指');

  return (
    <div className="relative">
      <div
        className="w-16 h-16 bg-gray-800 border-2 border-blue-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-300 transition-colors relative"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={item.item_icon}
          alt={item.item_name}
          className="w-12 h-12 object-contain"
        />
        
        {/* 特殊戒指等級顯示 */}
        {isSpecialRing && isRing && (
          <div className="absolute bottom-1 right-1 bg-purple-600 text-white text-xs font-bold rounded px-1 min-w-4 text-center">
            {item.special_ring_level}
          </div>
        )}
      </div>
      
      {showTooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPosition.x + 10,
            bottom: window.innerHeight - tooltipPosition.y + 450,
            zIndex: 1000,
          }}
        >
          <EquipmentTooltip item={item} />
        </div>
      )}
    </div>
  );
};

const CharacterEquipment: React.FC<CharacterEquipmentProps> = ({ equipment }) => {
  if (!equipment || !equipment.item_equipment) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">無裝備資料</p>
      </div>
    );
  }

  // 將裝備按部位分組
  const equipmentBySlot = equipment.item_equipment.reduce((acc, item) => {
    acc[item.item_equipment_slot] = item;
    return acc;
  }, {} as Record<string, ItemEquipment>);

  // 渲染裝備格子的函數
  const renderEquipmentSlot = (slot: string, displayName: string) => {
    const item = equipmentBySlot[slot];
    
    if (!item) {
      return (
        <div key={slot} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-800/50 border-2 border-gray-600 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xs text-center">{displayName}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{displayName}</p>
        </div>
      );
    }

    return (
      <div key={slot} className="flex flex-col items-center">
        <EquipmentItem item={item} />
        <p className="text-xs text-gray-400 mt-1">{displayName}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 bg-slate-700/80 border border-slate-600/50 p-6 rounded-lg min-h-[600px]">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">角色裝備</h3>
        <p className="text-gray-300 text-sm">滑鼠移到裝備上查看詳細資訊</p>
      </div>

      <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
        {/* 左側裝備欄 - 兩排 */}
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {/* 左排 */}
          <div className="space-y-3">
            {renderEquipmentSlot('戒指4', '戒指4')}
            {renderEquipmentSlot('戒指3', '戒指3')}
            {renderEquipmentSlot('戒指2', '戒指2')}
            {renderEquipmentSlot('戒指1', '戒指')}
            {renderEquipmentSlot('腰帶', '腰帶')}
          </div>
          {/* 右排 */}
          <div className="space-y-3">
            {renderEquipmentSlot('臉飾', '臉飾')}
            {renderEquipmentSlot('眼飾', '眼飾')}
            {renderEquipmentSlot('耳環', '耳環')}
            {renderEquipmentSlot('墜飾2', '墜飾2')}
            {renderEquipmentSlot('墜飾', '墜飾')}
          </div>
        </div>

        {/* 角色圖像區域 */}
        <div className="col-span-6 flex flex-col items-center justify-center space-y-4">
          {/* 中央裝備 */}
          <div className="flex justify-center space-x-4">
            {renderEquipmentSlot('武器', '武器')}
            {renderEquipmentSlot('輔助武器', '副手')}
            {renderEquipmentSlot('徽章', '徽章')}
          </div>
          
          {/* 底部裝備 */}
          <div className="flex justify-center space-x-8 mt-8">
            {renderEquipmentSlot('口袋道具', '口袋')}
            {renderEquipmentSlot('勳章', '勳章')}
            {renderEquipmentSlot('機器心臟', '機器心臟')}
          </div>
        </div>

        {/* 右側裝備欄 - 兩排 */}
        <div className="col-span-3 grid grid-cols-2 gap-3">
          {/* 左排 */}
          <div className="space-y-3">
            {renderEquipmentSlot('帽子', '帽子')}
            {renderEquipmentSlot('上衣', '上衣')}
            {renderEquipmentSlot('褲/裙', '褲/裙')}
            {renderEquipmentSlot('肩膀裝飾', '肩飾')}
          </div>
          {/* 右排 */}
          <div className="space-y-3">
            {renderEquipmentSlot('披風', '披風')}
            {renderEquipmentSlot('手套', '手套')}
            {renderEquipmentSlot('鞋子', '鞋子')}
            {renderEquipmentSlot('胸章', '胸章')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterEquipment;