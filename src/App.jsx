import React, { useState } from 'react';
import useOrder from './hooks/useOrder.js';
import { useIsMobile } from './hooks/useScratch.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Finder from './components/Finder.jsx';
import CupStage from './components/CupStage.jsx';
import Receipt from './components/Receipt.jsx';
import MobileSummary from './components/MobileSummary.jsx';
import CompareTable from './components/CompareTable.jsx';
import Trust from './components/Trust.jsx';
import Footer from './components/Footer.jsx';
import AboutModal from './components/AboutModal.jsx';

export default function App() {
  const order = useOrder();
  const isMobile = useIsMobile();
  const [compareOpen, setCompareOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const about = { onAbout: () => setAboutOpen(true) };
  const aboutModal = aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />;

  if (isMobile) {
    return (
      <>
        <Header onAbout={about.onAbout} />
        {/* Pinned cup lives at the top of CupStage; params + summary scroll behind it. */}
        <CupStage order={order} compareOpen={compareOpen} onCompareToggle={() => setCompareOpen((o) => !o)} />
        {compareOpen && <CompareTable order={order} />}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '18px clamp(16px,4vw,24px) 0' }}>
          <Hero />
          <Finder order={order} />
          <MobileSummary order={order} />
        </section>
        <Trust />
        <Footer padBottom="18px" />
        {aboutModal}
      </>
    );
  }

  return (
    <>
      <Header onAbout={about.onAbout} />
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '300px minmax(0,1fr) 380px',
          columnGap: 28, rowGap: 18,
          padding: 'clamp(20px,3vw,36px) clamp(20px,4vw,48px) 10px',
          alignItems: 'start', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box',
        }}
      >
        <div style={{ order: 1, display: 'flex', flexDirection: 'column', gap: 24 }}><Hero /><Finder order={order} /></div>
        <div style={{ order: 2 }}><CupStage order={order} compareOpen={compareOpen} onCompareToggle={() => setCompareOpen((o) => !o)} /></div>
        <div style={{ order: 3 }}><Receipt order={order} /></div>
      </section>
      {compareOpen && <CompareTable order={order} />}
      <Trust />
      <Footer padBottom="18px" />
      {aboutModal}
    </>
  );
}
