# 6Wings Project

A modern Next.js 14 e-commerce application built with TypeScript, focusing on high performance and developer experience.

## UI Figma Reference

[Figma Reference](https://www.figma.com/design/Cqox8KI6DBIfiGX90KP5aV/6Wings?node-id=0-1&t=tibnYzcllUuTji0j-1)

## Developing Tasks:

### Leônidas

---

- 6Wings Club Page [Livelo Club Reference UI](https://www.livelo.com.br/clube) [UI content for Clubs](/drive-content/6wings-clube-pontos.docx)
- 6Wings Buy Points Page [Livelo Points UI Reference](https://www.livelo.com.br/compra-de-pontos/produto/LIVCompraDePontos?skuId=LIVSKUCompraDePontos) [UI content for points](/drive-content/6wings-points-content.docx)

### Marlon

---

- Product card displays points (R$) in the frontend
- Add percentage markup to product value
- Tax calculation (backend development) based on points value
- Payment gateway for purchasing points or 6wings club membership (recurring credit card)
- Partner-type user can create in more than one category or subcategory
- User can use a referral code (link or typed) when registering
- Validate CPF/email (magic link or OTP code)/phone number (validation)
- User can register their delivery address
- Verify coupon and shipping method at checkout
- Create a websocket (Node) to update order status with the backend
- Add discount to user purchase history
- Sales history for the application
- Dashboard logs
- Improve bank data structure
- Refer friends via email
- Design notification structure with Lucas (travel components)
- React-query and cache in backend for product search
- Route for purchasing individual points
- Improve/Create travel search response (backend)
- Improve offers structure
- Define how partners earn from sales
- Create sales history for partners
- Verify and fix Fetchsales route by admin
- Create product by selecting user category and subcategory
- Internationalization of created products
- Sale of internationalized products (delivery)
- User ability to withdraw money using points (idea)
- Generate sales only after partner withdrawal
- If user has points, pay with points, otherwise credit card or PIX
- Milestone at 60 reais
- International travel experience
- Credit and debit from Afro Bank points (how to integrate banks)
- Block when club payment is due
- Commercial -> PIX up-sell
- Accumulate with PIX
- Rodrigo will be the ecommerce admin and will manage it
- One person will manually add products
- Link for referral code in pre-launch
- Multiplier for partner and end customer (pts)
- Product delivery (value + format) under partner responsibility (analyze)
- Create tax and delivery method information for smaller partners
- Integrate API for larger clients
- Accessibility AICAN tablets/wheelchair

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/docs)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://v2.tailwindcss.com/docs)
- **Query Client:** [React Tanstack Query](https://tanstack.com/query/v5/docs/framework/react/quick-start)
- **Code Quality:** ESLint, Prettier
- **Animations:** [Motion](https://motion-primitives.com/)
- **UI Components:** [Shadcn](https://ui.shadcn.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/marlonfrade/6wings.git
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
NEXT_PUBLIC_API_URL=http://example.com/api
NEXT_PUBLIC_LOGIN_ENDPOINT=/login
AUTH_SECRET=seu_secret_aqui
AUTH_URL=http://localhost:3000
API_URL=http://endereço-da-api.com.br/api
OPENAI_API_KEY=sua-chave-da-api-openai

# Assistant UI Configuration
NEXT_PUBLIC_ASSISTANT_BASE_URL="https://cloud.assistant-ui.com"
NEXT_PUBLIC_ASSISTANT_API_URL=""
NEXT_PUBLIC_ASSISTANT_API_KEY=""
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
│   ├── app/
│   │   └── [locale]/             # internationalization
│   │       ├── (auth)/           # Authentication related pages
│   │       └── layout.tsx        # Root layout
│   │       └── page.tsx          # Page Home
│   │   └── api/                  # api configuration
│   │       ├── airports/         # airports data for travel search
│   │       └── auth              # authentication routes
│   │       └── categories        # categories routes
│   │       └── chat              # 6wings bot chat routes
│   │       └── locations         # city's and states routes
│   │       └── offers            # product offers routes
│   │       └── products          # products routes
│   │       └── subcategories     # subcategories routes
│   │   ├── components/
│   │   │   ├── ui/                        # UI components (buttons, inputs, etc from shadcn)
│   │   │   │   └── magicui/               # Magic UI components
│   │   │   │   └── motion-primitives/     # Animated Components from motion
│   │   │   ├── typography/                # Custom Component to match 6wings typography design
│   │   │   ├── button/                    # Custom button to match 6wings design
│   │   │   └── carousel                   # Hero Banner Carousel for 6wings Partners
│   │   ├── lib/
│   │   │   ├── http/                # API configuration, fetch wrappers, and request handlers
│   │   │   ├── constants/           # Application constants, enums, and configuration values
│   │   │   ├── validations/         # Schema validations using Zod for forms and API responses
│   │   │   ├── formatters.ts        # Utility functions for formatting data (currency, dates, etc.)
│   │   │   └── utils.ts             # General utility functions and helpers
│   │   ├── providers/
│   │   │   └── authProvider         # Authentication context and user management
│   │   │   └── cartProvider         # Shopping cart state and operations
│   │   │   └── chatProvider         # Chat interface and messaging functionality
│   │   │   └── drawerProvider      # Drawer/sidebar UI state management
│   │   │   └── nextIntlProvider    # Internationalization and translations
│   │   │   └── queryProvider       # React Query configuration for data fetching
│   │   │   └── sessionProvider     # User session handling and persistence
│   │   │   └── toastProvider       # Toast notifications and alerts
│   │   └── types/                  # Global TypeScript interfaces, types, and type declarations
│   │   └── hooks/                  # Custom React hooks for shared logic and state management
│   │   └── services/              # API services, external integrations, and business logic
│   │   └── i18n/                  # Internationalization configuration and translation files
│   │   └── data/                  # Static data, mock data, and data utilities
│   │   └── config/                # Application configuration files and environment variables
│   ├── public/                     # Static files and assets
│   ├── next.config.js             # Next.js configuration
│   ├── tailwind.config.ts         # Tailwind CSS configuration
│   └── tsconfig.json              # TypeScript configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server

## Scripts to run before Commit

- `npm run lint` - Run ESLint
- `npm run build` - Build production application

## 🧪 Testing (Soon)

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
- Camel Casing components

## 🚀 Deployment

The project is configured for deployment on Vercel. The deployment process follows:

1. Create a Pull Request with your changes
2. After code review and approval, merge the PR into main branch
3. Vercel will automatically detect the merge and deploy to production
4. Monitor the deployment status in Vercel dashboard

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email [support@6wings.com](mailto:support@6wings.com) or join our Discord channel.

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

Built with ❤️ by the Monkeybranch
