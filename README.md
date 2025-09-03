# ALX Polly - Modern Polling Application

![ALX Polly](https://img.shields.io/badge/ALX-Polly-blue) ![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Supabase](https://img.shields.io/badge/Supabase-2.56.0-green) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-blue)

A modern, full-stack polling application built with Next.js, React, TypeScript, and Supabase. Create, share, and vote on polls with real-time updates and beautiful UI components.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login and registration system
- **Poll Creation**: Create polls with multiple options and custom titles
- **Real-time Voting**: Vote on polls with instant result updates
- **Poll Management**: Edit, delete, and manage your created polls
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Modern Stack**: Built with Next.js 15, React 19, and TypeScript
- **Database**: Supabase PostgreSQL with real-time subscriptions
- **UI Components**: Custom components built with Radix UI and TailwindCSS
- **Authentication**: Supabase Auth with secure session management
- **Testing**: Comprehensive test suite with Jest and React Testing Library

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.2 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 4.0 with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

### Backend & Database
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **API**: Next.js API routes with server actions
- **Authentication**: Supabase Auth with JWT

### Development & Testing
- **Testing**: Jest 30.1.3 + React Testing Library 16.3.0
- **Type Checking**: TypeScript with strict mode
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm

## 📁 Project Structure

```
alx-polly/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page and tests
│   │   ├── register/            # Registration page and tests
│   │   └── __tests__/           # Auth redirect tests
│   ├── polls/                   # Poll-related pages
│   │   ├── new/                 # Create poll page
│   │   ├── [pollId]/            # Individual poll view
│   │   ├── edit/[pollId]/       # Edit poll page
│   │   └── __tests__/           # Polls page tests
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── auth/                    # Authentication components
│   ├── polls/                   # Poll-related components
│   └── ui/                      # Base UI components (buttons, cards, etc.)
├── context/                     # React context providers
│   └── AuthContext.tsx          # Authentication context
├── lib/                         # Utility functions and configurations
│   ├── supabase.ts              # Supabase client and functions
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # Utility functions
│   └── schema.sql               # Database schema
├── public/                      # Static assets
├── __mocks__/                   # Jest mocks for testing
├── coverage/                    # Test coverage reports
├── jest.config.js               # Jest configuration
├── jest.setup.js                # Jest setup file
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database and authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Only1allan/alx-polly.git
   cd alx-polly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL commands from `lib/schema.sql` in your Supabase SQL editor
   - Configure Row Level Security (RLS) policies as needed

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### For Users

1. **Create an Account**
   - Visit the registration page
   - Enter your email and password
   - Verify your email (if email confirmation is enabled)

2. **Create a Poll**
   - Log in to your account
   - Navigate to "Create Poll"
   - Enter poll title and options
   - Share the poll with others

3. **Vote on Polls**
   - Browse available polls
   - Select your preferred option
   - View real-time results

4. **Manage Your Polls**
   - View all your created polls
   - Edit poll details
   - Delete polls you own

### For Developers

1. **Run Tests**
   ```bash
   npm test                    # Run all tests
   npm test -- --watch        # Run tests in watch mode
   npm test -- --coverage     # Run tests with coverage report
   ```

2. **Build for Production**
   ```bash
   npm run build              # Build the application
   npm start                  # Start production server
   ```

3. **Type Checking**
   ```bash
   npx tsc --noEmit           # Check TypeScript types
   ```

## 🧪 Testing

### Test Coverage
The project includes comprehensive testing for:
- **Component Rendering**: All major components have rendering tests
- **User Interactions**: Form submissions, button clicks, navigation
- **Authentication Flow**: Login, registration, and session management
- **Error Handling**: Invalid inputs and network failures

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth/login/__tests__/page.test.tsx
```

### Test Structure
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interactions and data flow
- **Mocked Dependencies**: Supabase, Next.js router, and external APIs

For detailed test coverage analysis, see [TEST_COVERAGE_ANALYSIS.md](./TEST_COVERAGE_ANALYSIS.md).

## 🏗️ Architecture

### Component Architecture
- **Page Components**: Handle routing and page-level logic
- **Feature Components**: Business logic components (auth, polls)
- **UI Components**: Reusable, generic components
- **Context Providers**: Global state management

### Data Flow
1. **Client**: User interacts with React components
2. **Context**: Authentication state managed globally
3. **API Layer**: Supabase client handles data operations
4. **Database**: PostgreSQL with real-time subscriptions
5. **Authentication**: Supabase Auth with JWT tokens

### State Management
- **Authentication**: React Context + Supabase Auth
- **Local State**: React useState and useReducer
- **Server State**: Supabase real-time subscriptions

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Email Configuration
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Database Schema
The application uses the following main tables:
- **polls**: Poll information (title, options, creator)
- **votes**: Individual vote records
- **users**: User profiles (managed by Supabase Auth)

See `lib/schema.sql` for complete schema definition.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards
- **TypeScript**: Use strict type checking
- **Testing**: Maintain test coverage above 80%
- **Comments**: Add JSDoc comments for functions and components
- **Formatting**: Use Prettier for consistent code formatting

### Pull Request Guidelines
- Include a clear description of changes
- Add tests for new features
- Update documentation as needed
- Ensure CI/CD checks pass

## 📊 Performance

### Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Efficient caching strategies for API calls
- **Bundle Analysis**: Regular bundle size monitoring

### Monitoring
- **Core Web Vitals**: Optimized for excellent user experience
- **Real User Monitoring**: Performance tracking in production
- **Error Tracking**: Comprehensive error logging and reporting

## 🔐 Security

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Row Level Security**: Database-level access control
- **Session Management**: Automatic session refresh and expiration
- **HTTPS Only**: Secure communication in production

### Data Protection
- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content sanitization
- **CSRF Protection**: Built-in Next.js CSRF protection

## 📈 Roadmap

### Short Term (Next 2-3 months)
- [ ] Real-time poll results
- [ ] Poll sharing and embed functionality
- [ ] Advanced poll analytics
- [ ] Mobile app (React Native)

### Medium Term (3-6 months)
- [ ] Poll templates and themes
- [ ] User profiles and dashboards
- [ ] API for third-party integrations
- [ ] Advanced voting options (ranked choice, etc.)

### Long Term (6+ months)
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Enterprise features and white-labeling
- [ ] AI-powered poll insights

## 📞 Support

### Documentation
- [Test Coverage Analysis](./TEST_COVERAGE_ANALYSIS.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

### Community
- **Issues**: [GitHub Issues](https://github.com/Only1allan/alx-polly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Only1allan/alx-polly/discussions)
- **Email**: support@alx-polly.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ALX Africa**: For the inspiration and learning opportunity
- **Vercel**: For the excellent Next.js framework
- **Supabase**: For the powerful backend-as-a-service platform
- **Radix UI**: For the accessible component primitives
- **TailwindCSS**: For the utility-first CSS framework

---

**Built with ❤️ by the ALX Polly Development Team**

**Last Updated**: September 2025  
**Version**: 1.0.0  
**Next.js**: 15.5.2
