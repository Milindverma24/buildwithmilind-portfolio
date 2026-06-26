# ✨ BuildWithMilind — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?style=flat-square&logo=framer)](https://www.framer.com/motion/)

A bespoke, high-performance personal portfolio website for **Milind Verma**. This is a custom-engineered experience featuring dynamic 3D elements, hardware-accelerated animations, live API integrations, and an AI chat assistant.

> 🌐 **Live site:** [milindverma24.github.io](https://milindverma24.github.io)

---

## 🌟 Key Features

*   **🕹️ 3D Scroll-Interactive Project Cube:** A stunning, 3D rectangular prism built using CSS 3D transforms and GSAP ScrollTrigger. The cube rotates dynamically on scroll to present featured projects without lagging.
*   **🤖 Integrated AI Assistant:** A built-in chat assistant capable of answering questions about Milind's skills, experience, and projects. Powered by an API router with cascading model fallbacks (Anthropic ➔ Gemini ➔ OpenAI) or a high-fidelity local simulation if no keys are provided.
*   **🖱️ Custom Cursor System:** A physics-based, hardware-accelerated cursor element that reacts dynamically to hover states and custom data attributes, running outside of standard React render cycles to maintain 120 FPS.
*   **📊 Live GitHub Activity:** Fetches real-time contribution grids, repository stats, and commit event timelines using Next.js route handlers.
*   **📨 Contact Form & Resend Integration:** A polished contact form utilizing the Resend API to forward user messages directly to Milind's inbox.
*   **🎨 Premium Dark Aesthetic:** Crafted using harmonious HSL color spaces, fine grid backgrounds, glassmorphism, and radial glowing ambient orbs.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org) (App Router, Turbopack, React Compiler) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) + Vanilla CSS |
| **Animations** | [GSAP](https://gsap.com) (ScrollTrigger) & [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Integration** | [Resend API](https://resend.com) (Email Delivery) |
| **Type-Safety** | [TypeScript](https://www.typescriptlang.org) |

---

## 📂 Project Structure

```text
├── public/                 # Static assets (images, logos, PDFs)
│   ├── certificates/       # Certifications
│   ├── projects/           # Project preview images
│   └── resume/             # Downloadable resume files
├── src/
│   ├── app/                # Next.js App Router (pages & API routes)
│   │   ├── api/            # Route handlers (chat, contact, GitHub)
│   │   ├── globals.css     # Global stylesheets and fonts
│   │   └── page.tsx        # Homepage entrypoint
│   ├── components/         # Reusable interactive components
│   │   ├── AIAssistant.tsx # Chat interface component
│   │   ├── Navbar.tsx      # Responsive elastic navbar
│   │   ├── Projects.tsx    # 3D project cube section
│   │   └── Credentials.tsx # Resume download and cert list
│   └── lib/                # Shared utilities
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Milindverma24/buildwithmilind-portfolio.git TheCybersage
cd TheCybersage
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory by copying the example template:

```bash
cp .env.example .env
```

Fill in the following variables:

```ini
# AI Assistant (Optional - cascades in order or falls back to simulation)
ANTHROPIC_API_KEY=your_anthropic_key
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# Contact Form
RESEND_API_KEY=your_resend_api_key

# GitHub Activity Token (Optional - increases rate limit)
GITHUB_TOKEN=your_github_personal_access_token
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 📜 Intellectual Property & License

The code logic in this project is licensed under the **MIT License** (see [LICENSE](./LICENSE)). 

### Usage Restrictions
*   **What you CAN do:** Study the source code, extract animation ideas (like the 3D scroll cube or cursor physics), and build similar features for your own original work.
*   **What you CANNOT do:** Copy or clone the visual design, logo, layouts, and style assets directly to represent them as your own portfolio site.

---

© 2026 Milind Verma · [milindverma24.github.io](https://milindverma24.github.io)
