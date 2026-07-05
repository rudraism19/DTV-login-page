# 🌌 Digital Twin Verse for Students™

An immersive, full-stack Academic Digital Twin modeling engine and AI Mentor. Built with **React 18**, **TypeScript**, **Vite**, **Express**, and **Gemini 3.5**, wrapped in a futuristic visual identity.

---

## 🎨 Visual Philosophy & Theme
The application adopts a high-contrast **Cosmic Slate & Frosted Gold** aesthetic featuring:
- **Interactive WebGL Backdrop**: Generates real-time, responsive 3D perspective grids, floating sensor nodes, and data streams using custom compiled vertex & fragment shaders.
- **Glassmorphic Interfaces**: Uses custom-designed `glass-card` and `glass-input` backdrops with frosted boundaries, custom radial gold highlights, and svelte interactive transitions.
- **Typographic Pairings**: Merges geometric display headings (**Sora**) with tabular telemetry readouts (**JetBrains Mono**).

---

## 🚀 Core Features

### 1. Synaptic Credentials & Setup Profile
- **Adaptive Sign-In**: Sleek input forms with floating visual identifiers, custom checkbox states, and password viewability toggles.
- **Comprehensive Twin Register**: Custom enrollment form supporting:
  - Full Name & City
  - Email Address & Verified Contact Number
  - **Dynamic Roles Selection**: Special pathways tailored for *School Students*, *Undergraduates*, *Postgraduates*, *Parents*, *Career Counsellors*, or *Others*.
  - Passwords with dual validation.

### 2. The Synaptic Twin Hub
- **Interactive Skill Twin**: An interactive SVG radar chart mapping your live student parameters across five distinct axes: Coding, Analytical Problem Solving, Practical Application, Mathematical Fundamentals, and Collaborative Synergy.
- **Study Simulation Accelerator**: An interactive study duration slider allowing students to simulate cognitive learning blocks (from 1 to 12 hours) to earn experience points (XP), level up their credentials, and permanently improve their skill percentages.

### 3. Gemini-Powered AI Twin Brain
- **Full-Stack Chat Interface**: Safe server-side API proxy calling the **Gemini 3.5 Flash** model via the official `@google/genai` SDK. Keep your API key secured behind the proxy.
- **Context-Aware Recommendations**: System instructions dynamically feed your current digital twin parameters (field of study, active skills, level, hours) to synthesize custom academic advice.
- **Preset Prompt Chips**: One-click cognitive shortcuts for **Skills Gap Analysis**, **Weakest Skill Roadmaps**, and **Interactive Mock Quizzes**.

### 4. Simulation Lab & Academic Predictors
- **Grades Predictor**: A supplementary study hour simulation widget predicting final scores using weighted mathematics, problem-solving skills, and active learning variables.
- **Career Readiness Index**: A radial vector progress gauge measuring how well your active skill twin fits target careers (e.g. AI Research Scientist, Strategic Career Architect, or Future Tech Innovator).

### 5. Multi-Channel Data Integrations
- Connect and model actual external performance from **GitHub Profiles**, **LeetCode Solved Matrices**, and **Canvas LMS Portals** to feed real-time performance data straight into your twin model.

---

## 🛠️ Architecture & Tech Stack

### Client-Side (React SPA)
- **Framework**: React 18, Vite 6, TypeScript 5.
- **Styling**: Tailwind CSS (with native `@theme` configuration).
- **Icons**: Lucide-React.
- **Shader Pipeline**: Raw WebGL Context with animation frame handlers.

### Server-Side (Express Backend)
- **Host**: Node Express proxy on port `3000`.
- **SDK**: Modern `@google/genai` TypeScript client.
- **Vite Dev Server Integration**: Express dev-mode mounts Vite using `createViteServer` for hot-reloads, with a single bundled compilation (`esbuild` to CommonJS) in production.

---

## 📦 Local Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Your API Keys**:
   Create a local `.env` file in the root workspace (copy from `.env.example`):
   ```env
   GEMINI_API_KEY="YOUR_ACTUAL_API_KEY_HERE"
   ```

3. **Launch the Development Workspace**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to inspect your active twin.

4. **Production Build**:
   ```bash
   npm run build
   ```
   Runs the static frontend compiler and bundles `server.ts` into a standalone, optimized distribution in `dist/server.cjs`.
