import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Zone {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  area: string;
}

const zones: Zone[] = [
  {
    id: "play",
    label: "Игровая зона",
    emoji: "🎮",
    color: "#DC2626",
    bgColor: "rgba(220,38,38,0.08)",
    borderColor: "rgba(220,38,38,0.3)",
    x: 3, y: 3, width: 30, height: 35,
    description: "Настольные игры, активный отдых",
    area: "≈22 м²",
  },
  {
    id: "family",
    label: "Семейное чтение",
    emoji: "📖",
    color: "#7C3AED",
    bgColor: "rgba(124,58,237,0.08)",
    borderColor: "rgba(124,58,237,0.3)",
    x: 3, y: 40, width: 30, height: 30,
    description: "Уютные кресла, мягкие пуфы",
    area: "≈20 м²",
  },
  {
    id: "sensory",
    label: "Сенсорная комната",
    emoji: "✨",
    color: "#0891B2",
    bgColor: "rgba(8,145,178,0.08)",
    borderColor: "rgba(8,145,178,0.3)",
    x: 3, y: 72, width: 30, height: 25,
    description: "Мягкие модули, световые панели",
    area: "≈18 м²",
  },
  {
    id: "shelves",
    label: "Стеллажи с книгами",
    emoji: "📚",
    color: "#B45309",
    bgColor: "rgba(180,83,9,0.08)",
    borderColor: "rgba(180,83,9,0.3)",
    x: 35, y: 3, width: 28, height: 94,
    description: "Открытый книжный фонд",
    area: "≈25 м²",
  },
  {
    id: "multstudio",
    label: "Мультстудия",
    emoji: "🎬",
    color: "#059669",
    bgColor: "rgba(5,150,105,0.08)",
    borderColor: "rgba(5,150,105,0.3)",
    x: 65, y: 3, width: 32, height: 45,
    description: "Съёмка, монтаж, просмотр",
    area: "≈20 м²",
  },
  {
    id: "staff",
    label: "Рабочее место",
    emoji: "💼",
    color: "#475569",
    bgColor: "rgba(71,85,105,0.08)",
    borderColor: "rgba(71,85,105,0.3)",
    x: 65, y: 50, width: 32, height: 47,
    description: "Стол сотрудника, ПК, стеллаж",
    area: "≈15 м²",
  },
];

const ZONE_COLORS: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  play:       { dot: "#DC2626", bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" },
  family:     { dot: "#7C3AED", bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
  sensory:    { dot: "#0891B2", bg: "#ECFEFF", text: "#0E7490", border: "#A5F3FC" },
  shelves:    { dot: "#B45309", bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
  multstudio: { dot: "#059669", bg: "#ECFDF5", text: "#047857", border: "#A7F3D0" },
  staff:      { dot: "#475569", bg: "#F8FAFC", text: "#334155", border: "#CBD5E1" },
};

export default function Index() {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #FAFBFF 60%, #F0FDF4 100%)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E5E7EB" }} className="sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ background: "linear-gradient(135deg, #7C3AED, #059669)", borderRadius: 10 }} className="w-9 h-9 flex items-center justify-center">
              <Icon name="LayoutDashboard" size={18} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: "#111827", lineHeight: 1 }}>
                План библиотеки
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>115 м² · 6 зон · вход слева · окна справа</div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {zones.map(z => {
              const c = ZONE_COLORS[z.id];
              return (
                <div key={z.id}
                  style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "3px 9px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", transition: "all 0.15s", outline: activeZone?.id === z.id ? `2px solid ${c.dot}` : "none" }}
                  onClick={() => setActiveZone(activeZone?.id === z.id ? null : z)}
                >
                  <span style={{ fontSize: 13 }}>{z.emoji}</span>
                  <span style={{ fontSize: 11, color: c.text, fontWeight: 600 }}>{z.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-6">

          {/* Floor Plan */}
          <div className="flex-1">
            <div style={{ background: "white", borderRadius: 20, boxShadow: "0 4px 40px rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <div className="px-6 pt-5 pb-2 flex items-center justify-between">
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>План помещения</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Кликните на зону для деталей · 115 м²</div>
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", background: "#F9FAFB", borderRadius: 6, padding: "3px 8px" }}>Масштаб ~1:65</div>
              </div>

              <div className="px-4 pb-5">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full"
                  style={{ aspectRatio: "1/1", maxHeight: 560 }}
                  onClick={() => setActiveZone(null)}
                >
                  {/* Background */}
                  <rect x="0" y="0" width="100" height="100" rx="2" fill="#F1F5F9" />
                  {/* Room floor */}
                  <rect x="2" y="2" width="96" height="96" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="0.8" />

                  {/* === ОКНА — правая стена, 6 штук === */}
                  {[8, 20, 32, 44, 56, 68].map((wy, i) => (
                    <g key={i}>
                      <rect x="97.5" y={wy} width="2" height="10" rx="0.4" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="0.35" />
                      <line x1="98.5" y1={wy} x2="98.5" y2={wy + 10} stroke="#7DD3FC" strokeWidth="0.2" />
                    </g>
                  ))}
                  <text x="99.2" y="50" textAnchor="middle" style={{ fontSize: "2px", fill: "#94A3B8", writingMode: "vertical-rl" }}>ОКНА</text>

                  {/* === ВХОД — левая стена, верхний край === */}
                  <rect x="0" y="2" width="2.5" height="16" fill="white" />
                  <line x1="2" y1="2" x2="2" y2="10" stroke="#CBD5E1" strokeWidth="0.8" />
                  <line x1="2" y1="18" x2="2" y2="98" stroke="#CBD5E1" strokeWidth="0.8" />
                  {/* Дверная арка */}
                  <path d="M 2 10 Q 12 10 12 18" fill="none" stroke="#94A3B8" strokeWidth="0.7" strokeDasharray="1.5 0.8" />
                  <rect x="2" y="10" width="10" height="0.6" fill="#94A3B8" />
                  {/* Подпись */}
                  <text x="1" y="15" textAnchor="middle" style={{ fontSize: "1.8px", fill: "#475569", fontWeight: 700, writingMode: "vertical-rl" }}>ВХОД</text>

                  {/* === ЗОНЫ === */}
                  {zones.map(zone => {
                    const isActive = activeZone?.id === zone.id;
                    return (
                      <g key={zone.id} style={{ cursor: "pointer" }} onClick={e => { e.stopPropagation(); setActiveZone(isActive ? null : zone); }}>
                        <rect
                          x={zone.x} y={zone.y}
                          width={zone.width} height={zone.height}
                          rx="1.5"
                          fill={zone.bgColor}
                          stroke={zone.borderColor}
                          strokeWidth={isActive ? 1.2 : 0.7}
                          strokeDasharray={isActive ? "0" : "3 1.5"}
                          style={{ transition: "all 0.2s" }}
                        />
                        {/* Цветной угол-маркер */}
                        <rect x={zone.x} y={zone.y} width={6} height={2.5} rx="0.8" fill={zone.color} opacity="0.85" />
                        {/* Название */}
                        <text
                          x={zone.x + zone.width / 2}
                          y={zone.y + zone.height / 2 - 2}
                          textAnchor="middle"
                          style={{ fontSize: "3px", fontWeight: 800, fill: zone.color, fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}
                        >
                          {zone.emoji}
                        </text>
                        <text
                          x={zone.x + zone.width / 2}
                          y={zone.y + zone.height / 2 + 3}
                          textAnchor="middle"
                          style={{ fontSize: "2.4px", fontWeight: 700, fill: zone.color, fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}
                        >
                          {zone.label}
                        </text>
                        <text
                          x={zone.x + zone.width / 2}
                          y={zone.y + zone.height / 2 + 7}
                          textAnchor="middle"
                          style={{ fontSize: "1.9px", fill: zone.color, opacity: 0.65, fontFamily: "'Golos Text', sans-serif", pointerEvents: "none" }}
                        >
                          {zone.area}
                        </text>
                      </g>
                    );
                  })}

                  {/* === МЕБЕЛЬ === */}

                  {/* Игровая зона — круглый стол + стулья */}
                  <circle cx="18" cy="21" r="5" fill="none" stroke="#FCA5A5" strokeWidth="0.4" strokeDasharray="1 0.5" />
                  <circle cx="18" cy="21" r="2.5" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="0.3" />
                  {[0, 72, 144, 216, 288].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    return <circle key={i} cx={18 + 5.5 * Math.cos(rad)} cy={21 + 5.5 * Math.sin(rad)} r="1.2" fill="#FECACA" stroke="#FCA5A5" strokeWidth="0.25" />;
                  })}
                  {/* Полки-игры */}
                  <rect x="4" y="4" width="2" height="15" rx="0.3" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="0.25" />

                  {/* Семейное чтение — кресла/пуфы */}
                  <circle cx="10" cy="52" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                  <circle cx="18" cy="56" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                  <circle cx="26" cy="52" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                  <circle cx="18" cy="47" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                  {/* Ковёр */}
                  <ellipse cx="18" cy="52" rx="10" ry="10" fill="none" stroke="#DDD6FE" strokeWidth="0.4" strokeDasharray="1 0.8" />

                  {/* Сенсорная комната — мягкие модули */}
                  <rect x="5" y="74" width="7" height="5" rx="1.5" fill="#CFFAFE" stroke="#67E8F9" strokeWidth="0.3" />
                  <rect x="14" y="74" width="7" height="5" rx="1.5" fill="#CFFAFE" stroke="#67E8F9" strokeWidth="0.3" />
                  <rect x="5" y="81" width="7" height="5" rx="1.5" fill="#A5F3FC" stroke="#67E8F9" strokeWidth="0.3" />
                  <rect x="14" y="81" width="7" height="5" rx="1.5" fill="#A5F3FC" stroke="#67E8F9" strokeWidth="0.3" />
                  {/* Световая панель */}
                  <rect x="5" y="88" width="26" height="3" rx="0.5" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="0.3" />

                  {/* Стеллажи с книгами — вертикальные секции */}
                  {[4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84, 89].map((sy, i) => (
                    <rect key={i} x="36" y={sy} width="25" height="4" rx="0.3" fill={i % 2 === 0 ? "#FDE68A" : "#FEF3C7"} stroke="#F59E0B" strokeWidth="0.2" />
                  ))}
                  <rect x="36.5" y="3.5" width="1" height="93" fill="#D97706" opacity="0.3" />
                  <rect x="59.5" y="3.5" width="1" height="93" fill="#D97706" opacity="0.3" />

                  {/* Мультстудия — стол + монитор + камера */}
                  <rect x="67" y="10" width="18" height="10" rx="0.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.3" />
                  <rect x="71" y="6" width="10" height="6" rx="0.5" fill="#A7F3D0" stroke="#34D399" strokeWidth="0.3" />
                  {/* Камера */}
                  <circle cx="89" cy="22" r="2" fill="#A7F3D0" stroke="#34D399" strokeWidth="0.3" />
                  <rect x="87.5" y="20" width="3" height="0.6" fill="#6EE7B7" />
                  {/* Экран просмотра */}
                  <rect x="67" y="28" width="28" height="16" rx="0.8" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="0.35" />
                  <rect x="69" y="30" width="24" height="12" rx="0.5" fill="#D1FAE5" stroke="#34D399" strokeWidth="0.25" />

                  {/* Рабочее место сотрудника */}
                  <rect x="67" y="55" width="20" height="10" rx="0.5" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.35" />
                  {/* Монитор */}
                  <rect x="70" y="52" width="9" height="5" rx="0.4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.25" />
                  {/* Кресло */}
                  <circle cx="77" cy="68" r="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.3" />
                  {/* Шкаф */}
                  <rect x="67" y="78" width="28" height="18" rx="0.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.3" />
                  <line x1="81" y1="78" x2="81" y2="96" stroke="#CBD5E1" strokeWidth="0.25" />
                  <circle cx="79.5" cy="87" r="0.8" fill="#94A3B8" />
                  <circle cx="82.5" cy="87" r="0.8" fill="#94A3B8" />

                  {/* Размеры помещения */}
                  <line x1="2" y1="99.5" x2="98" y2="99.5" stroke="#CBD5E1" strokeWidth="0.3" />
                  <text x="50" y="100" textAnchor="middle" style={{ fontSize: "1.8px", fill: "#9CA3AF" }}>~11.5 м</text>
                  <line x1="99.5" y1="2" x2="99.5" y2="98" stroke="#CBD5E1" strokeWidth="0.3" />

                  {/* Розетки — правая стена (у окон) */}
                  {[13, 25, 37, 49, 61, 73].map((ry, i) => (
                    <g key={i}>
                      <circle cx="95.5" cy={ry} r="1.5" fill="white" stroke="#059669" strokeWidth="0.5" />
                      <circle cx="94.9" cy={ry} r="0.35" fill="#059669" />
                      <circle cx="96.1" cy={ry} r="0.35" fill="#059669" />
                    </g>
                  ))}

                  {/* Розетка у входа — справа от проёма */}
                  <circle cx="4.5" cy="23" r="1.5" fill="white" stroke="#7C3AED" strokeWidth="0.5" />
                  <circle cx="3.9" cy="23" r="0.35" fill="#7C3AED" />
                  <circle cx="5.1" cy="23" r="0.35" fill="#7C3AED" />
                  <text x="7" y="23.7" style={{ fontSize: "1.6px", fill: "#7C3AED" }}>В-П</text>

                  {/* Розетка у входа — слева от проёма (в углу) */}
                  <circle cx="4.5" cy="5" r="1.5" fill="white" stroke="#7C3AED" strokeWidth="0.5" />
                  <circle cx="3.9" cy="5" r="0.35" fill="#7C3AED" />
                  <circle cx="5.1" cy="5" r="0.35" fill="#7C3AED" />
                  <text x="7" y="5.7" style={{ fontSize: "1.6px", fill: "#7C3AED" }}>В-Л</text>

                  {/* Легенда розетки */}
                  <circle cx="6" cy="97" r="1.5" fill="white" stroke="#059669" strokeWidth="0.5" />
                  <circle cx="5.4" cy="97" r="0.35" fill="#059669" />
                  <circle cx="6.6" cy="97" r="0.35" fill="#059669" />
                  <text x="9" y="97.7" style={{ fontSize: "1.8px", fill: "#6B7280" }}>— розетка</text>

                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 flex flex-col gap-4">

            {/* Активная зона */}
            {activeZone ? (() => {
              const c = ZONE_COLORS[activeZone.id];
              return (
                <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `2px solid ${c.border}`, overflow: "hidden" }}>
                  <div style={{ background: c.bg, padding: "16px 18px 12px", borderBottom: `1px solid ${c.border}` }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{activeZone.emoji}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 16, color: c.text }}>{activeZone.label}</div>
                    <div style={{ fontSize: 12, color: c.text, opacity: 0.7 }}>{activeZone.description}</div>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    {[
                      { icon: "Maximize2", label: "Площадь", val: activeZone.area },
                      { icon: "MapPin", label: "Расположение", val: "По плану" },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-3">
                        <div style={{ background: c.bg, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={row.icon} fallback="Circle" size={14} color={c.dot} />
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#9CA3AF" }}>{row.label}</div>
                          <div style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{row.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })() : (
              /* Легенда зон */
              <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div className="px-5 pt-4 pb-2">
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827" }}>Зоны помещения</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>Нажмите на зону для деталей</div>
                </div>
                {zones.map(zone => {
                  const c = ZONE_COLORS[zone.id];
                  return (
                    <div key={zone.id}
                      style={{ padding: "10px 20px", borderLeft: `4px solid transparent`, cursor: "pointer", transition: "all 0.15s" }}
                      className="hover:bg-gray-50"
                      onClick={() => setActiveZone(zone)}
                    >
                      <div className="flex items-center gap-3">
                        <div style={{ fontSize: 22 }}>{zone.emoji}</div>
                        <div className="flex-1">
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{zone.label}</div>
                          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{zone.description}</div>
                        </div>
                        <div style={{ fontSize: 11, color: c.text, fontWeight: 700, background: c.bg, borderRadius: 6, padding: "2px 7px" }}>{zone.area}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Итоговые параметры */}
            <div style={{ background: "linear-gradient(135deg, #1E1B4B, #134E4A)", borderRadius: 16, padding: 20, color: "white" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 12, opacity: 0.6, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
                Параметры проекта
              </div>
              {[
                { icon: "LayoutDashboard", label: "Общая площадь", val: "115 м²" },
                { icon: "Grid3x3", label: "Функциональных зон", val: "6" },
                { icon: "Sun", label: "Окна", val: "6 шт, справа" },
                { icon: "DoorOpen", label: "Вход", val: "Слева, у угла" },
                { icon: "Zap", label: "Розеток", val: "8" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <div className="flex items-center gap-2">
                    <Icon name={item.icon} fallback="Circle" size={13} color="rgba(255,255,255,0.5)" />
                    <span style={{ fontSize: 12, opacity: 0.7 }}>{item.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13 }}>{item.val}</span>
                </div>
              ))}
            </div>

            {/* Подсказка */}
            <div style={{ background: "#FFF7ED", borderRadius: 12, padding: "12px 14px", border: "1px solid #FED7AA" }} className="flex gap-3 items-start">
              <Icon name="Info" size={15} color="#EA580C" />
              <div style={{ fontSize: 12, color: "#9A3412", lineHeight: 1.5 }}>
                Схема ориентировочная. Точное расположение мебели и перегородок уточняется при проектировании.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
