# MockMeet - Google Meet Simulator

A realistic Google Meet simulator built with React, TypeScript, and Vite. Experience a fully functional meeting interface with participant management, controls, and real-time interactions.

## 🚀 Live Demo

Visit the live application: [https://dharaneesh20.github.io/Mock-Meet-Just-For-Fun/](https://dharaneesh20.github.io/Mock-Meet-Just-For-Fun/)

## ✨ Features

- 🎥 Realistic Google Meet interface
- 👥 Dynamic participant management
- 🎛️ Full meeting controls (mic, camera, screen share, etc.)
- 📱 Responsive design
- ⚡ Built with Vite for fast performance
- 🎨 Modern UI with Lucide React icons

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Lucide React** - Icons

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dharaneesh20/Mock-Meet-Just-For-Fun.git
   cd Mock-Meet-Just-For-Fun
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if using Gemini API)
   
   Create a `.env.local` file in the root directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🚀 Deployment to GitHub Pages

### Option 1: Manual Deployment

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Option 2: Automatic Deployment (GitHub Actions)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the main branch.

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Access your site**
   
   Your site will be available at: `https://dharaneesh20.github.io/Mock-Meet-Just-For-Fun/`

## ⚙️ Configuration

### Update Repository Name

The project is configured for the repository "Mock-Meet-Just-For-Fun". The `base` path in [vite.config.ts](vite.config.ts) is set to:

```typescript
export default defineConfig(({ mode }) => {
    return {
      base: '/Mock-Meet-Just-For-Fun/',
      // ...
    };
});
```

## 📁 Project Structure

```
Mock_Meet/
├── components/          # React components
│   ├── ConfigPanel.tsx
│   ├── Grid.tsx
│   ├── MeetControls.tsx
│   └── ParticipantTile.tsx
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👏 Acknowledgments

- Original AI Studio app: https://ai.studio/apps/drive/1Q2QVzzHby2lQ70hR9aij57Hxd4O3o47G
- Built with React and Vite
- Icons by Lucide React

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by [Dharaneesh20](https://github.com/Dharaneesh20)
