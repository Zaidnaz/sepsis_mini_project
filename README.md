# Sepsis Sentinel - AI-Powered Early Detection

Sepsis Sentinel is a web application designed to assist healthcare professionals in the early detection and risk assessment of sepsis. By leveraging the power of generative AI, it analyzes patient vital signs to provide a preliminary risk level, a short-term prediction, and a detailed explanation of the contributing factors.

## ✨ Features

- **AI-Powered Risk Assessment**: Input patient vital signs (temperature, heart rate, blood pressure, etc.) to receive an instant sepsis risk assessment (Low, Medium, or High).
- **Predictive Analysis**: Get a short-term prediction on the likelihood of sepsis development.
- **Detailed Explanations**: The AI provides clear reasoning for its assessment and can generate a more detailed breakdown of how each vital sign contributes to the risk level.
- **Personalized Experience**: A welcoming landing page that greets the user by name.
- **Responsive Design**: A clean, intuitive, and responsive interface that works seamlessly on both desktop and mobile devices.
- **Light & Dark Modes**: Includes a theme toggle for user preference.
- **Built with Modern Tech**: Developed using the latest web technologies for a fast and reliable experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/Generative**: [Google's Gemini model via Genkit](https://firebase.google.com/docs/genkit)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Deploy to Netlify

You can deploy this application to your own Netlify account with a single click.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/firebase/studio-prototyping-apps)

### Step-by-Step Deployment

1.  **Fork the Repository**:
    If you haven't already, fork this repository to your GitHub account.

2.  **Create a Netlify Site**:
    - Go to your [Netlify dashboard](https://app.netlify.com/) and click "Add new site" -> "Import an existing project".
    - Connect it to your GitHub account and select the forked repository.

3.  **Configure Build Settings & Environment Variables**:
    - Netlify will automatically detect that this is a Next.js project and apply the correct build settings from the included `netlify.toml` file.
    - You will need to add your Gemini API key as an environment variable:
        - **Variable**: `GEMINI_API_KEY`
        - **Value**: `Your_Google_AI_Studio_API_Key`
    - You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Deploy**:
    - Click "Deploy site". Netlify will start the build process and your Sepsis Sentinel application will be live in a few minutes.

## 📄 License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.
