# Complete Guide: Build, Deploy & Send Custom Invitations
### Wedding of Avi Desai & Nupur Mahale (12 – 14 December 2026)

---

## Table of Contents
1. [Overview & Project Structure](#1-overview--project-structure)
2. [Step 1: How to Build the Project](#2-step-1-how-to-build-the-project)
3. [Step 2: How to Deploy & Host Online (Free & Fast)](#3-step-2-how-to-deploy--host-online-free--fast)
   - [Method A: Netlify Drag-and-Drop (Easiest — 60 Seconds, No Code)](#method-a-netlify-drag-and-drop-easiest--60-seconds-no-code)
   - [Method B: Vercel (Recommended — Automatic HTTPS & Custom Domain)](#method-b-vercel-recommended--automatic-https--custom-domain)
   - [Method C: GitHub Pages](#method-c-github-pages)
4. [Step 3: How to Connect a Custom Domain (Optional)](#4-step-3-how-to-connect-a-custom-domain-optional)
5. [Step 4: How to Create & Send Custom Invitations to Guests](#5-step-4-how-to-create--send-custom-invitations-to-guests)
   - [Option A: Using the In-App Guest Link Generator (Easiest)](#option-a-using-the-in-app-guest-link-generator-easiest)
   - [Option B: Creating URLs Manually via Query Parameters](#option-b-creating-urls-manually-via-query-parameters)
6. [Ready-to-Send WhatsApp Message Templates](#6-ready-to-send-whatsapp-message-templates)

---

## 1. Overview & Project Structure

- **Framework:** React 19 + TypeScript + Vite + Tailwind CSS
- **Audio:** "Tune Kaha" by Prateek Kuhad (Official track)
- **Production Output Directory:** `dist/`
- **Location of Codebase:** `C:\Users\Avi\.gemini\antigravity\scratch\royal-wedding-invite`

---

## 2. Step 1: How to Build the Project

Before deploying, create the optimized production build.

1. Open PowerShell or Command Prompt.
2. Navigate to your project directory:
   ```powershell
   cd "C:\Users\Avi\.gemini\antigravity\scratch\royal-wedding-invite"
   ```
3. Run the build command:
   ```powershell
   npm run build
   ```
4. This compiles all TypeScript and Vite assets into the `dist/` folder.
5. To test the production build locally before hosting:
   ```powershell
   npm run preview
   ```
   Open `http://localhost:5173/` in your browser to verify everything works smoothly.

---

## 3. Step 2: How to Deploy & Host Online (Free & Fast)

Here are the 3 best and completely free hosting providers:

### Method A: Netlify Drag-and-Drop (Easiest — 60 Seconds, No Code)
> [!TIP]
> This requires **no GitHub account, no terminal commands, and no configuration**. Just drag and drop!

1. Build your project first (`npm run build`).
2. Open your file explorer and go to:
   `C:\Users\Avi\.gemini\antigravity\scratch\royal-wedding-invite`
   You will see a folder named **`dist`**.
3. Open your browser and go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
4. Sign up or log in (free forever).
5. Drag the entire **`dist`** folder into the upload box on the Netlify screen.
6. Within 10 seconds, Netlify will give you a live URL like:
   `https://avi-weds-nupur.netlify.app`
7. Click **Site configuration** > **Change site name** to set your custom link (e.g. `avi-and-nupur.netlify.app`).

---

### Method B: Vercel (Recommended — Automatic HTTPS & Custom Domain)
> [!NOTE]
> Vercel is extremely fast and provides seamless free hosting with global CDN and automated SSL certificates.

#### Option 1: Via Vercel CLI (Super Fast)
1. In your terminal:
   ```powershell
   cd "C:\Users\Avi\.gemini\antigravity\scratch\royal-wedding-invite"
   npx vercel
   ```
2. Follow the 4 quick prompts:
   - *Set up and deploy?* Press **Y**
   - *Which scope?* Select your account
   - *Link to existing project?* Press **N**
   - *Project name?* Enter `avi-nupur-wedding`
   - *In which directory is your code located?* Press **Enter** (for `./`)
3. When it finishes, run:
   ```powershell
   npx vercel --prod
   ```
4. Your website is instantly live at `https://avi-nupur-wedding.vercel.app`!

#### Option 2: Via GitHub + Vercel Web Dashboard
1. Push your code to a GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Wedding invitation for Avi & Nupur"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/avi-nupur-wedding.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)**, click **Add New Project**, and import your GitHub repository.
3. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Any future code updates you push to GitHub will automatically deploy live.

---

### Method C: GitHub Pages
1. Install the `gh-pages` package:
   ```powershell
   npm install --save-dev gh-pages
   ```
2. In `package.json`, add:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/royal-wedding-invite",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. In `vite.config.ts`, add the base path:
   ```typescript
   export default defineConfig({
     base: '/royal-wedding-invite/',
     // ...
   });
   ```
4. Run `npm run deploy`.

---

## 4. Step 3: How to Connect a Custom Domain (Optional)

If you buy a domain name like `www.aviwednupur.com` or `www.aviandnupur.in` from GoDaddy, Namecheap, or Hostinger:

1. In **Vercel** or **Netlify**:
   - Go to your Project > **Settings** > **Domains**.
   - Type your domain name (e.g., `aviwednupur.com`).
2. In your domain registrar (GoDaddy/Hostinger):
   - Add the DNS records shown by Vercel/Netlify:
     - **A Record:** `@` points to `76.76.21.21` (for Vercel)
     - **CNAME Record:** `www` points to `cname.vercel-dns.com`
3. Within 15–30 minutes, your website will be live at `https://www.aviwednupur.com`.

---

## 5. Step 4: How to Create & Send Custom Invitations to Guests

The website has a built-in guest personalization engine. You can send different links to different guests so that each guest only sees the events they are invited to.

### Option A: Using the In-App Guest Link Generator (Easiest)

1. Open your live website in any browser.
2. In the top navigation bar, click the button:
   **💌 Create Guest Links**
3. A modal opens with 4 steps:
   - **Step 1:** Enter the Guest or Family Name (e.g. `Ramesh Uncle & Family`).
   - **Step 2:** Choose a Quick Preset:
     - 🌟 **Full Wedding (All 4 Events)**
     - 💃 **Sangeet & Garba Only**
     - 🪷 **Santek Pooja Only**
     - 👑 **Baraat & Wedding Only**
     - 💛 **Santek + Haldi Only**
     - ✨ **Sangeet + Baraat Only**
   - **Step 3:** (Optional) Fine-tune events using the custom checkboxes.
   - **Step 4:** Click:
     - **💬 Share directly on WhatsApp** (Opens WhatsApp with a complete personalized message)
     - **Copy Link** (Copies the URL to paste anywhere)
     - **👁️ Test Guest View** (Opens a new tab to preview exactly what the guest will experience)

---

### Option B: Creating URLs Manually via Query Parameters

You can also construct URLs yourself using standard parameters:

#### The URL Formula:
```
https://YOUR-WEBSITE.com/?guest=GUEST_NAME&events=EVENT_LIST
```

#### Event Slugs / Aliases Available:
| Event Name | Parameter Value(s) |
| :--- | :--- |
| **All Celebrations** | `events=all` |
| **Garba & Sangeet** | `events=sangeet` or `events=garba` |
| **Santek Pooja** | `events=santek` or `events=pooja` |
| **Haldi Ceremony** | `events=haldi` |
| **Wedding & Baraat** | `events=barat` or `events=wedding` |

#### Real Examples:

1. **For Guests Invited to Everything:**
   ```
   https://avi-and-nupur.netlify.app/?guest=Sharma+Family&events=all
   ```
   *Result:* Shows all 4 ceremonies on the envelope, hero badge, and itinerary.

2. **For Friends Invited to Sangeet Only:**
   ```
   https://avi-and-nupur.netlify.app/?guest=College+Friends&events=sangeet
   ```
   *Result:* Displays "College Friends" on the envelope and shows *only* the Garba & Sangeet night.

3. **For Guests Invited to Santek Pooja Only:**
   ```
   https://avi-and-nupur.netlify.app/?guest=Shastri+Ji&events=santek
   ```
   *Result:* Displays "Shastri Ji" and shows *only* the Santek Pooja rituals and timing.

4. **For Guests Invited to Baraat & Wedding Only:**
   ```
   https://avi-and-nupur.netlify.app/?guest=Mehta+Family&events=barat
   ```
   *Result:* Shows *only* the Royal Baraat & Pheras at Taj Lake Palace.

5. **For Combination (e.g. Sangeet + Wedding):**
   ```
   https://avi-and-nupur.netlify.app/?guest=Priya+and+Rahul&events=sangeet,barat
   ```
   *Result:* Shows only the Garba night and the Baraat wedding ceremony.

---

## 6. Ready-to-Send WhatsApp Message Templates

### Template 1: For Full Wedding (All Events)
```text
॥ श्री गणेशाय नमः ॥

Dear [Guest Name],

With the divine blessings of Lord Ganesha, we cordially invite you and your family to celebrate the auspicious wedding ceremonies of 

✨ Avi Desai & Nupur Mahale ✨

📅 Dates: 12th – 14th December 2026
📍 Location: Udaipur & Surat

We have created a personalized digital invitation specially for you:
👉 [PASTE YOUR LINK HERE]

Please tap the wax seal on the envelope to open the invitation and enjoy the celebration song "Tune Kaha".

Warm Regards & Blessings,
Desai & Mahale Families
#AviKiNupur
```

---

### Template 2: For Sangeet & Garba Only
```text
॥ श्री गणेशाय नमः ॥

Dear [Guest Name],

We warmly invite you to join us for a vibrant, musical evening of Garba, Dandiya, and Sangeet celebrations for:

💃 Avi & Nupur's Sangeet Night 🕺

📅 Date: Saturday, 12th December 2026 | 07:00 PM Onwards
📍 Venue: Society Common Plot, Surat

Please open your personalized invitation card below:
👉 [PASTE YOUR SANGEET LINK HERE]

Looking forward to dancing the night away with you!

With Love,
Avi & Nupur
#AviKiNupur
```

---

### Template 3: For Baraat & Wedding Only
```text
॥ श्री गणेशाय नमः ॥

Dear [Guest Name],

We request the honor of your presence and blessings at the sacred wedding ceremony and royal Baraat of

👑 Avi Desai & Nupur Mahale 👑

📅 Date: Monday, 14th December 2026 | 05:30 PM Onwards
📍 Venue: Taj Lake Palace, Lake Pichola, Udaipur

Kindly click below to view your personalized royal invitation:
👉 [PASTE YOUR BARAAT LINK HERE]

We look forward to celebrating this milestone with your gracious presence.

Warm Regards,
Desai & Mahale Families
#AviKiNupur
```
