import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle, Sparkles, Compass, Shield, Grid, Search, Sun } from 'lucide-react';
import AngleLabStation from '../simulations/AngleLabStation';
import BridgeBuilderStation from '../simulations/BridgeBuilderStation';
import PythagorasGardenStation from '../simulations/PythagorasGardenStation';
import CongruenceDetectiveStation from '../simulations/CongruenceDetectiveStation';
import ShadowSurveyorStation from '../simulations/ShadowSurveyorStation';
import Mascot from '../Mascot';

const STATIONS = [
  {
    id: 0,
    name: 'Angle Lab',
    tag: 'Station A • Concrete',
    icon: <Compass size={18} />,
    desc: 'Drag vertices & tear corners: sum always stays 180°!'
  },
  {
    id: 1,
    name: 'Bridge Builder',
    tag: 'Station B • Concrete',
    icon: <Shield size={18} />,
    desc: 'Slide 3 rods to test triangle inequality & bridge rigidity.'
  },
  {
    id: 2,
    name: 'Pythagoras Garden',
    tag: 'Station C • Pictorial',
    icon: <Grid size={18} />,
    desc: 'Count square garden tiles to discover a² + b² = c².'
  },
  {
    id: 3,
    name: 'Congruence Detective',
    tag: 'Station D • Pictorial',
    icon: <Search size={18} />,
    desc: 'Test evidence: SSS, SAS, ASA, AAS, RHS vs SSA ambiguous trap!'
  },
  {
    id: 4,
    name: 'Shadow Surveyor',
    tag: 'Station E • Abstract',
    icon: <Sun size={18} />,
    desc: 'Slide sun angle to measure unreachable heights with shadows.'
  }
];

export default function SimulatePhase({
  onNext,
  audioEnabled,
  onSimulationsComplete,
  onSSACaseSeen,
  completedStations = [false, false, false, false, false],
  setCompletedStations
}) {
  const [stationIdx, setStationIdx] = useState(0);

  const handleStationComplete = (index) => {
    const updated = [...completedStations];
    updated[index] = true;
    if (setCompletedStations) setCompletedStations(updated);

    if (index < 4) {
      setStationIdx(index + 1);
    } else {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
      if (onSimulationsComplete) onSimulationsComplete();
    }
  };

  const allDone = completedStations.every(Boolean);

  return (
    <div className="phase-container simulate-phase-curious">
      <div className="glass-card simulate-main-card">
        {/* Phase Top Header */}
        <div className="simulate-phase-top-bar">
          <div className="simulate-title-group">
            <span className="phase-tag">PHASE 3 — SIMULATE</span>
            <h2 className="simulate-main-title">The Triangle Engineering Laboratory</h2>
            <p className="simulate-tagline">
              Master the 5 core discoveries that make world engineering possible! Pass all 5 checkpoints to unlock Practice.
            </p>
          </div>

          {/* Laboratory Station Tabs Hub */}
          <div className="simulate-stations-hub">
            {STATIONS.map((st, i) => {
              const isActive = i === stationIdx;
              const isDone = completedStations[i];
              return (
                <div
                  key={st.id}
                  className={`station-hub-card ${isActive ? 'is-active-station' : ''} ${isDone ? 'is-station-done' : ''}`}
                  onClick={() => setStationIdx(i)}
                >
                  <div className="station-card-icon-row">
                    <span className="station-icon-badge">{st.icon}</span>
                    <span className="station-tag-label">{st.tag}</span>
                    {isDone && <CheckCircle size={16} className="done-check-icon" />}
                  </div>
                  <h4 className="station-hub-name">{st.name}</h4>
                  <p className="station-hub-desc">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Station Workspace */}
        <div className="simulation-active-stage">
          {stationIdx === 0 && (
            <AngleLabStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(0)}
            />
          )}

          {stationIdx === 1 && (
            <BridgeBuilderStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(1)}
            />
          )}

          {stationIdx === 2 && (
            <PythagorasGardenStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(2)}
            />
          )}

          {stationIdx === 3 && (
            <CongruenceDetectiveStation
              audioEnabled={audioEnabled}
              onSSACaseSeen={onSSACaseSeen}
              onComplete={() => handleStationComplete(3)}
            />
          )}

          {stationIdx === 4 && (
            <ShadowSurveyorStation
              audioEnabled={audioEnabled}
              onComplete={() => handleStationComplete(4)}
            />
          )}
        </div>

        {/* All Stations Passed CTA to Practice */}
        {allDone && (
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={onNext}>
              <span>All 5 Stations Passed! Unlock IntelliPlay™</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
