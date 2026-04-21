import { useState } from "react";
import { ViewMode, Zone, Light, lights } from "@/components/library/data";
import PlanHeader from "@/components/library/PlanHeader";
import FloorPlanSVG from "@/components/library/FloorPlanSVG";
import Sidebar from "@/components/library/Sidebar";

export default function Index() {
  const [view, setView] = useState<ViewMode>("zones");
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [activeLight, setActiveLight] = useState<Light | null>(null);

  const totalWatt = lights.reduce((s, l) => s + parseInt(l.power), 0);

  function handleViewChange(v: ViewMode) {
    setView(v);
    setActiveZone(null);
    setActiveLight(null);
  }

  function handleBgClick() {
    setActiveZone(null);
    setActiveLight(null);
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F0F4FF 0%, #FAFBFF 60%, #F0FDF4 100%)", fontFamily: "'Golos Text', sans-serif" }}>
      <PlanHeader
        view={view}
        activeZone={activeZone}
        onViewChange={handleViewChange}
        onZoneClick={setActiveZone}
      />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          <div className="flex-1">
            <FloorPlanSVG
              view={view}
              activeZone={activeZone}
              activeLight={activeLight}
              totalWatt={totalWatt}
              onZoneClick={setActiveZone}
              onLightClick={setActiveLight}
              onBgClick={handleBgClick}
            />
          </div>

          <Sidebar
            view={view}
            activeZone={activeZone}
            activeLight={activeLight}
            totalWatt={totalWatt}
            onZoneClick={setActiveZone}
          />
        </div>
      </main>
    </div>
  );
}
