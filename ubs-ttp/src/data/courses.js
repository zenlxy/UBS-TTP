import course1image from '../assets/course1.jpg';

const courses = [
  {
    id: 1,
    title: "Intro to HTbML, CSS & JavaScript",
    description: "Learn how to build static websites using front-end technologies.",
    category: "Web Development",
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    image: course1image,
    sections: [
      {
        title: "HTML Foundations",
        lessons: [
          { type: "video", title: "Intro to HTML", content: "https://www.youtube.com/embed/dD2EISBDjWM" },
          { type: "quiz", title: "HTML Basics Quiz", content: { questions: [ { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language"], correctAnswer: 0 } ] } },
        ]
      },
      {
        title: "CSS Styling",
        lessons: [
          { type: "video", title: "CSS Selectors", content: "https://www.youtube.com/embed/yfoY53QXEnI" },
          { type: "tutorial", title: "Style a Webpage", content: { instructions: "Use CSS to style your HTML page with colors and fonts.", starterCode: "body { font-family: Arial; }" } },
        ]
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { type: "video", title: "JavaScript Syntax", content: "https://www.youtube.com/embed/W6NZfCO5SIk" },
          { type: "quiz", title: "JavaScript Quiz", content: { questions: [ { question: "Which keyword declares a variable?", options: ["var", "func"], correctAnswer: 0 } ] } },
        ]
      },
    ],
    milestones: []
  },
  {
    id: 2,
    title: "Full-Stack Web Project with Node.js",
    description: "Build and deploy a full-stack app with Express.js and MongoDB.",
    category: "Web Development",
    tags: ["web", "backend", "nodejs", "express", "mongodb"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "node-intro-video",
        type: "video",
        title: "Intro to Node.js and Express",
        content: "https://www.youtube.com/embed/TlB_eWDSMt4"
      },
      {
        id: "rest-api-tutorial",
        type: "tutorial",
        title: "Build a REST API with CRUD",
        content: {
          instructions: "Create an Express app with create, read, update, and delete routes.",
          starterCode: "const express = require('express');\nconst app = express();\n// Continue your app setup"
        }
      },
      {
        id: "mongo-quiz",
        type: "quiz",
        title: "MongoDB Basics & Routing",
        content: {
          questions: [
            {
              question: "What does CRUD stand for?",
              options: ["Create, Read, Update, Delete", "Code, Run, Upload, Debug", "Control, Render, Update, Deploy"],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "React Native Crash Course",
    description: "Learn to build cross-platform mobile apps using React Native.",
    category: "Mobile Apps",
    tags: ["mobile", "react native", "javascript"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "rn-intro-video",
        type: "video",
        title: "How React Native Works",
        content: "https://www.youtube.com/embed/Hf4MJH0jDb4"
      },
      {
        id: "rn-todo-tutorial",
        type: "tutorial",
        title: "Build a To-Do App",
        content: {
          instructions: "Create a React Native to-do app with input, list, and styling.",
          starterCode: "import React from 'react';\nimport { Text, View } from 'react-native';"
        }
      },
      {
        id: "rn-quiz",
        type: "quiz",
        title: "React Native Concepts",
        content: {
          questions: [
            {
              question: "What command starts a React Native project?",
              options: ["npx create-react-app", "npx react-native init", "npm run dev"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Intro to Flutter: Build Cross-Platform Mobile Apps",
    description: "Learn how to build beautiful and fast mobile apps using Flutter and Dart.",
    category: "Mobile Apps",
    tags: ["mobile", "flutter", "cross-platform"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "flutter-widgets-video",
        type: "video",
        title: "Flutter Widgets 101",
        content: "https://www.youtube.com/embed/x0uinJvhNxI"
      },
      {
        id: "flutter-counter-tutorial",
        type: "tutorial",
        title: "Build a Counter App",
        content: {
          instructions: "Follow this guide to create a Flutter app with a button to increment a number.",
          starterCode: "import 'package:flutter/material.dart';\nvoid main() => runApp(MyApp());"
        }
      },
      {
        id: "flutter-quiz",
        type: "quiz",
        title: "Dart and Flutter Basics",
        content: {
          questions: [
            {
              question: "What language does Flutter use?",
              options: ["Java", "Kotlin", "Dart"],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Data Science with Python",
    description: "Analyze data using Pandas, NumPy, and visualization libraries.",
    category: "Data Science",
    tags: ["data", "python", "pandas", "matplotlib"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "ds-python-video",
        type: "video",
        title: "Intro to Data Science with Python",
        content: "https://www.youtube.com/embed/r-uOLxNrNk8"
      },
      {
        id: "pandas-analysis-tutorial",
        type: "tutorial",
        title: "Analyze CSV with Pandas",
        content: {
          instructions: "Use Pandas to load and describe a CSV dataset.",
          starterCode: "import pandas as pd\ndf = pd.read_csv('data.csv')"
        }
      },
      {
        id: "pandas-quiz",
        type: "quiz",
        title: "Pandas Basics",
        content: {
          questions: [
            {
              question: "Which function loads a CSV in pandas?",
              options: ["pd.load_csv()", "pd.read_file()", "pd.read_csv()"],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Data Wrangling and Visualization",
    description: "Clean, transform, and visualize complex datasets using Python tools like Pandas and Seaborn.",
    category: "Data Science",
    tags: ["data cleaning", "visualization", "pandas", "seaborn"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "wrangling-video",
        type: "video",
        title: "Cleaning and Transforming Data",
        content: "https://www.youtube.com/embed/otmJ1PZPvnM"
      },
      {
        id: "seaborn-viz-tutorial",
        type: "tutorial",
        title: "Visualize Data with Seaborn",
        content: {
          instructions: "Use Seaborn to plot a bar chart of dataset values.",
          starterCode: "import seaborn as sns\nsns.barplot(x='category', y='value', data=df)"
        }
      },
      {
        id: "wrangling-quiz",
        type: "quiz",
        title: "Missing Data Handling",
        content: {
          questions: [
            {
              question: "What does `dropna()` do in Pandas?",
              options: ["Deletes the dataset", "Removes rows with missing values", "Adds NaNs"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: "Machine Learning Fundamentals",
    description: "Understand the basics of machine learning algorithms and models.",
    category: "AI/ML",
    tags: ["machine learning", "scikit-learn", "ai"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "ml-fundamentals-video",
        type: "video",
        title: "What is Machine Learning?",
        content: "https://www.youtube.com/embed/GwIo3gDZCVQ"
      },
      {
        id: "iris-tutorial",
        type: "tutorial",
        title: "Train a Model on Iris Dataset",
        content: {
          instructions: "Use scikit-learn to train a classifier on the Iris dataset.",
          starterCode: "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split"
        }
      },
      {
        id: "ml-quiz",
        type: "quiz",
        title: "ML Terminology",
        content: {
          questions: [
            {
              question: "Which is a supervised learning algorithm?",
              options: ["K-Means", "SVM", "PCA"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: "Deep Learning with TensorFlow",
    description: "Build and train deep neural networks using TensorFlow for image and text-based tasks.",
    category: "AI/ML",
    tags: ["deep learning", "tensorflow", "neural networks"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "tf-nn-video",
        type: "video",
        title: "Understanding Neural Networks",
        content: "https://www.youtube.com/embed/aircAruvnKk"
      },
      {
        id: "cnn-tutorial",
        type: "tutorial",
        title: "Image Classification with CNN",
        content: {
          instructions: "Build a simple CNN in TensorFlow using the Keras API.",
          starterCode: "import tensorflow as tf\nmodel = tf.keras.Sequential()"
        }
      },
      {
        id: "dl-quiz",
        type: "quiz",
        title: "Deep Learning Concepts",
        content: {
          questions: [
            {
              question: "What is an 'epoch' in training?",
              options: ["A type of neuron", "One full pass of the dataset", "Activation function"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 9,
    title: "Intro to DevOps",
    description: "Get started with CI/CD, Docker, and cloud deployment.",
    category: "DevOps",
    tags: ["devops", "docker", "ci/cd"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "devops-video",
        type: "video",
        title: "What is DevOps?",
        content: "https://www.youtube.com/embed/0yWAtQ6wYNM"
      },
      {
        id: "ci-cd-tutorial",
        type: "tutorial",
        title: "Set Up a CI/CD Pipeline with GitHub Actions",
        content: {
          instructions: "Create a pipeline to automate tests and deployment using GitHub Actions.",
          starterCode: "name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v2"
        }
      },
      {
        id: "devops-quiz",
        type: "quiz",
        title: "Docker and Pipeline Concepts",
        content: {
          questions: [
            {
              question: "What does CI/CD stand for?",
              options: ["Continuous Integration / Continuous Deployment", "Code Integration / Code Delivery", "Control Infrastructure / Continuous Development"],
              correctAnswer: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 10,
    title: "AWS for Beginners",
    description: "Learn the basics of Amazon Web Services and cloud hosting.",
    category: "DevOps",
    tags: ["aws", "cloud", "infrastructure"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "aws-overview-video",
        type: "video",
        title: "AWS Overview (EC2, S3, Lambda)",
        content: "https://www.youtube.com/embed/ulprqHHWlng"
      },
      {
        id: "aws-s3-tutorial",
        type: "tutorial",
        title: "Deploy a Static Site on S3",
        content: {
          instructions: "Upload your website files to AWS S3 and configure it for static hosting.",
          starterCode: "aws s3 mb s3://my-static-site\naws s3 sync ./site s3://my-static-site"
        }
      },
      {
        id: "aws-quiz",
        type: "quiz",
        title: "IAM, EC2 and Billing Basics",
        content: {
          questions: [
            {
              question: "What is AWS IAM used for?",
              options: ["Infrastructure as a Service", "User access and permissions management", "Billing and cost management"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 11,
    title: "Foundations of Cybersecurity",
    description: "Understand common vulnerabilities and how to protect against them.",
    category: "Cybersecurity",
    tags: ["security", "vulnerabilities", "threats"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "cyber-threats-video",
        type: "video",
        title: "Types of Cyber Threats",
        content: "https://www.youtube.com/embed/inWWhr5tnEA"
      },
      {
        id: "xss-tutorial",
        type: "tutorial",
        title: "Secure a Web Form (XSS Prevention)",
        content: {
          instructions: "Add input sanitization and output encoding to prevent Cross-site Scripting attacks.",
          starterCode: "const sanitizeHtml = require('sanitize-html');\nconst safeInput = sanitizeHtml(userInput);"
        }
      },
      {
        id: "cyber-quiz",
        type: "quiz",
        title: "Common Vulnerabilities (OWASP)",
        content: {
          questions: [
            {
              question: "Which of the following is NOT part of the OWASP Top 10?",
              options: ["Injection", "Broken Authentication", "Poor Marketing"],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 12,
    title: "Ethical Hacking 101",
    description: "Intro to penetration testing and white-hat hacking practices.",
    category: "Cybersecurity",
    tags: ["ethical hacking", "pentesting", "network security"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "pentest-video",
        type: "video",
        title: "Intro to Penetration Testing",
        content: "https://www.youtube.com/embed/aGQJ0PvU2Ko"
      },
      {
        id: "nmap-tutorial",
        type: "tutorial",
        title: "Use Nmap for Network Scanning",
        content: {
          instructions: "Perform basic network scanning using Nmap.",
          starterCode: "nmap -sP 192.168.1.0/24"
        }
      },
      {
        id: "ethical-hacking-quiz",
        type: "quiz",
        title: "White-Hat Ethics & Tools",
        content: {
          questions: [
            {
              question: "Which tool is commonly used for penetration testing?",
              options: ["Wireshark", "Nmap", "Photoshop"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 13,
    title: "UX Fundamentals",
    description: "Learn the basics of user experience design.",
    category: "UX/UI Design",
    tags: ["ux", "design thinking", "usability"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "ux-principles-video",
        type: "video",
        title: "Principles of User Experience",
        content: "https://www.youtube.com/embed/6Dh-RL__uN4"
      },
      {
        id: "user-journey-tutorial",
        type: "tutorial",
        title: "Create a User Journey Map",
        content: {
          instructions: "Map out the steps a user takes when interacting with your product.",
          starterCode: "Start by identifying user goals, touchpoints, and pain points."
        }
      },
      {
        id: "ux-quiz",
        type: "quiz",
        title: "Usability & Feedback Loops",
        content: {
          questions: [
            {
              question: "What is the purpose of usability testing?",
              options: ["To fix bugs", "To improve user experience", "To design logos"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 14,
    title: "UI Design with Figma",
    description: "Design beautiful interfaces using Figma.",
    category: "UX/UI Design",
    tags: ["ui", "figma", "visual design"],
    rating: 4.7,
    students: 3457,
    duration: 8,
    lessons: 24,
    milestones: [
      {
        id: "figma-intro-video",
        type: "video",
        title: "Figma Interface Walkthrough",
        content: "https://www.youtube.com/embed/FTFaQWZBqQ8"
      },
      {
        id: "figma-mockup-tutorial",
        type: "tutorial",
        title: "Design a Mobile App Mockup",
        content: {
          instructions: "Use Figma to create wireframes and high-fidelity mockups.",
          starterCode: "Start with frames and shapes to build your app layout."
        }
      },
      {
        id: "figma-quiz",
        type: "quiz",
        title: "Design Systems & Visual Hierarchy",
        content: {
          questions: [
            {
              question: "What is visual hierarchy used for?",
              options: ["Making content look messy", "Guiding user attention", "Adding colors randomly"],
              correctAnswer: 1
            }
          ]
        }
      }
    ]
  }
]  ;

export default courses;
  