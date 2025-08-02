// Resume data constants
export const PERSONAL_INFO = {
  name: "Ravi Gangwar",
  title: "Software Engineer & Full-Stack Developer",
  location: "Kanpur, India",
  email: "ravigangwar7465@gmail.com",
  phone: "+91 9389968605",
  lastUpdated: "UPDATED AT 27 JULY 2025",
  socialLinks: {
    portfolio: "#",
    linkedin: "#",
    github: "#",
    leetcode: "#",
    hackerrank: "#"
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
    type: "Live Play Store | Live App Store | Live Website",
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
    name: "GreenEarth Platform",
    status: "Live (V2) | Live (V1)",
    duration: "Oct 23 - Feb 24",
    links: "GitHub (V1) | GitHub (V2)",
    description: "Developed a SaaS-based platform for users to order and plant trees at preferred locations, enabling media-based growth tracking via pictures and videos.",
    techStack: "V1 - React.js, Node.js, Express.js, MongoDB, Redux.js, Stripe; V2 - Next.js, TRPC, Redux Toolkit, Stripe."
  },
  {
    name: "Online Code Execution Platform",
    status: "Live Demo",
    duration: "Jan 25 - now",
    links: "GitHub backend | frontend",
    description: "Built a secure, scalable SaaS platform to run Java, JavaScript, and Python code.",
    features: [
      "Integrated Docker-based sandboxing with resource limits, file isolation, and infinite loop protection",
      "Implemented JWT authentication, rate-limited APIs, and Node.js + Express backend",
      "Stored code, outputs, and performance stats, with basic plagiarism detection"
    ],
    techStack: "React.js, TailwindCSS, Node.js, Express, Docker, PostgreSQL, AWS(EC2) / GCP(VM)"
  },
  {
    name: "WebWatch",
    status: "ONGOING",
    links: "GitHub",
    description: "Built a real-time website monitoring tool to track uptime and latency.",
    features: [
      "Used a centralized Redis Streams queue with distributed workers across regions for scalable health checks",
      "Scheduled checks every 3 minutes, results stored in PostgreSQL"
    ],
    techStack: "React.js, Node.js, Express, Redis Streams, Pusher, PostgreSQL, TailwindCSS, Cron jobs"
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

export const PROBLEM_SOLVING = {
  title: "Problem Solving & DSA",
  platforms: [
    {
      name: "LeetCode",
      stats: "1879+ (Top 5% Worldwide)",
      details: "Knight | 1200DaysOfCode+ | Annual Awards 2022/2023 | 1200+ problems solved | 3.5⭐ | Knight Badge"
    },
    {
      name: "HackerRank",
      stats: "5 Stars (C, Javascript, Problem Solving)",
      details: "500+ problems solved | 6⭐ Problem Solving"
    }
  ]
};