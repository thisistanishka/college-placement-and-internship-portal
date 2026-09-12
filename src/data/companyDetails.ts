export interface CompanyInterviewData {
  companyId: number;
  companyName: string;
  tpoRating: number;
  pastHiresCount: number;
  averagePackage: string;
  interviewRounds: {
    round: number;
    title: string;
    duration: string;
    focus: string;
    tips: string;
  }[];
  bcaQuestions: {
    question: string;
    topic: 'OOPs' | 'SQL' | 'Data Structures' | 'Web/Python' | 'HR';
    sampleAnswer: string;
    frequency: 'Very Common' | 'Common' | 'Expected';
  }[];
}

export const companyInterviewData: Record<number, CompanyInterviewData> = {
  1: {
    companyId: 1,
    companyName: 'Tata Consultancy Services (TCS)',
    tpoRating: 4.8,
    pastHiresCount: 142,
    averagePackage: '3.6 - 4.5 LPA',
    interviewRounds: [
      {
        round: 1,
        title: 'TCS NQT / Ignite Online Cognitive & Coding Test',
        duration: '90 Minutes',
        focus: 'Numerical Ability, Verbal, Reasoning, 2 Coding questions (Strings, Arrays in Python/C++)',
        tips: 'Focus on time management in the quantitative aptitude section; basic array reversal and palindrome check in coding.'
      },
      {
        round: 2,
        title: 'Technical Interview (TR)',
        duration: '30-40 Minutes',
        focus: 'C/C++, Python/Java concepts, SQL queries (JOINs, GROUP BY), 6th semester BCA major project',
        tips: 'Be ready to explain the database schema and architecture of your BCA academic project.'
      },
      {
        round: 3,
        title: 'Managerial & HR Round (MR & HR)',
        duration: '20 Minutes',
        focus: 'Willingness to relocate, shifts, teamwork, strengths and 5-year career vision',
        tips: 'Maintain confidence, demonstrate eagerness to learn new enterprise tech stacks.'
      }
    ],
    bcaQuestions: [
      {
        question: 'What is the difference between primary key, unique key, and candidate key in SQL?',
        topic: 'SQL',
        sampleAnswer: 'A Primary Key uniquely identifies each row in a table and cannot contain NULL values. A Unique Key also ensures uniqueness but permits one NULL value. Candidate Keys are all candidate column sets eligible to become the primary key.',
        frequency: 'Very Common'
      },
      {
        question: 'Explain the 4 pillars of Object-Oriented Programming (OOP) with a real-life BCA project example.',
        topic: 'OOPs',
        sampleAnswer: 'Encapsulation (wrapping data and methods into class Student), Abstraction (hiding internal DB connection logic while exposing fetchProfile()), Inheritance (Trainee inheriting from Employee), and Polymorphism (method overloading or overriding calculateStipend()).',
        frequency: 'Very Common'
      },
      {
        question: 'How does indexing in a relational database improve query performance?',
        topic: 'SQL',
        sampleAnswer: 'Indexes create a B-Tree or balanced search data structure that allows the database engine to locate records without performing a full sequential table scan (reducing O(N) to O(log N)).',
        frequency: 'Common'
      },
      {
        question: 'Tell me about yourself and why you chose BCA over other IT degrees.',
        topic: 'HR',
        sampleAnswer: 'I have always had a strong passion for software programming and application building. BCA gave me an applied curriculum with hands-on practice in DBMS, Python, and Web Development.',
        frequency: 'Very Common'
      }
    ]
  },
  2: {
    companyId: 2,
    companyName: 'Infosys BPM & Tech',
    tpoRating: 4.7,
    pastHiresCount: 118,
    averagePackage: '3.2 - 3.8 LPA',
    interviewRounds: [
      {
        round: 1,
        title: 'Infosys Online Test',
        duration: '60 Minutes',
        focus: 'Mathematical thinking, Logical reasoning, English reading comprehension',
        tips: 'Accuracy is strictly penalized with negative markings; avoid guessing.'
      },
      {
        round: 2,
        title: 'Technical & HR Composite Interview',
        duration: '25 Minutes',
        focus: 'Operating System fundamentals, Linux commands, Networking basics (TCP/IP, DNS), Project demo',
        tips: 'Highlight any certifications in Python, Cloud or Database fundamentals.'
      }
    ],
    bcaQuestions: [
      {
        question: 'What happens behind the scenes when you type a URL in the browser and press Enter?',
        topic: 'Web/Python',
        sampleAnswer: 'DNS resolution converts the domain to an IP address, the browser initiates a TCP handshake (and TLS negotiation for HTTPS), sends an HTTP GET request, the server responds with status and HTML/assets, which the browser engine parses and renders via the DOM tree.',
        frequency: 'Very Common'
      },
      {
        question: 'What is the difference between TRUNCATE, DELETE, and DROP in SQL?',
        topic: 'SQL',
        sampleAnswer: 'DELETE is a DML statement that removes rows with a WHERE filter and can be rolled back. TRUNCATE is a DDL statement that rapidly clears all rows, resets identity counters, and cannot easily be rolled back. DROP removes the entire table definition along with its data.',
        frequency: 'Very Common'
      },
      {
        question: 'Are you comfortable working in rotating shifts or supporting night shifts for overseas clients?',
        topic: 'HR',
        sampleAnswer: 'Yes, as a fresher beginning my technology career, I understand global projects require 24/7 reliability and I am fully open and flexible to rotating shifts.',
        frequency: 'Common'
      }
    ]
  },
  3: {
    companyId: 3,
    companyName: 'Wipro Technologies',
    tpoRating: 4.6,
    pastHiresCount: 95,
    averagePackage: '3.5 - 4.2 LPA + M.Tech',
    interviewRounds: [
      {
        round: 1,
        title: 'Online Aptitude & Essay Writing (WILP Test)',
        duration: '80 Minutes',
        focus: 'Quantitative, Analytical, Verbal, and a 20-minute typed essay for communication review',
        tips: 'Check spelling and grammar thoroughly in the essay section.'
      },
      {
        round: 2,
        title: 'Technical & Academic Viva',
        duration: '25 Minutes',
        focus: 'Mathematics in 12th/BCA (Calculus, Statistics, Discrete Maths), C++/Java loops, Basic algorithms',
        tips: 'Revise 12th standard mathematics basics as WILP requires M.Tech coursework.'
      }
    ],
    bcaQuestions: [
      {
        question: 'Why are you interested in the Wipro WILP program instead of pursuing MCA full-time?',
        topic: 'HR',
        sampleAnswer: 'WILP provides the ultimate combination: gaining 4 years of hands-on corporate software engineering experience while simultaneously earning an M.Tech degree from BITS Pilani fully funded by Wipro. It puts me years ahead professionally.',
        frequency: 'Very Common'
      },
      {
        question: 'Explain the difference between a Process and a Thread.',
        topic: 'Data Structures',
        sampleAnswer: 'A Process is an independent program in execution with its own dedicated memory space. A Thread is a lightweight sub-unit of execution within a process that shares memory and resources with sibling threads.',
        frequency: 'Common'
      }
    ]
  },
  4: {
    companyId: 5,
    companyName: 'Zoho Corporation',
    tpoRating: 4.9,
    pastHiresCount: 35,
    averagePackage: '5.5 - 7.2 LPA',
    interviewRounds: [
      {
        round: 1,
        title: 'Basic Programming Round (Written or Lab Test)',
        duration: '90 Minutes',
        focus: 'Pattern printing, String manipulations, nested loops in C, Java or Python without built-in library shortcuts',
        tips: 'Zoho strictly evaluates your raw problem-solving without using built-in methods like split() or reverse(). Write manual loops!'
      },
      {
        round: 2,
        title: 'Advanced Programming & Data Structures',
        duration: '90 Minutes',
        focus: 'Recursion, matrix traversal, 2D arrays, stacks, and custom sorting',
        tips: 'Optimize time and space complexity; clean variable naming is rewarded.'
      },
      {
        round: 3,
        title: 'Design & Tech Interview',
        duration: '45 Minutes',
        focus: 'Build a small terminal app (e.g. Railway ticket reservation or ATM machine simulator) on paper or whiteboard',
        tips: 'Focus on modular functions, OOP design, and edge case handling.'
      }
    ],
    bcaQuestions: [
      {
        question: 'How would you reverse a string without using any built-in functions or extra auxiliary memory?',
        topic: 'Web/Python',
        sampleAnswer: 'By using two pointers: one pointing at index 0 and the other at length - 1. In a while loop, swap the characters at both pointers and increment the left pointer while decrementing the right pointer until they meet in the middle. Time complexity is O(N) and space complexity is O(1).',
        frequency: 'Very Common'
      },
      {
        question: 'What is the DOM in web development and how do event listeners work?',
        topic: 'Web/Python',
        sampleAnswer: 'The Document Object Model (DOM) is an object-oriented tree representation of the HTML document created by the browser. Event listeners listen for user interactions (clicks, inputs, submit) and trigger callback functions through the event bubbling and capturing lifecycle.',
        frequency: 'Very Common'
      }
    ]
  }
};
