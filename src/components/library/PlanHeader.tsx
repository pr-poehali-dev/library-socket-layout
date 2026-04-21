import Icon from "@/components/ui/icon";
import { ViewMode, zones, ZONE_COLORS, Zone } from "./data";

interface PlanHeaderProps {
  view: ViewMode;
  activeZone: Zone | null;
  onViewChange: (v: ViewMode) => void;
  onZoneClick: (z: Zone | null) => void;
}

export default function PlanHeader({ view, activeZone, onViewChange, onZoneClick }: PlanHeaderProps) {
  return (
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

        <div style={{ background: "#F1F5F9", borderRadius: 12, padding: 4, display: "flex", gap: 2 }}>
          {([
            { id: "zones", icon: "LayoutGrid", label: "Зоны" },
            { id: "lights", icon: "Lightbulb", label: "Светильники" },
          ] as { id: ViewMode; icon: string; label: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
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
  );
}
