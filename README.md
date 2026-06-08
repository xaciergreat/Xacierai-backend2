# Xacierai Backend 2

A modern TypeScript-based backend service built with Express, Zod validation, and Drizzle ORM.

## 🏗️ Architecture

This is a monorepo project using pnpm workspaces:

- **`artifacts/api-server`** - Main Express.js API server
- **`lib/api-zod`** - Shared Zod validation schemas
- **`lib/integrations`** - External service integrations (OpenAI, etc.)
- **`scripts`** - Utility and build scripts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Update .env with your actual values
nano .env
```

### Development

```bash
# Start development server with hot reload
cd artifacts/api-server
pnpm run dev

# Type checking across the workspace
pnpm run typecheck

# Linting
pnpm run lint

# Format code
pnpm run format
```

### Build

```bash
# Build for production
cd artifacts/api-server
pnpm run build

# Start production server
pnpm run start
```

## 📋 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=sk-your-actual-key-here

# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/xacierai

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### Getting OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Create a new API key
3. Copy it to your `.env` file
4. **Never commit `.env` to git!**

## 🔐 Security

- Never commit `.env` or actual API keys to version control
- Use `.env.example` as a template for required variables
- For production deployments (Railway, etc.), use platform-provided secret management
- Regularly rotate API keys

## 📦 Dependencies

- **express** - Web framework
- **drizzle-orm** - Database ORM
- **zod** - Schema validation
- **pino** - Logging
- **cors** - CORS middleware
- **cookie-parser** - Cookie middleware

## 🔧 Scripts

```bash
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run start            # Start production server
pnpm run typecheck        # Run TypeScript type checking
pnpm run lint             # Run ESLint
pnpm run lint:fix         # Fix linting issues
pnpm run format           # Format code with Prettier
pnpm run format:check     # Check code formatting
```

## 🚢 Deployment

This project is configured for Railway deployment. See `railway.json` for deployment settings.

### Steps:
1. Push to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard
4. Deploy

### CI/CD Pipeline

GitHub Actions automatically:
- Runs TypeScript type checking
- Runs ESLint for code quality
- Builds the project
- Deploys to Railway (on `main` branch)

## 📝 Contributing

1. Create a feature branch
2. Make changes
3. Run `pnpm run lint:fix` to fix linting issues
4. Run `pnpm run format` to format code
5. Run `pnpm run typecheck` to verify types
6. Submit a pull request

## 📄 License

See LICENSE file for details.
