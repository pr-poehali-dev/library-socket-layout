import { useState } from "react";
import Icon from "@/components/ui/icon";

type ViewMode = "zones" | "lights";

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

interface Light {
  id: number;
  x: number;
  y: number;
  zone: string;
  type: "warm" | "neutral" | "cool" | "accent";
  label: string;
  power: string;
  kelvin: string;
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

// Светильники: потолок армстронг 600×600
// warm = 2700-3000K тёплый (семейное чтение)
// neutral = 4000K нейтральный (игровая, стеллажи, сотрудник)
// cool = 5000-6000K холодный (мультстудия — яркий рабочий)
// accent = декоративный (сенсорная)
const lights: Light[] = [
  // Игровая зона — нейтральный 4000K, 4 панели
  { id: 1,  x: 10, y: 12, zone: "play",       type: "neutral", label: "А-1",  power: "36 Вт", kelvin: "4000K" },
  { id: 2,  x: 22, y: 12, zone: "play",       type: "neutral", label: "А-2",  power: "36 Вт", kelvin: "4000K" },
  { id: 3,  x: 10, y: 26, zone: "play",       type: "neutral", label: "А-3",  power: "36 Вт", kelvin: "4000K" },
  { id: 4,  x: 22, y: 26, zone: "play",       type: "neutral", label: "А-4",  power: "36 Вт", kelvin: "4000K" },

  // Семейное чтение — тёплый 2700K, 4 панели
  { id: 5,  x: 10, y: 47, zone: "family",     type: "warm",    label: "Б-1",  power: "36 Вт", kelvin: "2700K" },
  { id: 6,  x: 22, y: 47, zone: "family",     type: "warm",    label: "Б-2",  power: "36 Вт", kelvin: "2700K" },
  { id: 7,  x: 10, y: 59, zone: "family",     type: "warm",    label: "Б-3",  power: "36 Вт", kelvin: "2700K" },
  { id: 8,  x: 22, y: 59, zone: "family",     type: "warm",    label: "Б-4",  power: "36 Вт", kelvin: "2700K" },

  // Сенсорная — акцентный мягкий, 3 панели (RGB/диммер)
  { id: 9,  x: 10, y: 79, zone: "sensory",    type: "accent",  label: "В-1",  power: "24 Вт", kelvin: "RGB" },
  { id: 10, x: 22, y: 79, zone: "sensory",    type: "accent",  label: "В-2",  power: "24 Вт", kelvin: "RGB" },
  { id: 11, x: 16, y: 89, zone: "sensory",    type: "accent",  label: "В-3",  power: "24 Вт", kelvin: "RGB" },

  // Стеллажи — нейтральный, 6 панелей по длине
  { id: 12, x: 49, y: 12, zone: "shelves",    type: "neutral", label: "Г-1",  power: "36 Вт", kelvin: "4000K" },
  { id: 13, x: 49, y: 27, zone: "shelves",    type: "neutral", label: "Г-2",  power: "36 Вт", kelvin: "4000K" },
  { id: 14, x: 49, y: 42, zone: "shelves",    type: "neutral", label: "Г-3",  power: "36 Вт", kelvin: "4000K" },
  { id: 15, x: 49, y: 57, zone: "shelves",    type: "neutral", label: "Г-4",  power: "36 Вт", kelvin: "4000K" },
  { id: 16, x: 49, y: 72, zone: "shelves",    type: "neutral", label: "Г-5",  power: "36 Вт", kelvin: "4000K" },
  { id: 17, x: 49, y: 87, zone: "shelves",    type: "neutral", label: "Г-6",  power: "36 Вт", kelvin: "4000K" },

  // Мультстудия — холодный яркий 5000K, 4 панели
  { id: 18, x: 73, y: 10, zone: "multstudio", type: "cool",    label: "Д-1",  power: "48 Вт", kelvin: "5000K" },
  { id: 19, x: 86, y: 10, zone: "multstudio", type: "cool",    label: "Д-2",  power: "48 Вт", kelvin: "5000K" },
  { id: 20, x: 73, y: 25, zone: "multstudio", type: "cool",    label: "Д-3",  power: "48 Вт", kelvin: "5000K" },
  { id: 21, x: 86, y: 25, zone: "multstudio", type: "cool",    label: "Д-4",  power: "48 Вт", kelvin: "5000K" },
  { id: 22, x: 73, y: 38, zone: "multstudio", type: "cool",    label: "Д-5",  power: "48 Вт", kelvin: "5000K" },
  { id: 23, x: 86, y: 38, zone: "multstudio", type: "cool",    label: "Д-6",  power: "48 Вт", kelvin: "5000K" },

  // Рабочее место сотрудника — нейтральный 4000K, 4 панели
  { id: 24, x: 73, y: 57, zone: "staff",      type: "neutral", label: "Е-1",  power: "36 Вт", kelvin: "4000K" },
  { id: 25, x: 86, y: 57, zone: "staff",      type: "neutral", label: "Е-2",  power: "36 Вт", kelvin: "4000K" },
  { id: 26, x: 73, y: 72, zone: "staff",      type: "neutral", label: "Е-3",  power: "36 Вт", kelvin: "4000K" },
  { id: 27, x: 86, y: 72, zone: "staff",      type: "neutral", label: "Е-4",  power: "36 Вт", kelvin: "4000K" },
  { id: 28, x: 73, y: 86, zone: "staff",      type: "neutral", label: "Е-5",  power: "36 Вт", kelvin: "4000K" },
  { id: 29, x: 86, y: 86, zone: "staff",      type: "neutral", label: "Е-6",  power: "36 Вт", kelvin: "4000K" },
];

const LIGHT_STYLE: Record<Light["type"], { fill: string; stroke: string; glow: string; label: string }> = {
  warm:    { fill: "#FEF3C7", stroke: "#F59E0B", glow: "rgba(245,158,11,0.25)", label: "Тёплый 2700K" },
  neutral: { fill: "#F0F9FF", stroke: "#38BDF8", glow: "rgba(56,189,248,0.2)",  label: "Нейтральный 4000K" },
  cool:    { fill: "#EFF6FF", stroke: "#6366F1", glow: "rgba(99,102,241,0.22)", label: "Холодный 5000K" },
  accent:  { fill: "#FDF4FF", stroke: "#D946EF", glow: "rgba(217,70,239,0.22)", label: "RGB / диммер" },
};

const ZONE_COLORS: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  play:       { dot: "#DC2626", bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" },
  family:     { dot: "#7C3AED", bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
  sensory:    { dot: "#0891B2", bg: "#ECFEFF", text: "#0E7490", border: "#A5F3FC" },
  shelves:    { dot: "#B45309", bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
  multstudio: { dot: "#059669", bg: "#ECFDF5", text: "#047857", border: "#A7F3D0" },
  staff:      { dot: "#475569", bg: "#F8FAFC", text: "#334155", border: "#CBD5E1" },
};

export default function Index() {
  const [view, setView] = useState<ViewMode>("zones");
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [activeLight, setActiveLight] = useState<Light | null>(null);

  const totalWatt = lights.reduce((s, l) => s + parseInt(l.power), 0);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #FAFBFF 60%, #F0FDF4 100%)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E5E7EB" }} className="sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{ background: "linear-gradient(135deg, #7C3AED, #059669)", borderRadius: 10 }} className="w-9 h-9 flex items-center justify-center">
              <Icon name="LayoutDashboard" size={18} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: "#111827", lineHeight: 1 }}>
                План библиотеки
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>115 м² · вход слева · окна справа</div>
            </div>
          </div>

          {/* Переключатель режимов */}
          <div style={{ background: "#F1F5F9", borderRadius: 12, padding: 4, display: "flex", gap: 2 }}>
            {([
              { id: "zones", icon: "LayoutGrid", label: "Зоны" },
              { id: "lights", icon: "Lightbulb", label: "Светильники" },
            ] as { id: ViewMode; icon: string; label: string }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => { setView(tab.id); setActiveZone(null); setActiveLight(null); }}
                style={{
                  padding: "6px 14px", borderRadius: 9, border: "none", cursor: "pointer",
                  fontFamily: "'Golos Text', sans-serif", fontSize: 13, fontWeight: 600,
                  background: view === tab.id ? "white" : "transparent",
                  color: view === tab.id ? "#111827" : "#94A3B8",
                  boxShadow: view === tab.id ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <Icon name={tab.icon} fallback="Circle" size={14} color={view === tab.id ? "#7C3AED" : "#94A3B8"} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-6">

          {/* Floor Plan SVG */}
          <div className="flex-1">
            <div style={{ background: "white", borderRadius: 20, boxShadow: "0 4px 40px rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <div className="px-6 pt-5 pb-2 flex items-center justify-between">
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>
                    {view === "zones" ? "План помещения" : "Схема освещения · потолок Армстронг 600×600"}
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                    {view === "zones" ? "Кликните на зону для деталей · 115 м²" : `${lights.length} светильников · ${totalWatt} Вт суммарно`}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", background: "#F9FAFB", borderRadius: 6, padding: "3px 8px" }}>Масштаб ~1:65</div>
              </div>

              <div className="px-4 pb-5">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full"
                  style={{ aspectRatio: "1/1", maxHeight: 560 }}
                  onClick={() => { setActiveZone(null); setActiveLight(null); }}
                >
                  {/* Сетка потолка Армстронг — видна в режиме светильников */}
                  {view === "lights" && (
                    <g opacity="0.18">
                      {Array.from({ length: 11 }, (_, i) => (
                        <line key={`v${i}`} x1={2 + i * 9.6} y1="2" x2={2 + i * 9.6} y2="98" stroke="#94A3B8" strokeWidth="0.3" />
                      ))}
                      {Array.from({ length: 11 }, (_, i) => (
                        <line key={`h${i}`} x1="2" y1={2 + i * 9.6} x2="98" y2={2 + i * 9.6} stroke="#94A3B8" strokeWidth="0.3" />
                      ))}
                    </g>
                  )}

                  {/* Background */}
                  <rect x="0" y="0" width="100" height="100" rx="2" fill={view === "lights" ? "#1E293B" : "#F1F5F9"} />
                  <rect x="2" y="2" width="96" height="96" rx="1"
                    fill={view === "lights" ? "#0F172A" : "white"}
                    stroke={view === "lights" ? "#334155" : "#CBD5E1"}
                    strokeWidth="0.8" />

                  {/* Сетка потолка Армстронг */}
                  {view === "lights" && (
                    <g opacity="0.12">
                      {Array.from({ length: 11 }, (_, i) => (
                        <line key={`v${i}`} x1={2 + i * 9.6} y1="2" x2={2 + i * 9.6} y2="98" stroke="#94A3B8" strokeWidth="0.35" />
                      ))}
                      {Array.from({ length: 11 }, (_, i) => (
                        <line key={`h${i}`} x1="2" y1={2 + i * 9.6} x2="98" y2={2 + i * 9.6} stroke="#94A3B8" strokeWidth="0.35" />
                      ))}
                    </g>
                  )}

                  {/* Окна — правая стена */}
                  {[8, 20, 32, 44, 56, 68].map((wy, i) => (
                    <g key={i}>
                      <rect x="97.5" y={wy} width="2" height="10" rx="0.4"
                        fill={view === "lights" ? "#1E3A5F" : "#BAE6FD"}
                        stroke={view === "lights" ? "#3B82F6" : "#38BDF8"} strokeWidth="0.35" />
                    </g>
                  ))}
                  <text x="99.2" y="50" textAnchor="middle" style={{ fontSize: "2px", fill: view === "lights" ? "#3B82F6" : "#94A3B8", writingMode: "vertical-rl" }}>ОКНА</text>

                  {/* Вход — левая стена, верхний угол */}
                  <rect x="0" y="2" width="2.5" height="16" fill={view === "lights" ? "#0F172A" : "white"} />
                  <line x1="2" y1="2" x2="2" y2="10" stroke={view === "lights" ? "#334155" : "#CBD5E1"} strokeWidth="0.8" />
                  <line x1="2" y1="18" x2="2" y2="98" stroke={view === "lights" ? "#334155" : "#CBD5E1"} strokeWidth="0.8" />
                  <path d="M 2 10 Q 12 10 12 18" fill="none" stroke={view === "lights" ? "#475569" : "#94A3B8"} strokeWidth="0.7" strokeDasharray="1.5 0.8" />
                  <rect x="2" y="10" width="10" height="0.6" fill={view === "lights" ? "#475569" : "#94A3B8"} />
                  <text x="1" y="15" textAnchor="middle" style={{ fontSize: "1.8px", fill: view === "lights" ? "#64748B" : "#475569", fontWeight: 700, writingMode: "vertical-rl" }}>ВХОД</text>

                  {/* ======= РЕЖИМ ЗОНЫ ======= */}
                  {view === "zones" && (
                    <g>
                      {zones.map(zone => {
                        const isActive = activeZone?.id === zone.id;
                        return (
                          <g key={zone.id} style={{ cursor: "pointer" }} onClick={e => { e.stopPropagation(); setActiveZone(isActive ? null : zone); }}>
                            <rect x={zone.x} y={zone.y} width={zone.width} height={zone.height} rx="1.5"
                              fill={zone.bgColor} stroke={zone.borderColor}
                              strokeWidth={isActive ? 1.2 : 0.7}
                              strokeDasharray={isActive ? "0" : "3 1.5"}
                              style={{ transition: "all 0.2s" }} />
                            <rect x={zone.x} y={zone.y} width={6} height={2.5} rx="0.8" fill={zone.color} opacity="0.85" />
                            <text x={zone.x + zone.width / 2} y={zone.y + zone.height / 2 - 2} textAnchor="middle"
                              style={{ fontSize: "3px", fontWeight: 800, fill: zone.color, fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}>
                              {zone.emoji}
                            </text>
                            <text x={zone.x + zone.width / 2} y={zone.y + zone.height / 2 + 3} textAnchor="middle"
                              style={{ fontSize: "2.4px", fontWeight: 700, fill: zone.color, fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}>
                              {zone.label}
                            </text>
                            <text x={zone.x + zone.width / 2} y={zone.y + zone.height / 2 + 7} textAnchor="middle"
                              style={{ fontSize: "1.9px", fill: zone.color, opacity: 0.65, fontFamily: "'Golos Text', sans-serif", pointerEvents: "none" }}>
                              {zone.area}
                            </text>
                          </g>
                        );
                      })}

                      {/* Мебель */}
                      <circle cx="18" cy="21" r="5" fill="none" stroke="#FCA5A5" strokeWidth="0.4" strokeDasharray="1 0.5" />
                      <circle cx="18" cy="21" r="2.5" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="0.3" />
                      {[0, 72, 144, 216, 288].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        return <circle key={i} cx={18 + 5.5 * Math.cos(rad)} cy={21 + 5.5 * Math.sin(rad)} r="1.2" fill="#FECACA" stroke="#FCA5A5" strokeWidth="0.25" />;
                      })}
                      <rect x="4" y="4" width="2" height="15" rx="0.3" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="0.25" />
                      <circle cx="10" cy="52" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                      <circle cx="18" cy="56" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                      <circle cx="26" cy="52" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                      <circle cx="18" cy="47" r="2.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="0.3" />
                      <ellipse cx="18" cy="52" rx="10" ry="10" fill="none" stroke="#DDD6FE" strokeWidth="0.4" strokeDasharray="1 0.8" />
                      <rect x="5" y="74" width="7" height="5" rx="1.5" fill="#CFFAFE" stroke="#67E8F9" strokeWidth="0.3" />
                      <rect x="14" y="74" width="7" height="5" rx="1.5" fill="#CFFAFE" stroke="#67E8F9" strokeWidth="0.3" />
                      <rect x="5" y="81" width="7" height="5" rx="1.5" fill="#A5F3FC" stroke="#67E8F9" strokeWidth="0.3" />
                      <rect x="14" y="81" width="7" height="5" rx="1.5" fill="#A5F3FC" stroke="#67E8F9" strokeWidth="0.3" />
                      <rect x="5" y="88" width="26" height="3" rx="0.5" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="0.3" />
                      {[4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84, 89].map((sy, i) => (
                        <rect key={i} x="36" y={sy} width="25" height="4" rx="0.3" fill={i % 2 === 0 ? "#FDE68A" : "#FEF3C7"} stroke="#F59E0B" strokeWidth="0.2" />
                      ))}
                      <rect x="67" y="10" width="18" height="10" rx="0.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.3" />
                      <rect x="71" y="6" width="10" height="6" rx="0.5" fill="#A7F3D0" stroke="#34D399" strokeWidth="0.3" />
                      <circle cx="89" cy="22" r="2" fill="#A7F3D0" stroke="#34D399" strokeWidth="0.3" />
                      <rect x="67" y="28" width="28" height="16" rx="0.8" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="0.35" />
                      <rect x="69" y="30" width="24" height="12" rx="0.5" fill="#D1FAE5" stroke="#34D399" strokeWidth="0.25" />
                      <rect x="67" y="55" width="20" height="10" rx="0.5" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.35" />
                      <rect x="70" y="52" width="9" height="5" rx="0.4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.25" />
                      <circle cx="77" cy="68" r="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.3" />
                      <rect x="67" y="78" width="28" height="18" rx="0.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.3" />
                      <line x1="81" y1="78" x2="81" y2="96" stroke="#CBD5E1" strokeWidth="0.25" />
                    </g>
                  )}

                  {/* ======= РЕЖИМ СВЕТИЛЬНИКОВ ======= */}
                  {view === "lights" && (
                    <g>
                      {/* Зоны — приглушённые контуры */}
                      {zones.map(zone => (
                        <rect key={zone.id} x={zone.x} y={zone.y} width={zone.width} height={zone.height} rx="1.5"
                          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
                      ))}
                      {/* Названия зон — приглушённо */}
                      {zones.map(zone => (
                        <text key={zone.id} x={zone.x + zone.width / 2} y={zone.y + 5} textAnchor="middle"
                          style={{ fontSize: "2px", fill: "rgba(255,255,255,0.2)", fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}>
                          {zone.label.toUpperCase()}
                        </text>
                      ))}

                      {/* Светильники */}
                      {lights.map(light => {
                        const s = LIGHT_STYLE[light.type];
                        const isActive = activeLight?.id === light.id;
                        return (
                          <g key={light.id} style={{ cursor: "pointer" }}
                            onClick={e => { e.stopPropagation(); setActiveLight(isActive ? null : light); }}>
                            {/* Ореол света */}
                            <circle cx={light.x} cy={light.y} r={isActive ? 7 : 5}
                              fill={s.glow} opacity={isActive ? 0.8 : 0.5} />
                            {/* Панель 600×600 (≈3.5×3.5 в единицах SVG) */}
                            <rect x={light.x - 2.5} y={light.y - 2.5} width="5" height="5" rx="0.5"
                              fill={s.fill} stroke={s.stroke}
                              strokeWidth={isActive ? 0.8 : 0.5}
                              style={{ transition: "all 0.15s" }} />
                            {/* Крест внутри панели */}
                            <line x1={light.x - 2.5} y1={light.y} x2={light.x + 2.5} y2={light.y} stroke={s.stroke} strokeWidth="0.25" opacity="0.5" />
                            <line x1={light.x} y1={light.y - 2.5} x2={light.x} y2={light.y + 2.5} stroke={s.stroke} strokeWidth="0.25" opacity="0.5" />
                            {/* Метка */}
                            <text x={light.x} y={light.y + 4.5} textAnchor="middle"
                              style={{ fontSize: "1.5px", fill: s.stroke, fontWeight: 700, fontFamily: "'Golos Text', sans-serif", pointerEvents: "none" }}>
                              {light.label}
                            </text>
                          </g>
                        );
                      })}

                      {/* Легенда типов */}
                      {Object.entries(LIGHT_STYLE).map(([type, s], i) => (
                        <g key={type}>
                          <rect x={3} y={3 + i * 6} width="4" height="4" rx="0.5" fill={s.fill} stroke={s.stroke} strokeWidth="0.4" />
                          <text x={8.5} y={6.5 + i * 6} style={{ fontSize: "1.9px", fill: "rgba(255,255,255,0.6)", fontFamily: "'Golos Text', sans-serif" }}>{s.label}</text>
                        </g>
                      ))}
                    </g>
                  )}

                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 flex flex-col gap-4">

            {/* Карточка активного элемента */}
            {view === "zones" && activeZone ? (() => {
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
                      { icon: "Lightbulb", label: "Световой сценарий", val: lights.filter(l => l.zone === activeZone.id).length + " светильников" },
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
            })() : view === "lights" && activeLight ? (() => {
              const s = LIGHT_STYLE[activeLight.type];
              const zone = zones.find(z => z.id === activeLight.zone);
              return (
                <div style={{ background: "#0F172A", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: `2px solid ${s.stroke}`, overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, background: s.fill, border: `1px solid ${s.stroke}` }} />
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 16, color: "white" }}>{activeLight.label}</div>
                    </div>
                    <div style={{ fontSize: 12, color: s.stroke }}>{s.label}</div>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    {[
                      { icon: "Zap", label: "Мощность", val: activeLight.power },
                      { icon: "Sun", label: "Цветовая температура", val: activeLight.kelvin },
                      { icon: "MapPin", label: "Зона", val: zone?.label ?? "" },
                      { icon: "Square", label: "Тип панели", val: "Армстронг 600×600" },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-3">
                        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={row.icon} fallback="Circle" size={14} color={s.stroke} />
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#475569" }}>{row.label}</div>
                          <div style={{ fontSize: 13, color: "white", fontWeight: 600 }}>{row.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })() : (
              /* Дефолтная легенда */
              view === "zones" ? (
                <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <div className="px-5 pt-4 pb-2">
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827" }}>Зоны помещения</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>Нажмите на зону для деталей</div>
                  </div>
                  {zones.map(zone => {
                    const c = ZONE_COLORS[zone.id];
                    return (
                      <div key={zone.id} style={{ padding: "10px 20px", cursor: "pointer", transition: "all 0.15s" }}
                        className="hover:bg-gray-50" onClick={() => setActiveZone(zone)}>
                        <div className="flex items-center gap-3">
                          <span style={{ fontSize: 20 }}>{zone.emoji}</span>
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
              ) : (
                <div style={{ background: "#0F172A", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", overflow: "hidden" }}>
                  <div className="px-5 pt-4 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "white" }}>Типы светильников</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>Нажмите на светильник для деталей</div>
                  </div>
                  {Object.entries(LIGHT_STYLE).map(([type, s]) => {
                    const cnt = lights.filter(l => l.type === type).length;
                    const watt = lights.filter(l => l.type === type).reduce((a, l) => a + parseInt(l.power), 0);
                    return (
                      <div key={type} style={{ padding: "10px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-3">
                          <div style={{ width: 16, height: 16, borderRadius: 4, background: s.fill, border: `1.5px solid ${s.stroke}`, flexShrink: 0 }} />
                          <div className="flex-1">
                            <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{s.label}</div>
                            <div style={{ fontSize: 11, color: "#475569" }}>{cnt} шт · {watt} Вт</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ padding: "12px 20px" }}>
                    <div style={{ fontSize: 11, color: "#334155" }}>ИТОГО</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900, color: "white" }}>{totalWatt} Вт</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{lights.length} светильников · потолок Армстронг</div>
                  </div>
                </div>
              )
            )}

            {/* Параметры проекта */}
            <div style={{ background: "linear-gradient(135deg, #1E1B4B, #134E4A)", borderRadius: 16, padding: 20, color: "white" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 12, opacity: 0.5, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
                Параметры
              </div>
              {[
                { icon: "LayoutDashboard", label: "Площадь", val: "115 м²" },
                { icon: "Grid3x3",        label: "Зон",     val: "6" },
                { icon: "Sun",            label: "Окна",    val: "6 шт, справа" },
                { icon: "DoorOpen",       label: "Вход",    val: "Слева, у угла" },
                { icon: "Lightbulb",      label: "Светильников", val: String(lights.length) },
                { icon: "Zap",            label: "Мощность", val: `${totalWatt} Вт` },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <Icon name={item.icon} fallback="Circle" size={12} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontSize: 12, opacity: 0.65 }}>{item.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13 }}>{item.val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
