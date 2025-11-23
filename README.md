# 📜 Scripty

> Create beautiful web apps with exemplified lessons and interactive JavaScript playgrounds

Practice-oriented educational platform for everyone who wants to learn JavaScript & WebDev.

[![Live Website](https://img.shields.io/badge/🌐_Live-scripty.by.nikdelv.in-success)](https://scripty.by.nikdelv.in)
[![App](https://img.shields.io/badge/🚀_App-scripty.app.nikdelv.in-primary)](https://scripty.app.nikdelv.in)
[![GitHub](https://img.shields.io/badge/GitHub-nikdelvin/scripty-blue)](https://github.com/nikdelvin/scripty)

## 🌟 Overview

Scripty is an innovative educational platform that combines:

- 📚 **Practice-oriented lessons** on JavaScript, Web Frameworks, and dev tools
- 🎮 **Interactive coding playground** for testing your skills
- 🗺️ **Tailored roadmaps** to guide you from intern to senior developer
- 👥 **Community features** to connect with fellow learners

## ✨ Features

### Deep Dive into Web Development

Master the fundamentals and beyond:

- **JavaScript Language**: More than 100 practice-oriented lessons covering JS, popular Web Frameworks, libraries, and dev tools
- **Framework Exploration**: 10 example projects that explain React, Next.JS, Astro.JS, Svelte, Vue.JS, Nuxt.JS & vanilla JavaScript bit by bit
- **DevOps Tools**: Deep dive tutorials into command line tools and CI/CD deployment with Git, Docker, and Jenkins

### Interactive Learning Experience

Learn by doing:

- **Coding Playground**: Feature-rich coding playground built especially to test your skills in the most popular code practices
- **Personalized Roadmaps**: Tailored roadmaps based on your goals, whether it's front-end, back-end, or full-stack development
- **Community Support**: Connect with fellow learners, ask questions, share your progress, and get help from experienced devs

## 🗺️ Project Roadmap

### Phase I: Knowledge Foundation (Current)

JavaScript fundamentals & front-end basics:

- Introduction to core concepts of JavaScript including variables, data types, operators, control flow, functions & objects
- Basics of HTML 5, CSS 3, and concepts of how to build basic web pages, understanding of DOM and how JavaScript interacts with it
- Tailwind CSS, Bootstrap 5, Sass & PostCSS tutorials to understand advanced methods of web pages and web applications stylization

### Phase II: Framework Exploration (Coming Soon)

Fundamentals of React & other frameworks:

- Basics of React web framework including components, props, state & JSX. Detailed tutorial for building a simple React application
- Introduction to other popular frameworks like Next.JS, Vue.JS, and Svelte. Understand their core concepts and build basic applications
- 1 code project to learn how to use only vanilla JavaScript to solidify your understanding of language without relying on frameworks

### Phase III: Server-Side Advantage

Introduction to back-end with Node.JS:

- Lessons to explore server-side JavaScript with Node.js and learn about APIs, databases, and building a simple backend application
- Basics of work with Postman, Insomnia, Swagger, and other tools for developing API documentation, back-end testing environment
- Utilization tools of Scripty coding playground to practice and refine your skills with challenges such as code katas and daily tasks

### Phase IV: Deployment & Community

CI/CD setup for your first full-stack project:

- 10 practice-oriented lessons to learn how to automate the building, testing, and deployment of your applications using CI/CD tools
- 2 code projects to learn how to combine your front-end and back-end knowledge to create and deploy a complete web application
- Chats integration to give users ability to join community forums, connect with other learners, ask questions & share their projects

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Modern static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **UI Library**: [TailyUI](https://tailyui.by.nikdelv.in) - Pure Tailwind CSS UI components
- **Language**: TypeScript - Type-safe JavaScript
- **Deployment**: Firebase Hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/nikdelvin/scripty.git
cd scripty

# Install dependencies
npm install
```

### Development

```bash
# Start development server with linting and formatting
npm run start

# Or just run Astro dev server
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

```bash
# Build for production (includes linting and type checking)
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```text
scripty/
├── public/                     # Static assets
│   └── media/                  # Media files (images, videos)
│       └── Farm/               # Farm-themed media assets
├── src/
│   ├── assets/                 # Project assets
│   ├── components/             # React/TypeScript components
│   │   ├── ASCIIRenderer/      # ASCII art renderer component
│   │   ├── OpenTopoData/       # Topographic map viewer component
│   │   ├── PixelGame/          # Pixel-based game component
│   │   └── shared/             # Shared UI components
│   │       ├── Button/         # Button component
│   │       ├── Input/          # Input component
│   │       └── Tablist/        # Tablist component
│   ├── content/                # Content collections
│   │   └── docs/               # Documentation content
│   │       ├── index.mdx       # Docs homepage
│   │       └── guides/         # Tutorial guides
│   ├── styles/                 # Global styles
│   │   └── global.css          # Global CSS
│   └── content.config.ts       # Content collection configuration
├── astro.config.mjs            # Astro configuration
├── eslint.config.mjs           # ESLint configuration
├── firebase.json               # Firebase hosting configuration
├── prettier.config.mjs         # Prettier configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Available Themes

The website supports multiple color themes:

- Default
- Primary
- Secondary
- Success
- Warning
- Error
- Ghost

Access different themes via URL: `https://scripty.by.nikdelv.in/[theme-name]`

## 📜 Available Scripts

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `npm run start`    | Formats, lints, and starts dev server                  |
| `npm run build`    | Formats, lints, type-checks, and builds for production |
| `npm run preview`  | Preview production build locally                       |
| `npm run eslint`   | Run ESLint on TypeScript and Astro files               |
| `npm run prettier` | Format all files with Prettier                         |

## 👨‍💻 Creator

Created by [Nikita Stadnik](https://nikdelv.in) - Passionate Fullstack Web Developer

- 📧 Email: [the@nikdelv.in](mailto:the@nikdelv.in)
- 🐙 GitHub: [@nikdelvin](https://github.com/nikdelvin)
- 💼 LinkedIn: [@nikdelvin](https://www.linkedin.com/in/nikdelvin)

## 🔗 Related Projects

- [TailyUI](https://tailyui.app.nikdelv.in) - Modern UI Library built with pure Tailwind CSS
- [Brodly](https://brodly.app.nikdelv.in) - High-secure anonymous live-streaming platform
- [Scientry](https://scientry.app.nikdelv.in) - Data management & visualization tool
- [Feelicy](https://feelicy.app.nikdelv.in) - Mind mapping and goal planning in game format of Garden Simulator
- [Neuroly](https://neuroly.app.nikdelv.in) - STT and voice synthesis AI chatbot

## 📄 License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/nikdelvin/scripty/issues).

---

**Start your coding journey today!** 📚 Visit [scripty.app.nikdelv.in](https://scripty.app.nikdelv.in)
