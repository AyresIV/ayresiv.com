import { ChevronDown } from 'lucide-react';

const DISCORD_URL = 'https://discord.gg/spartagg';

const ITEMS = [
  {
    q: 'How does a session work?',
    a: (
      <>
        Everything is done remotely with <strong>RustDesk</strong>, a free remote-desktop app. You install it, share
        your ID, and we take control to tune Windows, overclock your GPU and adjust your BIOS settings.
      </>
    ),
  },
  {
    q: 'How long does a session take?',
    a: (
      <>
        It depends on the package and your PC. Stress testing takes the most time: RAM tuning alone can need 1.5–2
        hours of testing, and if errors show up we go back into the BIOS, readjust and test again until it&apos;s stable.
      </>
    ),
  },
  {
    q: 'Is it safe? Is there a warranty?',
    a: (
      <>
        There&apos;s no warranty, but we&apos;ve never damaged a PC (software or hardware) and we&apos;ve never left
        a customer without help. If anything we changed causes a problem, we&apos;ll fix it.
      </>
    ),
  },
  {
    q: 'What if something goes wrong afterwards?',
    a: (
      <>
        DM <strong>AyresIV</strong> on Discord or open a ticket in the{' '}
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord server</a> and we&apos;ll help you
        further.
      </>
    ),
  },
  {
    q: 'How do I pay?',
    a: <>Payment is made with PayPal before your appointment.</>,
  },
  {
    q: 'Do you work on laptops?',
    a: (
      <>
        We work on all types of PC. Laptops have hardware limitations, so on laptops we only do Windows
        optimizations (no overclocking or BIOS tuning).
      </>
    ),
  },
  {
    q: 'Will a fresh Windows install delete my files?',
    a: (
      <>
        Yes, a fresh install wipes everything. Before your session, back up anything important to a different drive
        or a cloud drive like Google Drive.
      </>
    ),
  },
];

// FAQ, shown on the Plans page and as its own /faq page (asPage: h1 heading,
// more top spacing). Native <details> so it works with keyboard and screen readers
// out of the box; the open/close height animation is CSS-only (see
// optimizations-page.css) and simply snaps in browsers that can't animate it.
const Faq = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  return (
    <section className={`faq-section${asPage ? ' faq-section--page' : ''}`} aria-labelledby="faq-title">
      <div className="optimizations-container faq-container">
        <Heading data-reveal id="faq-title" className="optimizations-section-title">
          {asPage ? 'Frequently Asked Questions' : 'FAQ'}
        </Heading>
        <p data-reveal className="optimizations-section-subtitle">Everything you need to know before booking.</p>
        <div className="faq-list">
          {ITEMS.map(({ q, a }) => (
            <details key={q} className="faq-item" data-reveal>
              <summary className="faq-question">
                <span>{q}</span>
                <ChevronDown className="faq-chevron" size={20} aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
        {asPage && (
          <div data-reveal className="faq-more">
            <p>Still have a question?</p>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="package-book">
              Ask on Discord
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Faq;
