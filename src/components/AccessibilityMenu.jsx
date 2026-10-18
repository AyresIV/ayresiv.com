import { useEffect, useId, useRef, useState } from 'react';
import { Accessibility, RotateCcw, X } from 'lucide-react';
import { useAccessibility } from '../context/accessibility';

const TEXT_SIZES = ['default', 'large', 'larger'];
const TEXT_SIZE_LABELS = { default: 'A', large: 'A+', larger: 'A++' };
const TEXT_SIZE_NAMES = { default: 'Default text size', large: 'Large text', larger: 'Larger text' };

const SWITCHES = [
  { key: 'reduceMotion', label: 'Reduce motion', hint: 'Stops background animation and smooth scrolling' },
  { key: 'highContrast', label: 'High contrast', hint: 'Brighter text, solid backgrounds, no glow' },
  { key: 'readableFont', label: 'Readable font', hint: 'Easier-to-read typeface with wider spacing' },
  { key: 'highlightLinks', label: 'Highlight links', hint: 'Underlines every link and button' },
];

// Floating accessibility settings: a button in the bottom-left corner that opens
// a small panel. The panel stays mounted (inert while closed) so its open/close
// is a CSS transition that can be interrupted mid-way.
const AccessibilityMenu = () => {
  const a11y = useAccessibility();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = useId();
  const panelId = useId();

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) close(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  // Close when keyboard focus leaves the menu entirely.
  const onBlur = (e) => {
    if (open && e.relatedTarget && !rootRef.current?.contains(e.relatedTarget)) close(false);
  };

  return (
    <div className="a11y" ref={rootRef} onBlur={onBlur}>
      <button
        ref={triggerRef}
        type="button"
        className="a11y__trigger"
        aria-label="Accessibility settings"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <Accessibility size={22} aria-hidden="true" />
        {a11y.isCustomized && <span className="a11y__dot" aria-hidden="true" />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="a11y__panel"
        role="dialog"
        aria-labelledby={titleId}
        data-open={open}
        inert={!open}
        tabIndex={-1}
      >
        <div className="a11y__header">
          <h2 className="a11y__title" id={titleId}>Accessibility</h2>
          <button type="button" className="a11y__icon-btn" aria-label="Close accessibility settings" onClick={() => close()}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="a11y__group" role="group" aria-label="Text size">
          <span className="a11y__label" aria-hidden="true">Text size</span>
          <div className="a11y__segmented">
            {TEXT_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                className="a11y__segment"
                aria-pressed={a11y.textSize === size}
                aria-label={TEXT_SIZE_NAMES[size]}
                onClick={() => a11y.setPref('textSize', size)}
              >
                {TEXT_SIZE_LABELS[size]}
              </button>
            ))}
          </div>
        </div>

        <ul className="a11y__list">
          {SWITCHES.map(({ key, label, hint }) => (
            <li key={key}>
              <button
                type="button"
                role="switch"
                className="a11y__switch"
                aria-checked={Boolean(a11y[key])}
                onClick={() => a11y.setPref(key, !a11y[key])}
              >
                <span className="a11y__switch-text">
                  <span className="a11y__switch-label">{label}</span>
                  <span className="a11y__switch-hint">{hint}</span>
                </span>
                <span className="a11y__track" aria-hidden="true"><span className="a11y__thumb" /></span>
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="a11y__reset" onClick={a11y.reset} disabled={!a11y.isCustomized}>
          <RotateCcw size={15} aria-hidden="true" /> Reset to defaults
        </button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
