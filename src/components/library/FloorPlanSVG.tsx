import { Zone, Light, ViewMode, zones, lights, LIGHT_STYLE } from "./data";

interface FloorPlanSVGProps {
  view: ViewMode;
  activeZone: Zone | null;
  activeLight: Light | null;
  totalWatt: number;
  onZoneClick: (z: Zone | null) => void;
  onLightClick: (l: Light | null) => void;
  onBgClick: () => void;
}

export default function FloorPlanSVG({
  view, activeZone, activeLight, totalWatt, onZoneClick, onLightClick, onBgClick,
}: FloorPlanSVGProps) {
  const isDark = view === "lights";

  return (
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
          onClick={onBgClick}
        >
          {/* Background */}
          <rect x="0" y="0" width="100" height="100" rx="2" fill={isDark ? "#1E293B" : "#F1F5F9"} />
          <rect x="2" y="2" width="96" height="96" rx="1"
            fill={isDark ? "#0F172A" : "white"}
            stroke={isDark ? "#334155" : "#CBD5E1"}
            strokeWidth="0.8" />

          {/* Сетка потолка Армстронг — только в режиме светильников */}
          {isDark && (
            <g opacity="0.12">
              {Array.from({ length: 11 }, (_, i) => (
                <line key={`v${i}`} x1={2 + i * 9.6} y1="2" x2={2 + i * 9.6} y2="98" stroke="#94A3B8" strokeWidth="0.35" />
              ))}
              {Array.from({ length: 11 }, (_, i) => (
                <line key={`h${i}`} x1="2" y1={2 + i * 9.6} x2="98" y2={2 + i * 9.6} stroke="#94A3B8" strokeWidth="0.35" />
              ))}
            </g>
          )}

          {/* Окна — правая стена, 6 штук */}
          {[8, 20, 32, 44, 56, 68].map((wy, i) => (
            <g key={i}>
              <rect x="97.5" y={wy} width="2" height="10" rx="0.4"
                fill={isDark ? "#1E3A5F" : "#BAE6FD"}
                stroke={isDark ? "#3B82F6" : "#38BDF8"} strokeWidth="0.35" />
            </g>
          ))}
          <text x="99.2" y="50" textAnchor="middle" style={{ fontSize: "2px", fill: isDark ? "#3B82F6" : "#94A3B8", writingMode: "vertical-rl" }}>ОКНА</text>

          {/* Вход — левая стена, верхний угол */}
          <rect x="0" y="2" width="2.5" height="16" fill={isDark ? "#0F172A" : "white"} />
          <line x1="2" y1="2" x2="2" y2="10" stroke={isDark ? "#334155" : "#CBD5E1"} strokeWidth="0.8" />
          <line x1="2" y1="18" x2="2" y2="98" stroke={isDark ? "#334155" : "#CBD5E1"} strokeWidth="0.8" />
          <path d="M 2 10 Q 12 10 12 18" fill="none" stroke={isDark ? "#475569" : "#94A3B8"} strokeWidth="0.7" strokeDasharray="1.5 0.8" />
          <rect x="2" y="10" width="10" height="0.6" fill={isDark ? "#475569" : "#94A3B8"} />
          <text x="1" y="15" textAnchor="middle" style={{ fontSize: "1.8px", fill: isDark ? "#64748B" : "#475569", fontWeight: 700, writingMode: "vertical-rl" }}>ВХОД</text>

          {/* ======= РЕЖИМ ЗОНЫ ======= */}
          {view === "zones" && (
            <g>
              {zones.map(zone => {
                const isActive = activeZone?.id === zone.id;
                return (
                  <g key={zone.id} style={{ cursor: "pointer" }} onClick={e => { e.stopPropagation(); onZoneClick(isActive ? null : zone); }}>
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
              {zones.map(zone => (
                <rect key={zone.id} x={zone.x} y={zone.y} width={zone.width} height={zone.height} rx="1.5"
                  fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
              ))}
              {zones.map(zone => (
                <text key={zone.id} x={zone.x + zone.width / 2} y={zone.y + 5} textAnchor="middle"
                  style={{ fontSize: "2px", fill: "rgba(255,255,255,0.2)", fontFamily: "'Montserrat', sans-serif", pointerEvents: "none" }}>
                  {zone.label.toUpperCase()}
                </text>
              ))}

              {lights.map(light => {
                const s = LIGHT_STYLE[light.type];
                const isActive = activeLight?.id === light.id;
                return (
                  <g key={light.id} style={{ cursor: "pointer" }}
                    onClick={e => { e.stopPropagation(); onLightClick(isActive ? null : light); }}>
                    <circle cx={light.x} cy={light.y} r={isActive ? 7 : 5}
                      fill={s.glow} opacity={isActive ? 0.8 : 0.5} />
                    <rect x={light.x - 2.5} y={light.y - 2.5} width="5" height="5" rx="0.5"
                      fill={s.fill} stroke={s.stroke}
                      strokeWidth={isActive ? 0.8 : 0.5}
                      style={{ transition: "all 0.15s" }} />
                    <line x1={light.x - 2.5} y1={light.y} x2={light.x + 2.5} y2={light.y} stroke={s.stroke} strokeWidth="0.25" opacity="0.5" />
                    <line x1={light.x} y1={light.y - 2.5} x2={light.x} y2={light.y + 2.5} stroke={s.stroke} strokeWidth="0.25" opacity="0.5" />
                    <text x={light.x} y={light.y + 4.5} textAnchor="middle"
                      style={{ fontSize: "1.5px", fill: s.stroke, fontWeight: 700, fontFamily: "'Golos Text', sans-serif", pointerEvents: "none" }}>
                      {light.label}
                    </text>
                  </g>
                );
              })}

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
  );
}
