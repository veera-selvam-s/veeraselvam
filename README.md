# React Developer Portfolio

A modern, futuristic portfolio website for React developers built with Next.js, React Three Fiber, and Framer Motion.

## Features

- 3D animations and interactive elements
- Responsive design for all devices
- Contact form with email functionality
- Project showcase with hover effects
- Skills visualization
- Smooth scroll animations
- Dark theme with neon accents

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
\`\`\`
RESEND_API_KEY=your_resend_api_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Email Configuration

### Development/Testing
For development and testing, the contact form uses Resend's testing email address (`delivered@resend.dev`). Emails sent during development will be delivered to this address.

### Production
For production, update the recipient email in `app/actions.ts`:

\`\`\`typescript
// Change this line in app/actions.ts
to: ["your-verified-email@yourdomain.com"], // Replace with your verified email
\`\`\`

**Important:** For production use, you need to:
1. Verify your domain with Resend (recommended)
2. Or verify your email address with Resend
3. Update the "from" address to use your verified domain

See [Resend's documentation](https://resend.com/docs/dashboard/domains/introduction) for more details on domain verification.

## Customization

### Personal Information
- Update your name in the `components/hero.tsx` file
- Update your bio and experience in the `components/about.tsx` file
- Update your skills in the `components/skills.tsx` file
- Update your projects in the `components/projects.tsx` file
- Update your contact information in the `components/contact.tsx` file

### Styling
- Customize colors in the `tailwind.config.ts` file
- Modify animations in the respective component files

## Deployment

This portfolio can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fportfolio)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
