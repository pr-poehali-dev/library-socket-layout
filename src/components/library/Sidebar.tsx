import Icon from "@/components/ui/icon";
import { Zone, Light, ViewMode, zones, lights, ZONE_COLORS, LIGHT_STYLE } from "./data";

interface SidebarProps {
  view: ViewMode;
  activeZone: Zone | null;
  activeLight: Light | null;
  totalWatt: number;
  onZoneClick: (z: Zone) => void;
}

export default function Sidebar({ view, activeZone, activeLight, totalWatt, onZoneClick }: SidebarProps) {
  return (
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
                { icon: "Zap",      label: "Мощность",             val: activeLight.power },
                { icon: "Sun",      label: "Цветовая температура", val: activeLight.kelvin },
                { icon: "MapPin",   label: "Зона",                 val: zone?.label ?? "" },
                { icon: "Square",   label: "Тип панели",           val: "Армстронг 600×600" },
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
      })() : view === "zones" ? (
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div className="px-5 pt-4 pb-2">
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: "#111827" }}>Зоны помещения</div>
            <div style={{ fontSize: 11, color: "#9CA3AF" }}>Нажмите на зону для деталей</div>
          </div>
          {zones.map(zone => {
            const c = ZONE_COLORS[zone.id];
            return (
              <div key={zone.id} style={{ padding: "10px 20px", cursor: "pointer", transition: "all 0.15s" }}
                className="hover:bg-gray-50" onClick={() => onZoneClick(zone)}>
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
      )}

      {/* Параметры проекта */}
      <div style={{ background: "linear-gradient(135deg, #1E1B4B, #134E4A)", borderRadius: 16, padding: 20, color: "white" }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 12, opacity: 0.5, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Параметры
        </div>
        {[
          { icon: "LayoutDashboard", label: "Площадь",        val: "115 м²" },
          { icon: "Grid3x3",         label: "Зон",            val: "6" },
          { icon: "Sun",             label: "Окна",           val: "6 шт, справа" },
          { icon: "DoorOpen",        label: "Вход",           val: "Слева, у угла" },
          { icon: "Lightbulb",       label: "Светильников",   val: String(lights.length) },
          { icon: "Zap",             label: "Мощность",       val: `${totalWatt} Вт` },
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
  );
}
