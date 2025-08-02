// Resume data constants
export const PERSONAL_INFO = {
  name: "Ravi Gangwar",
  title: "Software Engineer (Full-Stack, React native & DevOps)",
  location: "Kanpur, India",
  email: "ravigangwar7465@gmail.com",
  phone: "+91 9389968605",
  lastUpdated: "UPDATED AT 03 AUGUST 2025",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/ravi-gangwar/",
    github: "https://github.com/ravi-gangwar",
    leetcode: "https://leetcode.com/u/ravigangwar/",
    hackerrank: "https://www.hackerrank.com/profile/ravigangwar",
    instagram: "#",
    twitter: "https://x.com/ravigangwar_"
  }
};

export const SUMMARY = {
  title: "About",
  content: "Final-year B.Tech IT student with 1+ year experience at Wyvate building scalable apps (React Native, Next.js, Node.js) with AI/LLM integrations (OpenAI). Focused on full-stack development, DevOps (AWS/Docker), and performance optimization. Passionate about creating efficient, user-centric solutions and staying current with emerging technologies."
};

export const EXPERIENCE = [
  {
    company: "Wyvate",
    position: "Software Engineer",
    location: "Kanpur",
    duration: "May 2024 - now",
    links: [
      {
        name: "Play Store",
        link: "https://play.google.com/store/apps/details?id=com.wyvate.app"
      },
      {
        name: "App Store",
        link: "https://apps.apple.com/in/app/wyvate/id6749400000"
      },
      {
        name: "Website",
        link: "https://wyvate.com"
      }
    ],
    achievements: [
      "Developed Wyvate's customer platform from scratch for Android, iOS and Web, using React Native CLI and Next.js",
      "Optimized Node.js backend and PostgreSQL queries, reducing latency by 20%",
      "Integrated Google Maps APIs, geolocation, deep linking, and push/in-app/time-based notifications",
      "Engineered dynamic cart logic using Redux Toolkit for offers, add-ons, and pricing calculations",
      "Built AI-powered chatbot using OpenAI APIs and MCP servers for natural language interactions",
      "Implemented payments via PhonePe, HDFC SDKs, and real-time updates with WebSockets",
      "Used re-animated and React Query, Firestore, Redux Persist for caching and seamless data sync",
      "Integrated: vision camera, QR scanner, PDF generation, and voice input",
      "Followed clean architecture principles and tested using Jest and React Native Testing Library"
    ]
  }
];

export const EDUCATION = {
  institution: "Dr. A. P. J. Abdul Kalam University, Lucknow",
  degree: "B.Tech in Information Technology",
  duration: "Sept 2022 - May 2026",
  details: [
    "CGPA: 7.2/10 (Percentage: 75%)",
    "12th: 83% (2021)",
    "10th: 82.6% (2019)",
    "Areas of Interest: Data Structure & Algorithms, Operating System, DBMS, OOPs"
  ]
};

export const PROJECTS = [
  {
    name: "Wyvate Customer App",
    status: "Live",
    duration: "May 2024 - now",
    liveLinks: [
      {
        name: "Play Store",
        link: "https://play.google.com/store/apps/details?id=com.wyvate_native&pcampaignid=web_share"
      },
      {
        name: "App Store",
        link: "https://apps.apple.com/in/app/wyvate/id6740251470"
      }
    ],
    githubLinks: [],
    description: "Wyvate Customer App is a powerful mobile solution that extends the functionality of the Wyvate Customer Web platform to iOS and Android devices. Built with React Native and TypeScript, this app provides on-the-go access to customer management tools and real-time updates.",
    features: [
      "Mobile customer profiles with offline capabilities and push notifications",
      "Nearby vendors finder with location services and QR code scanning",
      "Order management with real-time delivery tracking and payment gateway integration",
      "Customer support system with real-time chat, email, and phone support",
      "Payment gateway integration with PhonePe and HDFC Bank for seamless transactions"
    ],
    techStack: "React Native, TypeScript, Redux Toolkit, React Navigation, AsyncStorage, Push Notifications, Socket.io, Payment Gateway"
  },
  {
    name: "Wyvate Customer Web",
    status: "Live",
    duration: "May 2024 - now",
    liveLinks: [
      {
        name: "Live Demo",
        link: "https://app.wyvate.com"
      }
    ],
    githubLinks: [],
    description: "Wyvate Customer Web is a comprehensive customer management platform designed to streamline business operations and enhance customer relationships. Built with Next.js and TypeScript, this web application provides powerful tools for customer data management, communication, and analytics.",
    features: [
      "Customer profile management with comprehensive data storage and organization",
      "Communication hub with integrated messaging and notification system",
      "Analytics dashboard with real-time insights and reporting tools",
      "Task management for creating and tracking customer-related tasks",
      "Document management with secure storage and sharing capabilities"
    ],
    techStack: "Next.js, TypeScript, Tailwind CSS, tRPC, Prisma, PostgreSQL, NextAuth.js, React Query"
  },
  {
    name: "Code Editor",
    status: "Live Demo",
    duration: "Jan 2025 - now",
    liveLinks: [
      {
        name: "Live Demo",
        link: "https://codeeditor.ravigangwar.cv"
      }
    ],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/code-editor-frontend"
      }
    ],
    description: "Code Editor is a secure and efficient online code execution platform that allows users to write, execute, and review code in multiple programming languages. The system provides a sandboxed execution environment with robust security measures to prevent vulnerabilities.",
    features: [
      "Multi-language support for Java, JavaScript, Python, and more with Monaco Editor integration",
      "Secure execution with Docker-based sandboxing and resource limits",
      "Real-time feedback with instant execution results, errors, and performance metrics",
      "Code history for saving and reviewing past code submissions",
      "Anti-cheating system with plagiarism detection and execution fingerprinting"
    ],
    techStack: "React.js, TypeScript, TailwindCSS, Node.js, Express.js, Docker, JWT Authentication, PostgreSQL, Monaco Editor"
  },
  {
    name: "GreenEarth v2",
    status: "Live",
    duration: "Oct 2023 - Feb 2024",
    liveLinks: [
      {
        name: "Live Demo",
        link: "https://greenearth2.vercel.app/"
      }
    ],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/greenEarth2.0"
      }
    ],
    description: "GreenEarth is an innovative web platform dedicated to promoting environmental sustainability and conscious living. This comprehensive solution combines e-commerce, education, and practical tools to help individuals and businesses reduce their environmental impact.",
    features: [
      "Eco-friendly marketplace connecting verified sustainable sellers with conscious consumers",
      "Real-time carbon footprint tracking with visualization and impact analytics",
      "Sustainability education with comprehensive resources and guides for green living",
      "Community platform for connecting with like-minded individuals and sharing practices",
      "Green business directory for discovering and supporting sustainable businesses"
    ],
    techStack: "Next.js, Tailwind CSS, Node.js, MongoDB, tRPC, Firebase, Payment Processing"
  },
  {
    name: "GreenEarth v1",
    status: "Live",
    duration: "Oct 2023 - Feb 2024",
    liveLinks: [
      {
        name: "Live Demo",
        link: "https://greenearth1.ravigangwar.cv/"
      }
    ],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/greenEarth"
      }
    ],
    description: "GreenEarth v1 is the initial implementation of our sustainable living platform, built using the MERN stack. This version established the core functionality and user experience that would later be enhanced in GreenEarth v2.",
    features: [
      "Eco-friendly marketplace for browsing and purchasing sustainable products from verified vendors",
      "Carbon footprint tracker for monitoring and visualizing environmental impact",
      "Sustainability education with comprehensive resources for green living",
      "Community platform for connecting with like-minded individuals and sharing practices",
      "Impact analytics for tracking environmental contributions over time"
    ],
    techStack: "MongoDB, Express.js, React.js, Node.js, JWT Authentication, Redux, Material UI, RESTful API, Stripe"
  },
  {
    name: "GuideX",
    status: "Live",
    duration: "Dec 2024 - Jan 2025",
    liveLinks: [],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/guidex"
      }
    ],
    description: "GuideX is a powerful Chrome extension designed to enhance browser navigation and automate repetitive tasks. Built with React.js and the Chrome Extension API, this tool helps users streamline their browsing experience and increase productivity.",
    features: [
      "Custom navigation shortcuts for creating and managing personalized keyboard shortcuts",
      "Action automation for recording and replaying browser actions to automate repetitive tasks",
      "Smart bookmarks with intelligent categorization and organization",
      "Tab management for efficiently organizing and switching between browser tabs",
      "User scripts for creating and running custom scripts to enhance website functionality"
    ],
    techStack: "React.js, JavaScript, Chrome Extension API, HTML/CSS, Chrome Storage API, Manifest V3"
  },
  {
    name: "WebWatch",
    status: "ONGOING",
    liveLinks: [],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/webwatch"
      }
    ],
    description: "WebWatch is a web application that allows users to monitor and analyze website performance. The system provides a dashboard with real-time metrics and analytics to help users track website performance and identify issues.",
    features: [
      "Website monitoring for monitoring multiple websites and tracking their performance",
      "Performance analytics for analyzing website performance metrics and identifying issues",
      "User authentication with secure login and rate limiting",
      "User management for managing user accounts and permissions",
      "Notification system for sending notifications about website performance"
    ],
    techStack: "Next.js, Tailwind CSS, Node.js, MongoDB, tRPC, Socket.io, Real-time Analytics"
  },
  {
    name: "URL Shortener",
    status: "Live",
    duration: "Nov 2024 - Dec 2024",
    liveLinks: [
      {
        name: "Live Demo",
        link: "https://url-shortener.ravigangwar.cv"
      }
    ],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/url-shortener"
      }
    ],
    description: "URL Shortener is a robust REST API that transforms long URLs into short, manageable links. Built with Node.js and Express.js, this backend service provides secure URL shortening with comprehensive analytics and rate limiting capabilities.",
    features: [
      "URL shortening with custom codes and comprehensive validation",
      "Click analytics for tracking and visualizing click statistics for each shortened URL",
      "Rate limiting with configurable limits per user/IP to prevent abuse",
      "Expiration logic for setting custom expiration dates for temporary links",
      "Error handling with robust error handling and meaningful HTTP status codes"
    ],
    techStack: "Node.js, Express.js, TypeScript, MongoDB, JWT Authentication, Rate Limiting, URL Validation, Analytics"
  },
  {
    name: "StackIt",
    status: "Live",
    duration: "Oct 2024 - Nov 2024",
    liveLinks: [
      {
        name: "Live Demo",
        link: "https://stackit.ravigangwar.cv"
      }
    ],
    githubLinks: [
      {
        name: "GitHub",
        link: "https://github.com/ravi-gangwar/stackit"
      }
    ],
    description: "StackIt is a collaborative Q&A forum platform designed for structured knowledge sharing and learning. Built with Next.js and TypeScript, this platform provides a modern interface for asking questions, providing answers, and engaging in meaningful discussions.",
    features: [
      "Rich text editor with advanced formatting, emojis, images, and hyperlinks",
      "Voting system for upvoting/downvoting questions and answers to highlight quality content",
      "Tagging system with multi-select tags for better content organization and discovery",
      "Real-time notifications for instant notifications for answers, comments, and mentions",
      "User roles with Guest, User, and Admin roles with appropriate permissions"
    ],
    techStack: "Next.js, TypeScript, Tailwind CSS, MongoDB, tRPC, NextAuth.js, Rich Text Editor, Socket.io"
  }
];

export const SKILLS = {
  languages: ["JavaScript", "TypeScript", "Java", "C", "SQL"],
  frontend: ["React Native", "Next.js", "React.js", "ReduxToolkit", "Tailwind CSS", "ShadCN", "Chakra UI"],
  backend: ["Node.js", "Express.js", "Jest", "MongoDB", "PostgreSQL", "PrismaORM", "TRPC", "Redis"],
  devops: ["GitHub", "Docker", "CI/CD", "PM2", "EC2 (AWS)", "S3 (AWS)", "CloudFront (AWS)", "Auto-scaling groups"],
  ai: ["Model Context Protocol (MCP servers)", "LLM APIs (GPT, GEMINI)"],
  softSkills: ["Team Collaboration", "Problem-Solving", "Agile Workflow", "Communication", "Adaptability"]
};

export const ACHIEVEMENTS = [
  {
    title: "Published Wyvate App",
    description: "Published Wyvate App on Play Store and App Store, achieving 500+ Downloads on Android and 100+ on iOS"
  },
  {
    title: "Certifications",
    items: ["iOS Development Certificate", "MERN Certification", "AgeBlazer Champion Salesforce Trailhead"]
  }
];

export const KEYWORDS = [
  // Technologies
  { word: "React Native", variant: "primary" },
  { word: "Next.js", variant: "primary" },
  { word: "Node.js", variant: "primary" },
  { word: "TypeScript", variant: "primary" },
  { word: "JavaScript", variant: "primary" },
  { word: "React.js", variant: "primary" },
  { word: "Redux Toolkit", variant: "primary" },
  { word: "Tailwind CSS", variant: "primary" },
  { word: "PostgreSQL", variant: "primary" },
  { word: "MongoDB", variant: "primary" },
  { word: "Docker", variant: "primary" },
  { word: "AWS", variant: "primary" },
  { word: "Firebase", variant: "primary" },
  { word: "Stripe", variant: "primary" },
  { word: "WebSockets", variant: "primary" },
  { word: "Jest", variant: "primary" },
  { word: "Express.js", variant: "primary" },
  { word: "Express", variant: "primary" },
  { word: "Redis Streams", variant: "primary" },
  { word: "Pusher", variant: "primary" },
  { word: "TailwindCSS", variant: "primary" },
  { word: "JWT", variant: "primary" },
  { word: "React Query", variant: "primary" },
  { word: "Firestore", variant: "primary" },
  { word: "React Native Testing Library", variant: "primary" },
  { word: "Java", variant: "primary" },
  { word: "Python", variant: "primary" },
  { word: "GCP", variant: "primary" },
  { word: "Cron jobs", variant: "primary" },
  { word: "tRPC", variant: "primary" },
  { word: "Prisma", variant: "primary" },
  { word: "NextAuth.js", variant: "primary" },
  { word: "Socket.io", variant: "primary" },
  { word: "Monaco Editor", variant: "primary" },
  { word: "Chrome Extension API", variant: "primary" },
  { word: "Manifest V3", variant: "primary" },
  { word: "AsyncStorage", variant: "primary" },
  { word: "Push Notifications", variant: "primary" },
  { word: "Payment Gateway", variant: "primary" },
  { word: "PhonePe", variant: "primary" },
  { word: "HDFC", variant: "primary" },
  { word: "QR Code", variant: "primary" },
  { word: "Location Services", variant: "primary" },
  { word: "Offline Support", variant: "primary" },
  { word: "Real-time", variant: "primary" },
  { word: "Material UI", variant: "primary" },
  { word: "RESTful API", variant: "primary" },
  { word: "Rate Limiting", variant: "primary" },
  { word: "URL Validation", variant: "primary" },
  { word: "Analytics", variant: "primary" },
  { word: "Rich Text Editor", variant: "primary" },
  { word: "Voting System", variant: "primary" },
  { word: "Tagging System", variant: "primary" },
  { word: "User Roles", variant: "primary" },
  { word: "Moderation Tools", variant: "primary" },
  { word: "Search & Filter", variant: "primary" },
  { word: "Answer Acceptance", variant: "primary" },
  { word: "Cross-Device Sync", variant: "primary" },
  { word: "User Scripts", variant: "primary" },
  { word: "Smart Bookmarks", variant: "primary" },
  { word: "Action Automation", variant: "primary" },
  { word: "Custom Navigation", variant: "primary" },
  { word: "Tab Management", variant: "primary" },
  { word: "Browser Automation", variant: "primary" },
  { word: "Productivity", variant: "primary" },
  { word: "Navigation", variant: "primary" },
  { word: "Chrome Extension", variant: "primary" },
  { word: "Chrome Storage API", variant: "primary" },
  { word: "HTML/CSS", variant: "primary" },
  
  // Skills & Concepts
  { word: "Full-Stack", variant: "secondary" },
  { word: "DevOps", variant: "secondary" },
  { word: "SaaS", variant: "secondary" },
  { word: "API", variant: "secondary" },
  { word: "REST", variant: "secondary" },
  { word: "GraphQL", variant: "secondary" },
  { word: "Microservices", variant: "secondary" },
  { word: "CI/CD", variant: "secondary" },
  { word: "Performance Optimization", variant: "secondary" },
  { word: "Scalable", variant: "secondary" },
  { word: "Distributed", variant: "secondary" },
  { word: "Resource limits", variant: "secondary" },
  { word: "Rate-limited", variant: "secondary" },
  { word: "Plagiarism detection", variant: "secondary" },
  { word: "Clean architecture", variant: "secondary" },
  { word: "Secure", variant: "secondary" },
  { word: "Customer Management", variant: "secondary" },
  { word: "Business Platform", variant: "secondary" },
  { word: "Mobile Solution", variant: "secondary" },
  { word: "Cross-platform", variant: "secondary" },
  { word: "Native Experience", variant: "secondary" },
  { word: "Offline Capabilities", variant: "secondary" },
  { word: "Seamless Synchronization", variant: "secondary" },
  { word: "Efficient State Management", variant: "secondary" },
  { word: "Robust Mobile Solution", variant: "secondary" },
  { word: "Environmental Sustainability", variant: "secondary" },
  { word: "Conscious Living", variant: "secondary" },
  { word: "Eco-friendly", variant: "secondary" },
  { word: "Carbon Footprint", variant: "secondary" },
  { word: "Green Technology", variant: "secondary" },
  { word: "Sustainable Living", variant: "secondary" },
  { word: "Environmental Consciousness", variant: "secondary" },
  { word: "Sandboxed Environment", variant: "secondary" },
  { word: "Code Execution", variant: "secondary" },
  { word: "Programming", variant: "secondary" },
  { word: "Security", variant: "secondary" },
  { word: "Sandbox", variant: "secondary" },
  { word: "Collaborative Learning", variant: "secondary" },
  { word: "Knowledge Sharing", variant: "secondary" },
  { word: "Structured Discussions", variant: "secondary" },
  { word: "Q&A Forum", variant: "secondary" },
  { word: "Content Moderation", variant: "secondary" },
  { word: "URL Shortening", variant: "secondary" },
  { word: "Click Tracking", variant: "secondary" },
  { word: "Expiration Logic", variant: "secondary" },
  { word: "Error Handling", variant: "secondary" },
  { word: "Website Monitoring", variant: "secondary" },
  { word: "Performance Analytics", variant: "secondary" },
  { word: "Real-time Metrics", variant: "secondary" },
  { word: "Notification System", variant: "secondary" },
  { word: "User Management", variant: "secondary" },
  { word: "Authentication", variant: "secondary" },
  { word: "Type Safety", variant: "secondary" },
  { word: "End-to-end", variant: "secondary" },
  { word: "Database Schema", variant: "secondary" },
  { word: "Role-based Access", variant: "secondary" },
  { word: "Enhanced Security", variant: "secondary" },
  { word: "Data Persistence", variant: "secondary" },
  { word: "Responsive UI", variant: "secondary" },
  { word: "Modern CSS", variant: "secondary" },
  { word: "Enhanced Security", variant: "secondary" },
  { word: "Improved Performance", variant: "secondary" },
  { word: "User-friendly Interface", variant: "secondary" },
  { word: "Browser Interactions", variant: "secondary" },
  { word: "Latest Technologies", variant: "secondary" },
  { word: "Improved Security", variant: "secondary" },
  { word: "Performance", variant: "secondary" },
  { word: "Eco-conscious Products", variant: "secondary" },
  { word: "Verified Vendors", variant: "secondary" },
  { word: "Environmental Impact", variant: "secondary" },
  { word: "Green Living", variant: "secondary" },
  { word: "Like-minded Individuals", variant: "secondary" },
  { word: "Sustainable Practices", variant: "secondary" },
  { word: "Environmental Contributions", variant: "secondary" },
  { word: "Sustainable Businesses", variant: "secondary" },
  { word: "Carbon Emissions", variant: "secondary" },
  { word: "Environmental Technology", variant: "secondary" },
  { word: "Environmental Data", variant: "secondary" },
  { word: "Profile Management", variant: "secondary" },
  { word: "Multiple Programming Languages", variant: "secondary" },
  { word: "Execution Feedback", variant: "secondary" },
  { word: "Coding Experience", variant: "secondary" },
  { word: "Execution Security", variant: "secondary" },
  { word: "Code Submissions", variant: "secondary" },
  { word: "Execution Fingerprinting", variant: "secondary" },
  { word: "Rate Limiting", variant: "secondary" },
  { word: "Structured Knowledge", variant: "secondary" },
  { word: "Meaningful Discussions", variant: "secondary" },
  { word: "Modern Interface", variant: "secondary" },
  { word: "Quality Content", variant: "secondary" },
  { word: "Content Organization", variant: "secondary" },
  { word: "Content Discovery", variant: "secondary" },
  { word: "Instant Notifications", variant: "secondary" },
  { word: "Appropriate Permissions", variant: "secondary" },
  { word: "Best Solution", variant: "secondary" },
  { word: "Sorting Options", variant: "secondary" },
  { word: "User Management", variant: "secondary" },
  { word: "Manageable Links", variant: "secondary" },
  { word: "Backend Service", variant: "secondary" },
  { word: "Comprehensive Analytics", variant: "secondary" },
  { word: "High Traffic", variant: "secondary" },
  { word: "Production Use", variant: "secondary" },
  { word: "Shareable Links", variant: "secondary" },
  { word: "Custom Codes", variant: "secondary" },
  { word: "Click Statistics", variant: "secondary" },
  { word: "Valid URLs", variant: "secondary" },
  { word: "Configurable Limits", variant: "secondary" },
  { word: "Temporary Links", variant: "secondary" },
  { word: "HTTP Status Codes", variant: "secondary" },
  { word: "Performance Monitoring", variant: "secondary" },
  { word: "Issue Identification", variant: "secondary" },
  { word: "Dashboard", variant: "secondary" },
  { word: "Multiple Websites", variant: "secondary" },
  { word: "Performance Metrics", variant: "secondary" },
  { word: "Monitoring Experience", variant: "secondary" },
  { word: "Execution Performance", variant: "secondary" },
  
  // AI & ML
  { word: "AI", variant: "accent" },
  { word: "LLM", variant: "accent" },
  { word: "OpenAI", variant: "accent" },
  { word: "Machine Learning", variant: "accent" },
  { word: "Chatbot", variant: "accent" },
  { word: "AI-powered", variant: "accent" },
  { word: "MCP servers", variant: "accent" },
  
  // Experience & Achievements
  { word: "1+ year", variant: "success" },
  { word: "500+ Downloads", variant: "success" },
  { word: "100+ Downloads", variant: "success" },
  { word: "20+ Reviews", variant: "success" },
  { word: "5+ Reviews", variant: "success" },
  { word: "20%", variant: "success" },
  { word: "reducing latency by 20%", variant: "success" },
  { word: "reducing latency by", variant: "success" },
  { word: "35%", variant: "success" },
  { word: "99.9%", variant: "success" },
  { word: "80%", variant: "success" },
  { word: "1000+", variant: "success" },
  { word: "10,000+", variant: "success" },
  { word: "500+ tons", variant: "success" },
  { word: "Live", variant: "success" },
  { word: "Published", variant: "success" },
  { word: "ONGOING", variant: "success" },
  { word: "Featured", variant: "success" },
  { word: "Champion", variant: "success" },
  { word: "Knight", variant: "success" },
  { word: "1200+", variant: "success" },
  { word: "3.5⭐", variant: "success" },
  { word: "6⭐", variant: "success" },
  { word: "5 Stars", variant: "success" },
  { word: "Top 5%", variant: "success" },
  { word: "Worldwide", variant: "success" },
  { word: "Annual Awards", variant: "success" },
  { word: "1200DaysOfCode+", variant: "success" },
  { word: "Knight Badge", variant: "success" },
  { word: "500+ problems", variant: "success" },
  { word: "6 Problem Solving", variant: "success" },
  
  // Education
  { word: "B.Tech", variant: "warning" },
  { word: "Information Technology", variant: "warning" },
  { word: "CGPA: 7.2", variant: "warning" },
  { word: "Data Structure & Algorithms", variant: "warning" },
  { word: "OOPs", variant: "warning" },
  { word: "Operating System", variant: "warning" },
  { word: "DBMS", variant: "warning" },
  { word: "Areas of Interest", variant: "warning" },
  { word: "Final-year", variant: "warning" },
  { word: "Student", variant: "warning" },
  { word: "University", variant: "warning" },
  { word: "Lucknow", variant: "warning" },
  { word: "Sept 2022", variant: "warning" },
  { word: "May 2026", variant: "warning" },
  { word: "Percentage: 75%", variant: "warning" },
  { word: "12th: 83%", variant: "warning" },
  { word: "10th: 82.6%", variant: "warning" },
  { word: "2019", variant: "warning" },
  { word: "2021", variant: "warning" }
];

export const PROBLEM_SOLVING = {
  title: "Problem Solving & DSA",
  platforms: [
    {
      name: "LeetCode",
      stats: "",
      details: "350+ problems solved"
    },
    {
      name: "HackerRank",
      stats: "5 Stars (C, Javascript, Problem Solving)",
      details: "500+ problems solved | 6⭐ Problem Solving"
    }
  ]
};