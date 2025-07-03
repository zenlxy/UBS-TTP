const courses = [
  {
    id: 1,
    title: "Intro to HTML, CSS & JavaScript",
    description: "Learn how to build static websites using front-end technologies.",
    category: "Web Development",
    tags: ["web", "frontend", "html", "css", "javascript"],
    image: "course1.jpg",
    rating: "4.5",
    students: "923",
    duration: "7 hours",
    sections: [
      {
        title: 'HTML Foundations',
        lessons: [
          {
            type: 'video',
            title: 'Intro to HTML',
            url: 'https://www.youtube.com/embed/dD2EISBDjWM'
          },
          {
            type: 'quiz',
            title: 'HTML Basics Quiz',
            questions: [
              {
                q: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'Hot Mail', 'How To Make Landingpage'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'CSS Basics',
        lessons: [
          {
            type: 'video',
            title: 'CSS Syntax and Selectors',
            url: 'https://www.youtube.com/embed/yfoY53QXEnI'
          },
          {
            type: 'quiz',
            title: 'CSS Fundamentals Quiz',
            questions: [
              {
                q: 'Which property controls the text size?',
                options: ['font-style', 'font-size', 'text-size'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'JavaScript Essentials',
        lessons: [
          {
            type: 'video',
            title: 'JavaScript Basics',
            url: 'https://www.youtube.com/embed/W6NZfCO5SIk'
          },
          {
            type: 'quiz',
            title: 'JS Basics Quiz',
            questions: [
              {
                q: 'Which symbol is used for comments in JavaScript?',
                options: ['//', '/*', '#'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Full-Stack Web Project with Node.js",
    description: "Build and deploy a full-stack website with Express.js and MongoDB.",
    category: "Web Development",
    tags: ["web", "backend", "nodejs", "express", "mongodb"],
    image: "course2.jpg",
    rating: "4.8",
    students: "1994",
    duration: "10 hours",
    sections: [
      {
        title: 'Node.js Basics',
        lessons: [
          {
            type: 'video',
            title: 'Getting Started with Node.js',
            url: 'https://www.youtube.com/embed/TlB_eWDSMt4'
          },
          {
            type: 'quiz',
            title: 'Node.js Fundamentals Quiz',
            questions: [
              {
                q: 'Node.js is built on which JavaScript engine?',
                options: ['V8', 'SpiderMonkey', 'Chakra'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'Express.js Introduction',
        lessons: [
          {
            type: 'video',
            title: 'Express.js Crash Course',
            url: 'https://www.youtube.com/embed/L72fhGm1tfE'
          },
          {
            type: 'quiz',
            title: 'Express.js Basics Quiz',
            questions: [
              {
                q: 'Which method defines a route handler for GET requests?',
                options: ['app.post()', 'app.get()', 'app.listen()'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'MongoDB Integration',
        lessons: [
          {
            type: 'video',
            title: 'Intro to MongoDB',
            url: 'https://www.youtube.com/embed/Of8-DkrhK1c'
          },
          {
            type: 'quiz',
            title: 'MongoDB Basics Quiz',
            questions: [
              {
                q: 'What type of database is MongoDB?',
                options: ['Relational', 'NoSQL', 'Graph'],
                correct: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "React Native Crash Course",
    description: "Learn to build cross-platform mobile apps using React Native.",
    category: "Mobile Apps",
    tags: ["mobile", "react native", "javascript"],
    image: "course3.jpg",
    rating: "4.9",
    students: "701",
    duration: "9 hours",
    sections: [
      {
        title: 'Getting Started with React Native',
        lessons: [
          {
            type: 'video',
            title: 'React Native Basics',
            url: 'https://www.youtube.com/embed/Hf4MJH0jDb4'
          },
          {
            type: 'quiz',
            title: 'React Native Basics Quiz',
            questions: [
              {
                q: 'React Native allows you to build apps for which platforms?',
                options: ['iOS only', 'Android only', 'iOS and Android'],
                correct: 2
              }
            ]
          }
        ]
      },
      {
        title: 'Components and Styling',
        lessons: [
          {
            type: 'video',
            title: 'React Native Components',
            url: 'https://www.youtube.com/embed/0-S5a0eXPoc'
          },
          {
            type: 'quiz',
            title: 'Components Quiz',
            questions: [
              {
                q: 'Which component is used for text input?',
                options: ['<TextInput>', '<Text>', '<View>'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Intro to Flutter: Build Cross-Platform Mobile Apps",
    description: "Learn how to build beautiful and fast mobile apps using Flutter and Dart.",
    category: "Mobile Apps",
    tags: ["mobile", "flutter", "cross-platform"],
    image: "course4.jpg",
    rating: "4.7",
    students: "2016",
    duration: "10 hours",
    sections: [
      {
        title: 'Flutter Basics',
        lessons: [
          {
            type: 'video',
            title: 'Flutter Overview and Setup',
            url: 'https://www.youtube.com/embed/x0uinJvhNxI'
          },
          {
            type: 'quiz',
            title: 'Flutter Fundamentals Quiz',
            questions: [
              {
                q: 'Flutter uses which programming language?',
                options: ['JavaScript', 'Dart', 'Kotlin'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Building UI in Flutter',
        lessons: [
          {
            type: 'video',
            title: 'Flutter Widgets and Layouts',
            url: 'https://www.youtube.com/embed/995Zx_XzCjI'
          },
          {
            type: 'quiz',
            title: 'Widgets Quiz',
            questions: [
              {
                q: 'Which widget is used to arrange children vertically?',
                options: ['Row', 'Column', 'Stack'],
                correct: 1
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Data Science with Python",
    description: "Analyze data using Pandas, NumPy, and visualization libraries.",
    category: "Data Science",
    tags: ["data", "python", "pandas", "matplotlib"],
    image: "course5.jpg",
    rating: "4.4",
    students: "165",
    duration: "6 hours",
    sections: [
      {
        title: 'Python for Data Science',
        lessons: [
          {
            type: 'video',
            title: 'Python Basics for Data Science',
            url: 'https://www.youtube.com/embed/rfscVS0vtbw'
          },
          {
            type: 'quiz',
            title: 'Python Basics Quiz',
            questions: [
              {
                q: 'Which library is used for data manipulation?',
                options: ['NumPy', 'Pandas', 'Matplotlib'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Data Visualization',
        lessons: [
          {
            type: 'video',
            title: 'Matplotlib Tutorial',
            url: 'https://www.youtube.com/embed/DAQNHzOcO5A'
          },
          {
            type: 'quiz',
            title: 'Visualization Quiz',
            questions: [
              {
                q: 'Which library is best for statistical plots?',
                options: ['Seaborn', 'Matplotlib', 'Scikit-learn'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Data Wrangling and Visualization",
    description: "Clean, transform, and visualize complex datasets using Python tools like Pandas and Seaborn.",
    category: "Data Science",
    tags: ["data cleaning", "visualization", "pandas", "seaborn"],
    image: "course6.jpg",
    rating: "4.2",
    students: "5711",
    duration: "8 hours",
    sections: [
      {
        title: 'Data Cleaning',
        lessons: [
          {
            type: 'video',
            title: 'Handling Missing Data with Pandas',
            url: 'https://www.youtube.com/embed/EaGbS7eWSs0'
          },
          {
            type: 'quiz',
            title: 'Data Cleaning Quiz',
            questions: [
              {
                q: 'Which method removes duplicate rows in a DataFrame?',
                options: ['dropna()', 'drop_duplicates()', 'fillna()'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Data Visualization with Seaborn',
        lessons: [
          {
            type: 'video',
            title: 'Seaborn Basics',
            url: 'https://www.youtube.com/embed/GwIo3gDZCVQ'
          },
          {
            type: 'quiz',
            title: 'Seaborn Quiz',
            questions: [
              {
                q: 'Seaborn is built on top of which library?',
                options: ['Matplotlib', 'Plotly', 'Bokeh'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Machine Learning Fundamentals",
    description: "Understand the basics of machine learning algorithms and models.",
    category: "AI/ML",
    tags: ["machine learning", "scikit-learn", "ai"],
    image: "course7.jpg",
    rating: "4.7",
    students: "2500",
    duration: "14 hours",
    sections: [
      {
        title: 'Intro to Machine Learning',
        lessons: [
          {
            type: 'video',
            title: 'Machine Learning Overview',
            url: 'https://www.youtube.com/embed/GwIo3gDZCVQ'
          },
          {
            type: 'quiz',
            title: 'ML Basics Quiz',
            questions: [
              {
                q: 'What is supervised learning?',
                options: ['Learning without labels', 'Learning with labeled data', 'Learning by reinforcement'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Common Algorithms',
        lessons: [
          {
            type: 'video',
            title: 'Decision Trees and KNN',
            url: 'https://www.youtube.com/embed/7eh4d6sabA0'
          },
          {
            type: 'quiz',
            title: 'Algorithms Quiz',
            questions: [
              {
                q: 'Which algorithm is used for classification?',
                options: ['KNN', 'Linear Regression', 'PCA'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Deep Learning with TensorFlow",
    description: "Build and train deep neural networks using TensorFlow for image and text-based tasks.",
    category: "AI/ML",
    tags: ["deep learning", "tensorflow", "neural networks"],
    image: "course8.jpg",
    rating: "4.6",
    students: "521",
    duration: "9 hours",
    sections: [
      {
        title: 'TensorFlow Basics',
        lessons: [
          {
            type: 'video',
            title: 'Getting Started with TensorFlow',
            url: 'https://www.youtube.com/embed/tPYj3fFJGjk'
          },
          {
            type: 'quiz',
            title: 'TensorFlow Basics Quiz',
            questions: [
              {
                q: 'TensorFlow is primarily used for?',
                options: ['Web Development', 'Machine Learning', 'Mobile Apps'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Neural Networks',
        lessons: [
          {
            type: 'video',
            title: 'Understanding Neural Networks',
            url: 'https://www.youtube.com/embed/aircAruvnKk'
          },
          {
            type: 'quiz',
            title: 'Neural Networks Quiz',
            questions: [
              {
                q: 'What is an epoch in training?',
                options: ['One pass through the training data', 'Number of layers', 'Activation function'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Intro to DevOps",
    description: "Get started with CI/CD, Docker, and cloud deployment.",
    category: "DevOps",
    tags: ["devops", "docker", "ci/cd"],
    image: "course9.jpg",
    rating: "4.3",
    students: "606",
    duration: "8 hours",
    sections: [
      {
        title: 'DevOps Fundamentals',
        lessons: [
          {
            type: 'video',
            title: 'What is DevOps?',
            url: 'https://www.youtube.com/embed/LdGnxJIGwCQ'
          },
          {
            type: 'quiz',
            title: 'DevOps Basics Quiz',
            questions: [
              {
                q: 'Which tool is commonly used for containerization?',
                options: ['Docker', 'Jenkins', 'Git'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'CI/CD Pipelines',
        lessons: [
          {
            type: 'video',
            title: 'Introduction to CI/CD',
            url: 'https://www.youtube.com/embed/6a43b3ZZzz8'
          },
          {
            type: 'quiz',
            title: 'CI/CD Quiz',
            questions: [
              {
                q: 'CI stands for?',
                options: ['Continuous Integration', 'Continuous Improvement', 'Code Inspection'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },

  {
    id: 10,
    title: "AWS for Beginners",
    description: "Learn the basics of Amazon Web Services and cloud hosting.",
    category: "DevOps",
    tags: ["aws", "cloud", "infrastructure"],
    image: "course10.jpg",
    rating: "4.5",
    students: "888",
    duration: "9 hours",
    sections: [
      {
        title: 'AWS Basics',
        lessons: [
          {
            type: 'video',
            title: 'AWS Overview',
            url: 'https://www.youtube.com/embed/ulprqHHWlng'
          },
          {
            type: 'quiz',
            title: 'AWS Basics Quiz',
            questions: [
              {
                q: 'What does EC2 stand for?',
                options: ['Elastic Compute Cloud', 'Elastic Container Cluster', 'Elastic Cloud Compute'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'Cloud Services',
        lessons: [
          {
            type: 'video',
            title: 'Introduction to AWS Services',
            url: 'https://www.youtube.com/embed/ubCNZRNjhyo'
          },
          {
            type: 'quiz',
            title: 'AWS Services Quiz',
            questions: [
              {
                q: 'Which AWS service is used for object storage?',
                options: ['S3', 'EC2', 'Lambda'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Foundations of Cybersecurity",
    description: "Understand common vulnerabilities and how to protect against them.",
    category: "Cybersecurity",
    tags: ["security", "vulnerabilities", "threats"],
    image: "course11.jpg",
    rating: "4.7",
    students: "894",
    duration: "5 hours",
    sections: [
      {
        title: 'Cybersecurity Basics',
        lessons: [
          {
            type: 'video',
            title: 'Introduction to Cybersecurity',
            url: 'https://www.youtube.com/embed/inWWhr5tnEA'
          },
          {
            type: 'quiz',
            title: 'Cybersecurity Quiz',
            questions: [
              {
                q: 'What does CIA stand for in security?',
                options: ['Confidentiality, Integrity, Availability', 'Cybersecurity Information Assurance', 'Confidentiality, Integrity, Access'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'Common Threats',
        lessons: [
          {
            type: 'video',
            title: 'Common Vulnerabilities',
            url: 'https://www.youtube.com/embed/7jAoGz5gu94'
          },
          {
            type: 'quiz',
            title: 'Threats Quiz',
            questions: [
              {
                q: 'Which is an example of a social engineering attack?',
                options: ['Phishing', 'DDoS', 'SQL Injection'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Ethical Hacking 101",
    description: "Intro to penetration testing and white-hat hacking practices.",
    category: "Cybersecurity",
    tags: ["ethical hacking", "pentesting", "network security"],
    image: "course12.jpg",
    rating: "4.7",
    students: "111",
    duration: "7 hours",
    sections: [
      {
        title: 'Penetration Testing Basics',
        lessons: [
          {
            type: 'video',
            title: 'What is Ethical Hacking?',
            url: 'https://www.youtube.com/embed/RQbqj8mFQGk'
          },
          {
            type: 'quiz',
            title: 'Ethical Hacking Quiz',
            questions: [
              {
                q: 'Ethical hackers are also known as?',
                options: ['Black Hat', 'White Hat', 'Gray Hat'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Network Security',
        lessons: [
          {
            type: 'video',
            title: 'Network Penetration Testing',
            url: 'https://www.youtube.com/embed/sAOV8A9wQk4'
          },
          {
            type: 'quiz',
            title: 'Network Security Quiz',
            questions: [
              {
                q: 'Which tool is commonly used for network scanning?',
                options: ['Nmap', 'Wireshark', 'Metasploit'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "UX Fundamentals",
    description: "Learn the basics of user experience design.",
    category: "UX/UI Design",
    tags: ["ux", "design thinking", "usability"],
    image: "course13.jpg",
    rating: "4.6",
    students: "1520",
    duration: "11 hours",
    sections: [
      {
        title: 'Introduction to UX',
        lessons: [
          {
            type: 'video',
            title: 'What is User Experience (UX)?',
            url: 'https://www.youtube.com/embed/3qr-12N9Bcw'
          },
          {
            type: 'quiz',
            title: 'UX Basics Quiz',
            questions: [
              {
                q: 'What does UX stand for?',
                options: ['User Experience', 'User Exercise', 'User Extension'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'Design Thinking',
        lessons: [
          {
            type: 'video',
            title: 'Introduction to Design Thinking',
            url: 'https://www.youtube.com/embed/a7sEoEvT8l8'
          },
          {
            type: 'quiz',
            title: 'Design Thinking Quiz',
            questions: [
              {
                q: 'Which phase of design thinking involves generating ideas?',
                options: ['Empathize', 'Ideate', 'Prototype'],
                correct: 1
              }
            ]
          }
        ]
      },
      {
        title: 'Usability Principles',
        lessons: [
          {
            type: 'video',
            title: 'Basics of Usability',
            url: 'https://www.youtube.com/embed/9B4rT57C-4I'
          },
          {
            type: 'quiz',
            title: 'Usability Quiz',
            questions: [
              {
                q: 'Which of the following is NOT a usability heuristic?',
                options: ['Visibility of system status', 'User control and freedom', 'Heavy animations'],
                correct: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "UI Design with Figma",
    description: "Design beautiful interfaces using Figma.",
    category: "UX/UI Design",
    tags: ["ui", "figma", "visual design"],
    image: "course14.jpg",
    rating: "4.7",
    students: "3209",
    duration: "12 hours",
    sections: [
      {
        title: 'Getting Started with Figma',
        lessons: [
          {
            type: 'video',
            title: 'Figma Interface Overview',
            url: 'https://www.youtube.com/embed/kOV-4-z6JOg'
          },
          {
            type: 'quiz',
            title: 'Figma Basics Quiz',
            questions: [
              {
                q: 'What type of tool is Figma?',
                options: ['Vector graphics editor', 'Photo editor', 'Code IDE'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'Design Components',
        lessons: [
          {
            type: 'video',
            title: 'Working with Components in Figma',
            url: 'https://www.youtube.com/embed/eXbM8hNBF3Q'
          },
          {
            type: 'quiz',
            title: 'Components Quiz',
            questions: [
              {
                q: 'What is the purpose of components in Figma?',
                options: ['Reuse design elements', 'Create animations', 'Export code'],
                correct: 0
              }
            ]
          }
        ]
      },
      {
        title: 'Prototyping and Collaboration',
        lessons: [
          {
            type: 'video',
            title: 'Creating Prototypes in Figma',
            url: 'https://www.youtube.com/embed/1wZw7HYU78g'
          },
          {
            type: 'quiz',
            title: 'Prototyping Quiz',
            questions: [
              {
                q: 'Figma allows real-time collaboration?',
                options: ['True', 'False'],
                correct: 0
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = courses;