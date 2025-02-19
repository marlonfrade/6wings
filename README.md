# 6Wings Project

A modern Next.js 14 application built with TypeScript, focusing on high performance and developer experience.

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Code Quality:** ESLint, Prettier
- **Development Environment:** Node.js 18+ recommended

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/6wings.git
cd 6wings
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory and add necessary environment variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
6wings/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable components
│   │   └── assistant-ui/ # Assistant UI components
│   ├── lib/             # Utility functions and shared logic
│   ├── styles/          # Global styles and Tailwind configurations
│   └── types/           # TypeScript type definitions
├── public/              # Static files
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## 📚 Code Conventions

- Use functional components with TypeScript
- Follow the ESLint and Prettier configurations
- Implement proper type definitions for all components and functions
- Use meaningful component and variable names
- Write comments for complex logic
- Create reusable components when possible

## 🚀 Deployment

The project is configured for deployment on Vercel. To deploy:

1. Push your changes to the main branch
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your application

For manual deployment:

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email [support@6wings.com](mailto:support@6wings.com) or join our Slack channel.

## 🔄 Updates

Keep your dependencies up to date:

```bash
npm update
# or
yarn upgrade
# or
pnpm update
```

## 🔐 Security

Report security vulnerabilities to [security@6wings.com](mailto:security@6wings.com).

---

Built with ❤️ by the 6Wings Team
