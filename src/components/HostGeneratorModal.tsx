import React, { useState } from 'react';
import { GUEST_PRESETS, WEDDING_EVENTS, COUPLE } from '../data/weddingData';
import { buildGuestUrl, buildHostAccessUrl } from '../utils/urlHelper';

interface Props {
  onClose: () => void;
}

type GeneratorTab = 'single' | 'bulk' | 'broadcast';

interface BulkGuestItem {
  id: string;
  name: string;
  link: string;
  eventsText: string;
  whatsappMessage: string;
}

const HostGeneratorModal: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<GeneratorTab>('single');

  // Single Guest State
  const [guestName, setGuestName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['garba', 'santek', 'haldi', 'wedding']);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Bulk Guest State
  const [bulkInput, setBulkInput] = useState(
    'Ramesh Uncle & Family\nSuresh Bhai & Parivaar\nPriya & Rahul\nAmit Patel\nMehta Family'
  );
  const [bulkEvents, setBulkEvents] = useState<string[]>(['garba', 'santek', 'haldi', 'wedding']);
  const [bulkList, setBulkList] = useState<BulkGuestItem[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSingleIndex, setCopiedSingleIndex] = useState<number | null>(null);
  const [copiedHostLink, setCopiedHostLink] = useState(false);
  const hostAccessUrl = buildHostAccessUrl();

  // Single guest link & message calculations
  const singleGuestLink = buildGuestUrl(guestName || 'Guest', selectedEvents);
  const singleInvitedTitles = WEDDING_EVENTS
    .filter(e => selectedEvents.includes(e.slug))
    .map(e => `${e.emoji} ${e.title}`)
    .join('\n• ');

  const getWhatsAppMessage = (name: string, link: string, events: string[]) => {
    const titles = WEDDING_EVENTS
      .filter(e => events.includes(e.slug))
      .map(e => `${e.emoji} ${e.title}`)
      .join('\n• ');

    return `॥ श्री गणेशाय नमः ॥\n\nDear ${name.trim() || 'Family & Friends'},\n\nWith the divine blessings of Lord Ganesha, we cordially invite you to celebrate the wedding celebrations of:\n\n✨ ${COUPLE.groomFirst} & ${COUPLE.brideFirst} ✨\n\nYou are warmly invited to:\n• ${titles}\n\nPlease click below to view your personalized royal invitation:\n👉 ${link}\n\nWith love & regards,\nDesai & Mahale Families\n#AviKiNupur`;
  };

  const singleWhatsAppMessage = getWhatsAppMessage(guestName, singleGuestLink, selectedEvents);

  const toggleEvent = (slug: string) => {
    setSelectedEvents(prev => {
      if (prev.includes(slug)) {
        if (prev.length === 1) return prev;
        return prev.filter(e => e !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const toggleBulkEvent = (slug: string) => {
    setBulkEvents(prev => {
      if (prev.includes(slug)) {
        if (prev.length === 1) return prev;
        return prev.filter(e => e !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(singleGuestLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(singleWhatsAppMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2200);
  };

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Bulk Generator Functions
  const handleGenerateBulk = () => {
    const lines = bulkInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length === 0) return;

    const titles = WEDDING_EVENTS
      .filter(e => bulkEvents.includes(e.slug))
      .map(e => e.title)
      .join(', ');

    const generated: BulkGuestItem[] = lines.map((name, idx) => {
      const link = buildGuestUrl(name, bulkEvents);
      return {
        id: `${idx}-${Date.now()}`,
        name,
        link,
        eventsText: titles,
        whatsappMessage: getWhatsAppMessage(name, link, bulkEvents),
      };
    });

    setBulkList(generated);
  };

  const handleCopyAllLinks = async () => {
    if (bulkList.length === 0) return;
    const allText = bulkList.map(item => `${item.name}: ${item.link}`).join('\n');
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2200);
  };

  const handleDownloadCsv = () => {
    if (bulkList.length === 0) return;

    const headers = ['Guest Name', 'Invited Events', 'Custom Link', 'WhatsApp Message'];
    const rows = bulkList.map(item => [
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.eventsText.replace(/"/g, '""')}"`,
      `"${item.link}"`,
      `"${item.whatsappMessage.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Wedding_Guest_Invitations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop-layer" onClick={onClose}>
      <div className="customizer-modal-card" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="customizer-header">
          <div className="header-title-group">
            <span className="header-icon-badge">💌</span>
            <div>
              <h3 className="customizer-title">Wedding Invitation Manager (Host Mode)</h3>
              <p className="customizer-subtitle">
                Create and send personalized invitations individually or to multiple guests at once
              </p>
            </div>
          </div>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Secret Family Access Link Banner */}
        <div className="host-family-share-banner">
          <div className="host-family-text">
            <strong>🔗 Family Member Access Link</strong>
            <p>
              Share this secret link with family members so they can generate and send out invitations too. 
              <strong> Regular guests who receive the invite will NOT see this generator tool.</strong>
            </p>
          </div>
          <div className="host-family-action">
            <button
              type="button"
              className="btn-sage btn-sm"
              onClick={async () => {
                await navigator.clipboard.writeText(hostAccessUrl);
                setCopiedHostLink(true);
                setTimeout(() => setCopiedHostLink(false), 2200);
              }}
            >
              {copiedHostLink ? '✓ Copied Family Link!' : '📋 Copy Family Host Link'}
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="generator-tabs-nav">
          <button
            className={`gen-tab-btn ${activeTab === 'single' ? 'active' : ''}`}
            onClick={() => setActiveTab('single')}
          >
            <span>👤 Single Guest</span>
          </button>
          <button
            className={`gen-tab-btn ${activeTab === 'bulk' ? 'active' : ''}`}
            onClick={() => setActiveTab('bulk')}
          >
            <span>🚀 Bulk List Generator</span>
          </button>
          <button
            className={`gen-tab-btn ${activeTab === 'broadcast' ? 'active' : ''}`}
            onClick={() => setActiveTab('broadcast')}
          >
            <span>👥 Broadcast & Groups</span>
          </button>
        </div>

        {/* Tab 1: Single Guest */}
        {activeTab === 'single' && (
          <div className="customizer-body">
            <div className="generator-field">
              <label className="generator-field-label">
                1. Guest / Family Name
              </label>
              <input
                type="text"
                className="generator-text-input"
                placeholder="e.g. Ramesh Uncle & Family or Priya Sharma"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
              />
            </div>

            <div className="generator-field">
              <label className="generator-field-label">
                2. Quick Invitation Type
              </label>
              <div className="preset-buttons-grid">
                {GUEST_PRESETS.map((preset, idx) => {
                  const isSelected =
                    preset.events.length === selectedEvents.length &&
                    preset.events.every(ev => selectedEvents.includes(ev));
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`preset-pill-button ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedEvents(preset.events)}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="generator-field">
              <label className="generator-field-label">
                3. Selected Ceremonies ({selectedEvents.length} of {WEDDING_EVENTS.length})
              </label>
              <div className="ceremony-select-grid">
                {WEDDING_EVENTS.map(event => {
                  const checked = selectedEvents.includes(event.slug);
                  return (
                    <label
                      key={event.id}
                      className={`ceremony-select-box ${checked ? 'checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleEvent(event.slug)}
                      />
                      <div className="ceremony-select-content">
                        <span className="select-emoji">{event.emoji}</span>
                        <div className="select-text">
                          <strong className="select-name">{event.title}</strong>
                          <span className="select-date">{event.date}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="generator-output-box">
              <label className="generator-field-label">
                4. Generated Link for {guestName.trim() || 'Guest'}
              </label>
              <div className="link-display-row">
                <input
                  type="text"
                  readOnly
                  value={singleGuestLink}
                  className="link-input-display"
                />
                <button
                  type="button"
                  className="btn-sage btn-sm"
                  onClick={handleCopyLink}
                >
                  {copiedLink ? '✓ Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="generator-actions-row">
                <button
                  type="button"
                  className="btn-whatsapp-share"
                  onClick={() => handleOpenWhatsApp(singleWhatsAppMessage)}
                >
                  <span>💬 Share directly on WhatsApp</span>
                </button>
                <button
                  type="button"
                  className="btn-preview-link"
                  onClick={() => window.open(singleGuestLink, '_blank')}
                >
                  <span>👁️ Test Guest View</span>
                </button>
                <button
                  type="button"
                  className="btn-copy-full-text"
                  onClick={handleCopyMessage}
                >
                  {copiedMsg ? '✓ Message Copied!' : '📋 Copy Full WhatsApp Text'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bulk List Generator */}
        {activeTab === 'bulk' && (
          <div className="customizer-body">
            <div className="bulk-instruction-banner">
              <strong>✨ Paste Your Guest List (One name per line)</strong>
              <p>
                You can copy multiple names from Excel, WhatsApp, or Word and paste them below. 
                We will generate custom personalized links for everyone at once!
              </p>
            </div>

            <div className="generator-field">
              <label className="generator-field-label">
                1. Guest Names (One Per Line)
              </label>
              <textarea
                className="bulk-textarea"
                rows={5}
                value={bulkInput}
                onChange={e => setBulkInput(e.target.value)}
                placeholder="Ramesh Uncle & Family&#10;Suresh Bhai & Parivaar&#10;Priya & Rahul..."
              />
            </div>

            <div className="generator-field">
              <label className="generator-field-label">
                2. Which ceremonies are these guests invited to?
              </label>
              <div className="preset-buttons-grid">
                {GUEST_PRESETS.map((preset, idx) => {
                  const isSelected =
                    preset.events.length === bulkEvents.length &&
                    preset.events.every(ev => bulkEvents.includes(ev));
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`preset-pill-button ${isSelected ? 'active' : ''}`}
                      onClick={() => setBulkEvents(preset.events)}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              <div className="ceremony-select-grid" style={{ marginTop: '0.6rem' }}>
                {WEDDING_EVENTS.map(event => {
                  const checked = bulkEvents.includes(event.slug);
                  return (
                    <label
                      key={event.id}
                      className={`ceremony-select-box ${checked ? 'checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleBulkEvent(event.slug)}
                      />
                      <div className="ceremony-select-content">
                        <span className="select-emoji">{event.emoji}</span>
                        <span className="select-name">{event.title}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="btn-sage btn-full"
              style={{ padding: '0.85rem' }}
              onClick={handleGenerateBulk}
            >
              ⚡ Generate All Guest Links ({bulkInput.split('\n').filter(l => l.trim()).length} Guests)
            </button>

            {/* Bulk Result Table */}
            {bulkList.length > 0 && (
              <div className="bulk-results-card">
                <div className="bulk-results-header">
                  <div>
                    <strong>Generated {bulkList.length} Personalized Invitations</strong>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Ready to share via WhatsApp or export
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-sage btn-sm"
                      onClick={handleDownloadCsv}
                    >
                      📥 Download Excel / CSV
                    </button>
                    <button
                      type="button"
                      className="btn-outline btn-sm"
                      onClick={handleCopyAllLinks}
                    >
                      {copiedAll ? '✓ All Copied!' : '📋 Copy All Links'}
                    </button>
                  </div>
                </div>

                <div className="bulk-guest-table-wrapper">
                  {bulkList.map((item, idx) => (
                    <div key={item.id} className="bulk-guest-row">
                      <div className="bulk-guest-info">
                        <strong className="bulk-guest-name">{idx + 1}. {item.name}</strong>
                        <span className="bulk-guest-url">{item.link}</span>
                      </div>
                      <div className="bulk-row-actions">
                        <button
                          type="button"
                          className="bulk-btn-whatsapp"
                          onClick={() => handleOpenWhatsApp(item.whatsappMessage)}
                          title="Send to WhatsApp"
                        >
                          💬 Send WhatsApp
                        </button>
                        <button
                          type="button"
                          className="bulk-btn-copy"
                          onClick={async () => {
                            await navigator.clipboard.writeText(item.link);
                            setCopiedSingleIndex(idx);
                            setTimeout(() => setCopiedSingleIndex(null), 2000);
                          }}
                        >
                          {copiedSingleIndex === idx ? '✓' : 'Copy'}
                        </button>
                        <button
                          type="button"
                          className="bulk-btn-view"
                          onClick={() => window.open(item.link, '_blank')}
                          title="Preview Guest View"
                        >
                          👁️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Broadcast & Groups */}
        {activeTab === 'broadcast' && (
          <div className="customizer-body">
            <div className="broadcast-guide-box">
              <span style={{ fontSize: '1.6rem' }}>📢</span>
              <div>
                <strong>How to Send to 250+ Guests in 1 Second with WhatsApp Broadcast</strong>
                <p>
                  WhatsApp has a free built-in feature called <strong>"New Broadcast"</strong>. 
                  When you send a message to a Broadcast list, every person receives it as a 
                  <strong> private 1-on-1 personal message</strong>!
                </p>
              </div>
            </div>

            <div className="broadcast-steps-list">
              <div className="b-step">
                <span className="b-step-num">1</span>
                <div>
                  <strong>Open WhatsApp on your phone</strong>
                  <p>Tap <strong>Menu (three dots)</strong> on Android or <strong>Broadcast Lists</strong> on iPhone.</p>
                </div>
              </div>
              <div className="b-step">
                <span className="b-step-num">2</span>
                <div>
                  <strong>Create a Broadcast list</strong>
                  <p>Select your relatives or friends (up to 256 people per list).</p>
                </div>
              </div>
              <div className="b-step">
                <span className="b-step-num">3</span>
                <div>
                  <strong>Choose a Group Link below & send</strong>
                  <p>Click "Share to WhatsApp" or copy the message. All recipients will receive their invitation simultaneously!</p>
                </div>
              </div>
            </div>

            {/* Quick Group Links */}
            <label className="generator-field-label" style={{ marginTop: '0.5rem' }}>
              Select Group Category to Share:
            </label>
            <div className="group-cards-grid">
              {[
                {
                  title: '🌟 All Family & Relatives',
                  subtitle: 'Invited to All 4 Events (Full Vivah)',
                  events: ['garba', 'santek', 'haldi', 'wedding'],
                  groupName: 'Our Beloved Family',
                },
                {
                  title: '💃 Friends & Colleagues',
                  subtitle: 'Invited to Sangeet & Baraat',
                  events: ['garba', 'wedding'],
                  groupName: 'Our Dear Friends',
                },
                {
                  title: '🪔 Garba & Sangeet Group',
                  subtitle: 'Invited to Sangeet Night Only',
                  events: ['garba'],
                  groupName: 'Special Guests',
                },
                {
                  title: '🪷 Pooja & Haldi Group',
                  subtitle: 'Invited to Santek & Haldi Only',
                  events: ['santek', 'haldi'],
                  groupName: 'Respected Elders & Family',
                },
              ].map((grp, i) => {
                const groupLink = buildGuestUrl(grp.groupName, grp.events);
                const groupMsg = getWhatsAppMessage(grp.groupName, groupLink, grp.events);

                return (
                  <div key={i} className="group-preset-card">
                    <div className="group-card-header">
                      <strong>{grp.title}</strong>
                      <span className="group-badge">{grp.subtitle}</span>
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={groupLink}
                      className="link-input-display"
                      style={{ margin: '0.4rem 0' }}
                    />
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="btn-whatsapp-share"
                        style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                        onClick={() => handleOpenWhatsApp(groupMsg)}
                      >
                        💬 Share to WhatsApp Group / Broadcast
                      </button>
                      <button
                        type="button"
                        className="btn-preview-link"
                        style={{ padding: '0.45rem 0.8rem', fontSize: '0.78rem' }}
                        onClick={async () => {
                          await navigator.clipboard.writeText(groupMsg);
                          alert('WhatsApp Message & Link copied to clipboard!');
                        }}
                      >
                        📋 Copy Text
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostGeneratorModal;
