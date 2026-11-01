# 🌸 Aarav & Ananya — Aesthetic Indian Wedding Invitation & Guest Management Portal

A custom-designed, responsive Indian wedding invitation built with **React**, **TypeScript**, and **Tailwind CSS**. Designed from the ground up matching the aesthetic of luxury illustrated wedding invites and celebration reels, with pure CSS/SVG artwork and zero static screenshots.

---

## ✨ What Has Been Built

### 1. 🚪 3D Royal Palace Gate Opening Entrance
- Starts with an authentic **Royal Haveli double-door entrance** with carved wooden/sandstone textures, brass handles, toran garlands, and the sacred Lord Ganesha golden emblem (`॥ श्री गणेशाय नमः ॥`).
- Centered on the gate is the auspicious medallion displaying the couple's monogram, dates, and the personalized guest greeting (*"Invitation For: [Guest Name]"*).
- Clicking **"Tap to Open"** unlocks the gates:
  - Resonant golden temple bell chime plays.
  - Auspicious Indian background music (Shehnai & Bansuri) starts smoothly.
  - The double doors swing open in 3D perspective (`rotateY(-115deg)` / `rotateY(115deg)`).
  - A celebratory golden and rose petal confetti shower bursts.
  - Revealing the celebration inside!
- Includes a **Replay Gate** button in the header so guests can experience the entrance anytime.

---

### 2. 🎵 Auspicious Background Music Engine
- Built-in classical Indian wedding music synthesizer (Bansuri flute melodies in Raag Yaman, gentle Shehnai notes, and continuous Tanpura drone).
- Floating music pill at bottom-right with animated equalizer bars and play/pause toggle.

---

### 3. 📱 Themed Ceremony Cards (Inspired by the Reference Style, Built in Pure Code!)
Each ceremony has its own unique artistic aesthetic and custom animations:
- **Welcome & Cover**: Sandstone Jharokha archway, handcrafted golden Lord Ganesha emblem, flowing script names, and palace balcony silhouette.
- **12th Dec — Sangeet & Garba Night**:
  - Royal sapphire blue script title: *"Sangeet"*.
  - Ornamental divider: `——o——oo—— 🌸 ——oo——o——`.
  - Swaying hanging brass lanterns with warm candlelight glow, bougainvillea flowers, dholak drum, and crossed dandiya sticks illustration.
- **13th Dec AM — Santek & Grah Shanti Pooja**:
  - Forest emerald green script title: *"Santek Pooja"*.
  - Sacred Kalash with coconut and mango leaves, Vedic Havan Agni Kund with flickering holy flame, and brass diya oil lamps.
- **13th Dec PM — Haldi Utsav & Phoolon Ki Holi**:
  - Warm turmeric/amber gold script title: *"Haldi"*.
  - Hanging embroidered Rajasthani umbrellas with pom-poms, banana leaves, brass urli bowl filled with golden turmeric paste, and fresh marigold flower petal showers.
- **14th Dec — The Grand Vivah & Baraat Procession**:
  - Luminous glowing white script title: *"Wedding"*.
  - Deep twilight starry night sky with sparkling animated fireworks, grand white marble palace domes, glowing chandelier windows, royal procession elephants, and red carpet path.

---

### 4. 💌 Dynamic Personalized Guest Invitations (Crucial Requirement)
Every guest can receive a unique link that displays **only** the ceremonies they are invited to:
- **Sample Guest Links**:
  - **Friends & Youth (Sangeet/Garba + Wedding/Baraat only)**:
    `http://localhost:5173/?guest=Rohan+and+College+Gang&events=garba,wedding`
  - **Community Elders (Santek Pooja & Haldi only)**:
    `http://localhost:5173/?guest=Shree+Kantilalji+Parivar&events=santek,haldi`
  - **VIP Family (All 4 Ceremonies)**:
    `http://localhost:5173/?guest=Ramesh+Uncle+and+Family&events=garba,santek,haldi,wedding&vip=true`
  - **Colleagues (Wedding & Baraat only)**:
    `http://localhost:5173/?guest=Vikram+Malhotra+and+Family&events=wedding`
  - **Garba Night Only**:
    `http://localhost:5173/?guest=Dandiya+Enthusiasts&events=garba`
- Both the **Story Reel Viewer** and the **Ceremonies Schedule** dynamically adapt to show only the authorized events for that specific guest!

---

### 5. 📲 Host Control Panel & 1-Click WhatsApp Invite Generator
Click **"Invite Guest"** (top navigation or bottom-left pill):
- Type any guest's name.
- Select which ceremonies they are invited to using checkboxes:
  - `[x] Garba / Sangeet Night (12th Dec)`
  - `[ ] Santek Pooja (13th Dec AM)`
  - `[ ] Haldi Ceremony (13th Dec PM)`
  - `[x] Wedding & Baraat (14th Dec)`
- 1-Click **"Send via WhatsApp"** generates a pre-formatted invitation message with their personalized link ready to send!
- 1-Click **"Preview View"** lets the host immediately verify the guest's view.

---

### 6. 📍 Complete Guest Hospitality & Interactive Features
- **Ceremonies & Venues Guide**: Direct buttons for Google Maps directions, "Add to Google Calendar", and dress code color swatches.
- **Interactive RSVP**: Checkboxes automatically show *only* the events the guest is invited to, plus dietary preferences (Pure Veg, Jain, Swaminarayan, Vegan), with attendance confirmation sent via WhatsApp.
- **VIP Digital Pass**: Downloadable/printable digital invitation pass with QR verification code.
- **Wishes & Blessings Wall**: Family and friends can post blessings with live confetti celebrations.
- **Drifting Flower Petals**: Canvas particle system showering fresh pink rose and golden marigold petals.

---

## 🚀 Running the Project

```bash
cd royal-wedding-invite
npm run dev
# Running live at http://localhost:5173/
```
