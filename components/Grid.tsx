import React from 'react';
import { Participant, MeetingLayout, MeetingTheme } from '../types';
import ParticipantTile from './ParticipantTile';

interface GridProps {
  participants: Participant[];
  layout: MeetingLayout;
  theme: MeetingTheme;
}

const Grid: React.FC<GridProps> = ({ participants, layout, theme }) => {
  const count = participants.length;
  const presentingParticipant = participants.find(p => p.isPresenting);
  
  // Determine if we should show Spotlight/Sidebar view
  // Condition: someone is presenting OR layout is explicitly set to sidebar/spotlight (and we have participants)
  const isSidebarLayout = layout === 'sidebar' || (layout === 'auto' && !!presentingParticipant);
  const isSpotlightLayout = layout === 'spotlight';
  
  // Logic for Sidebar View (Main tile + Right sidebar)
  if (isSidebarLayout && count > 0) {
    // If someone presenting, they are main. Else, pick first as main (or pinned, but simple for now)
    const mainParticipant = presentingParticipant || participants[0];
    const others = participants.filter(p => p.id !== mainParticipant.id);

    return (
      <div className="flex h-full w-full gap-4 p-4">
        {/* Main Stage */}
        <div className="flex-1 h-full min-w-0">
           <ParticipantTile participant={mainParticipant} className="w-full h-full" theme={theme} />
        </div>
        {/* Sidebar Grid (Right Side) */}
        {others.length > 0 && (
          <div className="w-[280px] flex flex-col gap-3 overflow-y-auto pr-1 shrink-0">
            {others.map(p => (
              <div key={p.id} className="h-[180px] shrink-0">
                <ParticipantTile participant={p} className="w-full h-full" theme={theme} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Logic for Spotlight View (Main tile only)
  if (isSpotlightLayout && count > 0) {
    const mainParticipant = presentingParticipant || participants[0];
    return (
      <div className="flex items-center justify-center h-full w-full p-4">
         <ParticipantTile participant={mainParticipant} className="w-full h-full max-w-6xl max-h-full" theme={theme} />
      </div>
    );
  }

  // Fallback: Tiled / Auto (Grid) Logic
  let cols = 1;
  let rows = 1;

  if (count === 1) { cols = 1; rows = 1; }
  else if (count === 2) { cols = 2; rows = 1; }
  else if (count <= 4) { cols = 2; rows = 2; }
  else if (count <= 6) { cols = 3; rows = 2; }
  else if (count <= 9) { cols = 3; rows = 3; }
  else if (count <= 12) { cols = 4; rows = 3; }
  else { cols = 4; rows = 4; }

  // Adjust container max-width based on column count to simulate centering better
  const maxWidth = cols <= 2 ? '1000px' : '100%';

  return (
    <div className="flex items-center justify-center h-full w-full p-4">
       <div 
         className="grid gap-4 w-full h-full"
         style={{
           gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
           gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
           maxWidth: maxWidth,
           maxHeight: '95%'
         }}
       >
         {participants.map(p => (
           <ParticipantTile key={p.id} participant={p} className="w-full h-full" theme={theme} />
         ))}
       </div>
    </div>
  );
};

export default Grid;