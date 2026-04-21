export type ViewMode = "zones" | "lights";

export interface Zone {
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

export interface Light {
  id: number;
  x: number;
  y: number;
  zone: string;
  type: "warm" | "neutral" | "cool" | "accent";
  label: string;
  power: string;
  kelvin: string;
}

export const zones: Zone[] = [
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

export const lights: Light[] = [
  { id: 1,  x: 10, y: 12, zone: "play",       type: "neutral", label: "А-1", power: "36 Вт", kelvin: "4000K" },
  { id: 2,  x: 22, y: 12, zone: "play",       type: "neutral", label: "А-2", power: "36 Вт", kelvin: "4000K" },
  { id: 3,  x: 10, y: 26, zone: "play",       type: "neutral", label: "А-3", power: "36 Вт", kelvin: "4000K" },
  { id: 4,  x: 22, y: 26, zone: "play",       type: "neutral", label: "А-4", power: "36 Вт", kelvin: "4000K" },
  { id: 5,  x: 10, y: 47, zone: "family",     type: "warm",    label: "Б-1", power: "36 Вт", kelvin: "2700K" },
  { id: 6,  x: 22, y: 47, zone: "family",     type: "warm",    label: "Б-2", power: "36 Вт", kelvin: "2700K" },
  { id: 7,  x: 10, y: 59, zone: "family",     type: "warm",    label: "Б-3", power: "36 Вт", kelvin: "2700K" },
  { id: 8,  x: 22, y: 59, zone: "family",     type: "warm",    label: "Б-4", power: "36 Вт", kelvin: "2700K" },
  { id: 9,  x: 10, y: 79, zone: "sensory",    type: "accent",  label: "В-1", power: "24 Вт", kelvin: "RGB" },
  { id: 10, x: 22, y: 79, zone: "sensory",    type: "accent",  label: "В-2", power: "24 Вт", kelvin: "RGB" },
  { id: 11, x: 16, y: 89, zone: "sensory",    type: "accent",  label: "В-3", power: "24 Вт", kelvin: "RGB" },
  { id: 12, x: 49, y: 12, zone: "shelves",    type: "neutral", label: "Г-1", power: "36 Вт", kelvin: "4000K" },
  { id: 13, x: 49, y: 27, zone: "shelves",    type: "neutral", label: "Г-2", power: "36 Вт", kelvin: "4000K" },
  { id: 14, x: 49, y: 42, zone: "shelves",    type: "neutral", label: "Г-3", power: "36 Вт", kelvin: "4000K" },
  { id: 15, x: 49, y: 57, zone: "shelves",    type: "neutral", label: "Г-4", power: "36 Вт", kelvin: "4000K" },
  { id: 16, x: 49, y: 72, zone: "shelves",    type: "neutral", label: "Г-5", power: "36 Вт", kelvin: "4000K" },
  { id: 17, x: 49, y: 87, zone: "shelves",    type: "neutral", label: "Г-6", power: "36 Вт", kelvin: "4000K" },
  { id: 18, x: 73, y: 10, zone: "multstudio", type: "cool",    label: "Д-1", power: "48 Вт", kelvin: "5000K" },
  { id: 19, x: 86, y: 10, zone: "multstudio", type: "cool",    label: "Д-2", power: "48 Вт", kelvin: "5000K" },
  { id: 20, x: 73, y: 25, zone: "multstudio", type: "cool",    label: "Д-3", power: "48 Вт", kelvin: "5000K" },
  { id: 21, x: 86, y: 25, zone: "multstudio", type: "cool",    label: "Д-4", power: "48 Вт", kelvin: "5000K" },
  { id: 22, x: 73, y: 38, zone: "multstudio", type: "cool",    label: "Д-5", power: "48 Вт", kelvin: "5000K" },
  { id: 23, x: 86, y: 38, zone: "multstudio", type: "cool",    label: "Д-6", power: "48 Вт", kelvin: "5000K" },
  { id: 24, x: 73, y: 57, zone: "staff",      type: "neutral", label: "Е-1", power: "36 Вт", kelvin: "4000K" },
  { id: 25, x: 86, y: 57, zone: "staff",      type: "neutral", label: "Е-2", power: "36 Вт", kelvin: "4000K" },
  { id: 26, x: 73, y: 72, zone: "staff",      type: "neutral", label: "Е-3", power: "36 Вт", kelvin: "4000K" },
  { id: 27, x: 86, y: 72, zone: "staff",      type: "neutral", label: "Е-4", power: "36 Вт", kelvin: "4000K" },
  { id: 28, x: 73, y: 86, zone: "staff",      type: "neutral", label: "Е-5", power: "36 Вт", kelvin: "4000K" },
  { id: 29, x: 86, y: 86, zone: "staff",      type: "neutral", label: "Е-6", power: "36 Вт", kelvin: "4000K" },
];

export const LIGHT_STYLE: Record<Light["type"], { fill: string; stroke: string; glow: string; label: string }> = {
  warm:    { fill: "#FEF3C7", stroke: "#F59E0B", glow: "rgba(245,158,11,0.25)", label: "Тёплый 2700K" },
  neutral: { fill: "#F0F9FF", stroke: "#38BDF8", glow: "rgba(56,189,248,0.2)",  label: "Нейтральный 4000K" },
  cool:    { fill: "#EFF6FF", stroke: "#6366F1", glow: "rgba(99,102,241,0.22)", label: "Холодный 5000K" },
  accent:  { fill: "#FDF4FF", stroke: "#D946EF", glow: "rgba(217,70,239,0.22)", label: "RGB / диммер" },
};

export const ZONE_COLORS: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  play:       { dot: "#DC2626", bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" },
  family:     { dot: "#7C3AED", bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
  sensory:    { dot: "#0891B2", bg: "#ECFEFF", text: "#0E7490", border: "#A5F3FC" },
  shelves:    { dot: "#B45309", bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
  multstudio: { dot: "#059669", bg: "#ECFDF5", text: "#047857", border: "#A7F3D0" },
  staff:      { dot: "#475569", bg: "#F8FAFC", text: "#334155", border: "#CBD5E1" },
};
