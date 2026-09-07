# AdVibe AI Studio

Create a modern, high-converting AI SaaS platform called "AdVibe AI" - an AI-powered ad copy & growth creative generator for marketing teams, media buyers, and creators.

Design & Aesthetics:

- Visual Theme: Premium dark mode (slate-950 background) with vibrant violet/indigo/cyan glowing gradients, subtle borders (border-white/10), backdrop-blur glassmorphic cards, and clean typography.

- Assets: Include beautiful high-resolution Unsplash imagery for creator avatars and product mockups. Use Lucide-react icons throughout.

- Components: Use shadcn/ui components (tabs, dialogs, badges, buttons, tooltips, slider, switch).

Application Structure & Key Pages:

1. Landing Page:

   - Navigation: Logo with gradient glow, navigation links (Features, Funnel Demo, Pricing), "Launch App" CTA button.

   - Hero Section: High-impact headline ("Turn Ideas into High-Converting Ads in Seconds"), dynamic badge ("⚡ Powered by GPT-4o & Claude 3.5"), interactive interactive live preview widget, and social proof metrics (e.g. "4.2x ROAS boost", "50k+ ads generated").

   - Feature Grid: 4 feature cards with icons (Multi-Platform Ad Gen, Viral Hook Finder, Audience Targeting, A/B Variant Scorer).

   - Interactive Pricing Table with Free vs Pro monthly/yearly toggle.

2. Onboarding Funnel (Interactive Step-by-Step Quiz):

   - Step 1: "What is your primary goal?" (Options: Scale E-commerce, Grow SaaS, TikTok Shop, Agency Client Work with visual cards).

   - Step 2: "Select target advertising channels" (TikTok, Meta/Instagram, Google Search, YouTube Shorts).

   - Step 3: "Generating your custom growth blueprint..." (Animated progress bar with AI check steps, culminating in a personalized dashboard preview).

3. Main App Dashboard:

   - Header with user profile, credit balance badge (e.g. "150 / 200 Credits"), and new campaign button.

   - Left Sidebar / Navigation: "Ad Generator", "Saved Library", "Analytics", "Settings".

   - Ad Generator Tool:

     * Inputs: Product Name, Product Description, Target Audience, Tone of Voice (Viral, Urgency, Storytelling, Professional), Platform selector.

     * "Generate Campaign" button with loading state animation.

     * Output Section: Interactive generated ad cards with Hook, Body Copy, Call to Action, estimated CTR score, Copy button, and "Save to Library" star action.

   - Analytics View: Clean charts/metrics displaying Ad Performance, Generated Count, and Conversion Rate estimates.

Ensure full responsiveness for mobile and desktop, smooth transitions, and mock data for initial generation so it works right out of the box.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6606ec7a-94ad-4fad-ac7d-f6c70ed29d49).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
