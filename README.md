

# Safesphere FinAI

Your intelligent, AI-powered financial co-pilot.

Safesphere FinAI is a modern personal finance assistant designed to provide users with a seamless and insightful way to manage their money.  The application automates tedious tasks like expense tracking, generates personalized financial plans, and offers interactive, multi-modal ways for users to engage with their financial goals.

---

## ✨ Core Features

The application is designed with two distinct user roles: User and Admin, each with a tailored experience.

### For Users:

*   🤖 AI-Powered Receipt Scanning: Upload a photo of a receipt, and the Gemini multimodal AI automatically extracts the merchant, date, items, total, and assigns a spending category.
*   📊 Interactive Wellness Dashboard: A central hub providing an at-a-glance overview of your financial health, including total balance, income vs. expenses, and visual progress against monthly and category-based budgets.
*   🧠 AI Financial Goal Simulator: Describe a long-term financial goal (e.g., "buy a house in 5 years"), and Gemini Pro's advanced reasoning generates a detailed, step-by-step strategic plan.
*   🎥 AI Goal Visualizer (Video Generation): A unique motivational tool. Upload an image of your goal and a text prompt, and the Veo model generates a short, cinematic video to bring your aspiration to life.
*   💬 Conversational AI Co-Pilot: A chat interface for personalized financial advice. The AI is context-aware of your recent spending and can use Google Search to provide up-to-date information with source links. It also features a Text-to-Speech function.
*   🎙 Live Voice Assistant: Engage in a natural, real-time voice conversation with the AI for hands-free financial queries and assistance, powered by the low-latency Gemini Live API.
*   💰 Dynamic Budgeting: Easily set and edit spending budgets for various categories with clear visual feedback on your progress.

### For Admins:

*   👥 Centralized User Portal: A dedicated dashboard to view and manage all users on the platform.
*   📈 Detailed User Analytics: Select any user to view their profile details and see a chart of their financial plan creation activity over the last six months, offering key insights into user engagement.

---

## 🛠 Tech Stack & AI Models

This project is built with a modern frontend stack and deeply integrated with the Google Gemini API.

*   Frontend:
    *   React: For building the user interface.
    *   TypeScript: For type safety and improved developer experience.
    *   Tailwind CSS: For rapid, utility-first styling.

*   AI Models (via @google/genai):
    *   *gemini-2.5-flash:* Used for receipt parsing, the main Co-Pilot chat, and generating quick insights.
    *   *gemini-2.5-pro:* Powers the complex, long-form strategic thinking required for the Financial Goal Simulator.
    *   *veo-3.1-fast-generate-preview:* The engine behind the AI Goal Visualizer, generating video from text and image prompts.
    *   *gemini-2.5-flash-native-audio-preview-09-2025:* Enables the real-time, low-latency audio conversation for the Live Voice Assistant.
    *   *gemini-2.5-flash-preview-tts:* Provides the text-to-speech functionality in the Co-Pilot chat.
    *   Google Search Grounding: Integrated into the Co-Pilot chat to fetch real-time, verifiable information from the web.

---

## 🚀 Getting Started

The application is designed to run in a web-based development environment where the Gemini API key is securely managed.

1.  API Key: The application requires a Google Gemini API key, which is expected to be available as an environment variable process.env.API_KEY.
2.  Dependencies: All dependencies are loaded via an importmap in index.html, requiring no local installation.
3.  Running: Simply serve the index.html file, and the application will mount.

### 🔑 Demo Credentials

You can log in and test both application roles using the following credentials:

*   Admin Login:
    *   Username: admin
    *   Password: admin123
*   User Login:
    *   Username: user
    *   Password: user123

---

## 📂 Project Structure

The codebase is organized into logical directories to maintain clarity and scalability.


/
├── public/
├── src/
│   ├── components/      # Reusable React components (UI building blocks)
│   │   ├── common/      # Generic components like Button, Card, Icon
│   │   └── ...          # Page-specific and feature components
│   ├── data/            # Mock data for users, receipts, etc.
│   ├── hooks/           # Custom React hooks (e.g., useLiveAssistant)
│   ├── services/        # Modules for API calls (apiService, geminiService)
│   ├── utils/           # Helper functions (date, currency, file formatting)
│   ├── App.tsx          # Main application component, handles state management
│   ├── index.tsx        # Entry point for the React application
│   └── types.ts         # TypeScript type definitions
├── index.html           # The main HTML file
└── README.md            # You are here!


---

## 📄 License

This project is licensed under the MIT License.

View your app in AI Studio: https://ai.studio/apps/drive/1rSM-jJRzcWBVlxb5ystKMorEs2-g3KS4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
