<!-- SectionID for "back to top" button -->

<a id="readme-top"></a>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://github.com/Ditz3n/Clarity">
    <img src="./public/images/logo_light.png" alt="Logo" width="127,5" height="48">
  </a>

<p align="center">
    A modern task management application with authentication, dark mode, and multi-language support
    <br />
    <a href="https://clarity-coral-mu.vercel.app/" target="_blank" alt="Logo">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Clarity is a modern task management application that combines clean design with powerful features. Built with Next.js and React, it provides users with a seamless experience for managing their daily tasks, complete with real-time updates, dark mode support, and internationalization.

### Built With

Clarity was built using the following tools:

* [![Next][Next.js]][Next-url] - React framework for production
* [![React][React]][React-url] - UI Component Library
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url] - Utility-first CSS
* [![MongoDB][MongoDB]][MongoDB-url] - NoSQL Database
* [![Prisma][Prisma]][Prisma-url] - Type-safe ORM
* [![Nodemailer][Nodemailer]][Nodemailer-url] - Email Service

### Features

🔒 **Security & Authentication**

- Email and password authentication
- JWT-based sessions
- Password reset functionality
- Email verification

🎨 **Modern UI/UX**

- Dark mode support
- Responsive design
- Smooth transitions
- Customizable task icons

🌐 **Internationalization**

- English and Danish language support
- Seamless language switching
- Persistent language preferences

📱 **Task Management**

- Create, Complete, Edit, and Delete tasks
- Add descriptions and icons
- Track completion progress

## Getting Started

### Prerequisites

Before you begin, ensure you have:

* Node.js (v18 or higher)
* npm
* MongoDB database/cluster

### Installation

1. Clone the repository

```bash
git clone https://github.com/Ditz3n/Clarity.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
DATABASE_URL="your_mongodb_uri"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
JWT_SECRET="your_jwt_secret"
EMAIL_USER="your_email"
EMAIL_PASS="your_email_app_password"
```

4. Run the development server

```bash
npm run dev
```

## License

© 2025 Clarity, by Mads Villadsen. All rights reserved.

## Contact

https://www.linkedin.com/in/ditz3n/

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Next.js]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[React]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[React-url]: https://react.dev/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[TailwindCSS]: https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Nodemailer]: https://img.shields.io/badge/Nodemailer-6DA55F?logo=node.js&logoColor=white
[Nodemailer-url]: https://www.nodemailer.com/
