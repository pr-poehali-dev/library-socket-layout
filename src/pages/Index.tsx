import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Socket {
  id: number;
  x: number;
  y: number;
  zone: "reading" | "work" | "admin";
  label: string;
  power: string;
  type: string;
  count: number;
}

interface Zone {
  id: "reading" | "work" | "admin";
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
}

const zones: Zone[] = [
  {
    id: "reading",
    label: "Читальная зона",
    color: "#2563EB",
    bgColor: "rgba(37,99,235,0.10)",
    borderColor: "rgba(37,99,235,0.35)",
    icon: "BookOpen",
    x: 3,
    y: 3,
    width: 44,
    height: 56,
    description: "Тихое чтение, работа с книгами",
  },
  {
    id: "work",
    label: "Рабочая зона",
    color: "#059669",
    bgColor: "rgba(5,150,105,0.10)",
    borderColor: "rgba(5,150,105,0.35)",
    icon: "Monitor",
    x: 49,
    y: 3,
    width: 48,
    height: 56,
    description: "Компьютеры, учебные места",
  },
  {
    id: "admin",
    label: "Административная",
    color: "#D97706",
    bgColor: "rgba(217,119,6,0.10)",
    borderColor: "rgba(217,119,6,0.35)",
    icon: "Briefcase",
    x: 3,
    y: 61,
    width: 94,
    height: 34,
    description: "Стойка администратора, архив",
  },
];

const sockets: Socket[] = [
  // 5 розеток под окнами (верхняя стена)
  { id: 1, x: 15, y: 4.5, zone: "reading", label: "О-1", power: "220В / 16А", type: "Евро + USB-C", count: 2 },
  { id: 2, x: 30, y: 4.5, zone: "reading", label: "О-2", power: "220В / 16А", type: "Евро + USB-C", count: 2 },
  { id: 3, x: 50, y: 4.5, zone: "work",    label: "О-3", power: "220В / 16А", type: "Евро + USB-C", count: 2 },
  { id: 4, x: 65, y: 4.5, zone: "work",    label: "О-4", power: "220В / 16А", type: "Евро + USB-C", count: 2 },
  { id: 5, x: 80, y: 4.5, zone: "work",    label: "О-5", power: "220В / 16А", type: "Евро + USB-C", count: 2 },

  // 2 розетки в стене напротив входа (нижняя стена — далеко от входа, слева и справа)
  { id: 6, x: 22, y: 95.5, zone: "reading", label: "Н-1", power: "220В / 16А", type: "Евро × 2", count: 2 },
  { id: 7, x: 75, y: 95.5, zone: "admin",   label: "Н-2", power: "220В / 16А", type: "Евро × 2", count: 2 },

  // 1 розетка справа от входа (правая сторона проёма)
  { id: 8, x: 95.5, y: 60, zone: "admin", label: "В-П", power: "220В / 16А", type: "Евро + USB", count: 2 },

  // 1 розетка слева от входа (левая сторона проёма)
  { id: 9, x: 4.5, y: 60, zone: "reading", label: "В-Л", power: "220В / 16А", type: "Евро + USB", count: 2 },
];

const zoneColors: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  reading: { dot: "#2563EB", bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  work: { dot: "#059669", bg: "#ECFDF5", text: "#047857", border: "#A7F3D0" },
  admin: { dot: "#D97706", bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
};

export default function Index() {
  const [activeSocket, setActiveSocket] = useState<Socket | null>(null);
  const [activeZone, setActiveZone] = useState<Zone["id"] | null>(null);

  const totals = {
    reading: sockets.filter(s => s.zone === "reading").reduce((a, s) => a + s.count, 0),
    work: sockets.filter(s => s.zone === "work").reduce((a, s) => a + s.count, 0),
    admin: sockets.filter(s => s.zone === "admin").reduce((a, s) => a + s.count, 0),
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #F8F9FF 50%, #F0FBF7 100%)", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <header style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB" }} className="sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ background: "linear-gradient(135deg, #2563EB, #059669)", borderRadius: 10 }} className="w-9 h-9 flex items-center justify-center">
              <Icon name="Zap" size={18} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: "#111827", lineHeight: 1 }}>
                Схема розеток
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>Муниципальная библиотека № 7</div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {Object.entries(totals).map(([key, val]) => {
              const c = zoneColors[key];
              return (
                <div key={key} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
                  <span style={{ fontSize: 12, color: c.text, fontWeight: 600 }}>{val} розеток</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Floor plan */}
          <div className="flex-1">
            <div style={{ background: "white", borderRadius: 20, boxShadow: "0 4px 40px rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: "#111827" }}>
                    План помещения
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Кликните на розетку для деталей</div>
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", background: "#F9FAFB", borderRadius: 6, padding: "3px 8px" }}>
                  Масштаб 1:50
                </div>
              </div>

              {/* SVG plan */}
              <div className="px-4 pb-5">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full"
                  style={{ aspectRatio: "4/3", maxHeight: 520 }}
                  onClick={() => { setActiveSocket(null); setActiveZone(null); }}
                >
                  {/* Wall background */}
                  <rect x="0" y="0" width="100" height="100" rx="2" fill="#F3F4F6" />
                  {/* Room walls */}
                  <rect x="2" y="2" width="96" height="96" rx="1.5" fill="white" stroke="#D1D5DB" strokeWidth="0.8" />

                  {/* Windows — верхняя стена (5 окон) */}
                  {[10, 24, 43, 57, 74].map((wx, i) => (
                    <g key={i}>
                      <rect x={wx} y="1.5" width="9" height="1.5" rx="0.3" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="0.3" />
                      <line x1={wx + 4.5} y1="1.5" x2={wx + 4.5} y2="3" stroke="#7DD3FC" strokeWidth="0.25" />
                    </g>
                  ))}
                  {/* Window label */}
                  <text x="50" y="6.5" textAnchor="middle" style={{ fontSize: "2px", fill: "#94A3B8", fontFamily: "'Golos Text', sans-serif" }}>▲ ОКНА</text>

                  {/* Вход — нижняя стена по центру */}
                  {/* Проём входа */}
                  <rect x="43" y="97" width="14" height="1.5" fill="white" stroke="none" />
                  <rect x="43" y="96.5" width="14" height="2" fill="#F3F4F6" />
                  {/* Дверная арка */}
                  <path d="M 43 98 Q 50 90 57 98" fill="none" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="1.5 0.7" />
                  {/* Подпись входа */}
                  <text x="50" y="99.5" textAnchor="middle" style={{ fontSize: "2px", fill: "#6B7280", fontWeight: 700, fontFamily: "'Golos Text', sans-serif" }}>ВХОД</text>

                  {/* Zone areas */}
                  {zones.map(zone => (
                    <g key={zone.id}>
                      <rect
                        x={zone.x} y={zone.y}
                        width={zone.width} height={zone.height}
                        rx="1.5"
                        fill={zone.bgColor}
                        stroke={zone.borderColor}
                        strokeWidth="0.8"
                        strokeDasharray={activeZone === zone.id ? "0" : "2.5 1.5"}
                        style={{ cursor: "pointer", transition: "all 0.2s" }}
                        onClick={e => { e.stopPropagation(); setActiveZone(activeZone === zone.id ? null : zone.id); setActiveSocket(null); }}
                      />
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + 5}
                        textAnchor="middle"
                        style={{ fontSize: "2.8px", fontWeight: 700, fill: zone.color, fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}
                      >
                        {zone.label.toUpperCase()}
                      </text>
                    </g>
                  ))}

                  {/* Furniture — читальные столы (левая зона) */}
                  <rect x="7" y="14" width="9" height="5" rx="0.5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.3" />
                  <rect x="20" y="14" width="9" height="5" rx="0.5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.3" />
                  <rect x="7" y="28" width="9" height="5" rx="0.5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.3" />
                  <rect x="20" y="28" width="9" height="5" rx="0.5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.3" />
                  <rect x="7" y="42" width="9" height="5" rx="0.5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.3" />
                  <rect x="20" y="42" width="9" height="5" rx="0.5" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="0.3" />
                  {/* Книжные стеллажи */}
                  <rect x="33" y="8" width="2.5" height="48" rx="0.5" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="0.3" />

                  {/* Furniture — рабочие компьютеры (правая зона) */}
                  {[54, 67, 80].map(cx => (
                    <g key={cx}>
                      <rect x={cx} y="12" width="9" height="5" rx="0.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.3" />
                      <rect x={cx} y="25" width="9" height="5" rx="0.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.3" />
                      <rect x={cx} y="38" width="9" height="5" rx="0.5" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.3" />
                    </g>
                  ))}

                  {/* Admin desk — нижняя зона */}
                  <rect x="7" y="68" width="35" height="7" rx="0.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.3" />
                  <rect x="58" y="68" width="33" height="7" rx="0.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.3" />

                  {/* Dividing wall (вертикальная) */}
                  <rect x="48" y="2" width="1.2" height="58" fill="#D1D5DB" />
                  {/* Dividing wall (горизонтальная) */}
                  <rect x="2" y="60" width="96" height="1" fill="#D1D5DB" />

                  {/* Sockets */}
                  {sockets.map(socket => {
                    const zone = zones.find(z => z.id === socket.zone)!;
                    const isActive = activeSocket?.id === socket.id;
                    return (
                      <g
                        key={socket.id}
                        style={{ cursor: "pointer" }}
                        onClick={e => { e.stopPropagation(); setActiveSocket(isActive ? null : socket); setActiveZone(null); }}
                      >
                        {/* Glow ring on active */}
                        {isActive && (
                          <circle cx={socket.x} cy={socket.y} r="3.5" fill="none" stroke={zone.color} strokeWidth="0.8" opacity="0.5" />
                        )}
                        {/* Socket circle */}
                        <circle
                          cx={socket.x} cy={socket.y} r={isActive ? 2.5 : 2}
                          fill={isActive ? zone.color : "white"}
                          stroke={zone.color}
                          strokeWidth="0.7"
                          style={{ transition: "all 0.15s" }}
                        />
                        {/* Socket pins */}
                        <circle cx={socket.x - 0.6} cy={socket.y} r="0.35" fill={isActive ? "white" : zone.color} />
                        <circle cx={socket.x + 0.6} cy={socket.y} r="0.35" fill={isActive ? "white" : zone.color} />
                        {/* Label */}
                        <text
                          x={socket.x} y={socket.y + 3.8}
                          textAnchor="middle"
                          style={{ fontSize: "1.7px", fill: zone.color, fontWeight: 600, fontFamily: "'Golos Text', sans-serif", pointerEvents: "none" }}
                        >
                          {socket.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Compass */}
                  <text x="94" y="97" textAnchor="middle" style={{ fontSize: "2.5px", fill: "#9CA3AF", fontWeight: 700 }}>С</text>
                  <line x1="94" y1="93" x2="94" y2="95.5" stroke="#9CA3AF" strokeWidth="0.4" />
                  <polygon points="94,92.5 93.3,93.5 94.7,93.5" fill="#9CA3AF" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 flex flex-col gap-4">
            {/* Active socket info */}
            {activeSocket ? (() => {
              const zone = zones.find(z => z.id === activeSocket.zone)!;
              const c = zoneColors[activeSocket.zone];
              return (
                <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `2px solid ${c.border}`, overflow: "hidden" }}
                  className="animate-fade-in">
                  <div style={{ background: c.bg, padding: "14px 16px 10px", borderBottom: `1px solid ${c.border}` }}>
                    <div className="flex items-center justify-between">
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 16, color: c.text }}>
                        {activeSocket.label}
                      </div>
                      <div style={{ background: c.dot, color: "white", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
                        {activeSocket.count} гнезда
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: c.text, opacity: 0.7, marginTop: 2 }}>{zone.label}</div>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    {[
                      { icon: "Zap", label: "Мощность", val: activeSocket.power },
                      { icon: "Plug", label: "Тип", val: activeSocket.type },
                      { icon: "Hash", label: "Гнёзд", val: String(activeSocket.count) },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-3">
                        <div style={{ background: c.bg, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon name={row.icon} fallback="Circle" size={14} color={c.dot} />
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500 }}>{row.label}</div>
                          <div style={{ fontSize: 13, color: "#111827", fontWeight: 600 }}>{row.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })() : (
              /* Zone legend */
              <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div className="px-5 pt-5 pb-3">
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827" }}>
                    Функциональные зоны
                  </div>
                </div>
                {zones.map(zone => {
                  const c = zoneColors[zone.id];
                  return (
                    <div
                      key={zone.id}
                      style={{
                        padding: "12px 20px",
                        borderLeft: `4px solid ${activeZone === zone.id ? c.dot : "transparent"}`,
                        background: activeZone === zone.id ? c.bg : "transparent",
                        cursor: "pointer",
                        transition: "all 0.15s"
                      }}
                      onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div style={{ background: c.bg, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.border}` }}>
                          <Icon name={zone.icon} fallback="Circle" size={16} color={c.dot} />
                        </div>
                        <div className="flex-1">
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{zone.label}</div>
                          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{zone.description}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 20, fontWeight: 900, color: c.dot, fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>{totals[zone.id]}</div>
                          <div style={{ fontSize: 10, color: "#9CA3AF" }}>розеток</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Summary stats */}
            <div style={{ background: "linear-gradient(135deg, #1E3A8A, #065F46)", borderRadius: 16, padding: 20, color: "white" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, opacity: 0.7, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 14 }}>
                Итого по проекту
              </div>
              {[
                { icon: "Plug", label: "Точек установки", val: sockets.length },
                { icon: "Zap", label: "Всего гнёзд", val: totals.reading + totals.work + totals.admin },
                { icon: "LayoutGrid", label: "Зон", val: zones.length },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <div className="flex items-center gap-2">
                    <Icon name={item.icon} fallback="Circle" size={14} color="rgba(255,255,255,0.6)" />
                    <span style={{ fontSize: 12, opacity: 0.75 }}>{item.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Hint */}
            <div style={{ background: "#FFF7ED", borderRadius: 12, padding: "12px 14px", border: "1px solid #FED7AA" }} className="flex gap-3">
              <Icon name="Info" size={16} color="#EA580C" />
              <div style={{ fontSize: 12, color: "#9A3412", lineHeight: 1.5 }}>
                Высота установки розеток — <b>30 см</b> от пола. В зоне ПК предусмотрена защита от скачков напряжения.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}