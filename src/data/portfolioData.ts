export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  role: string;
  description: string;
  achievements: string[];
  techStack: string[];
  links?: { label: string; url: string }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  type: 'Patent' | 'Conference Paper' | 'Industry Research' | 'Certification';
  identifier?: string;
  venueOrOrg: string;
  status: string;
  description: string;
  details?: string[];
  techOrFocus: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Mrunal Talikoti',
    role: 'AI & Cloud Software Engineer',
    education: {
      college: 'Vishwakarma Institute of Information Technology',
      degree: 'B.Tech, Computer Engineering',
      cgpa: '9.22 / 10',
      expectedGraduation: 'Expected 2027',
      location: 'Pune, Maharashtra',
    },
    location: 'Pune, India',
    email: 'mrunaltalikoti2@gmail.com',
    phone: '+91-8446632631',
    linkedin: 'https://linkedin.com/in/mrunal-talikoti-931766295',
    github: 'https://github.com/MrunalTalikoti',
    resumeUrl: '/assets/aistudio/Mrunal_Talikoti_Octend_1b14d831.pdf',
    summary:
      'B.Tech Computer Engineering student (CGPA 9.22/10) and AI & Cloud-focused software developer with four internships building production AI pipelines on Azure, Docker, and FastAPI. Built LLM document-processing systems handling 100,000+ documents per day at 89% extraction accuracy, and automated workflows that cut manual effort by 70–90%. Indian patent holder (multi-agent system generation), presented researcher, and hackathon winner (1st among 150+ teams).',
    metrics: [
      { label: 'Documents/Day', value: '100,000+', desc: 'Handled in production document pipelines' },
      { label: 'Extraction Accuracy', value: '89%', desc: 'Via Azure Document Intelligence & LLMs' },
      { label: 'Manual Effort Cut', value: '70%–90%', desc: 'Across workflow automation engines' },
      { label: 'CodeApex Hackathon', value: '1st Place', desc: 'Out of 150+ competing engineering teams' },
      { label: 'Indian Patent', value: 'Granted/Filed', desc: 'Patent No. 202621005880 (Agent Generation)' },
      { label: 'B.Tech CGPA', value: '9.22 / 10', desc: 'Vishwakarma Institute of Information Technology' },
    ],
  },

  projects: [
    {
      id: 'meta-agent',
      title: 'Meta-Agent',
      subtitle: 'Indian Patent No. 202621005880',
      badge: 'Patent Invention',
      role: 'System Architect & Inventor',
      description:
        'A comprehensive system and method for automatic generation of specialized AI agents. Features hierarchical orchestration of multiple sub-agents to synthesize, validate, and deploy autonomous agents directly from natural language user prompts.',
      achievements: [
        'Designed hierarchical orchestration of multiple sub-agents to generate agents from user prompts.',
        'Built a custom context manager for dynamic load balancing and a DAG-based execution manager.',
        'Integrated secure object storage for artifacts and automated code-generator distribution packages.',
        'Architected with distributed JWT + OAuth auth layer, Celery worker queues, and Redis cache.',
      ],
      techStack: [
        'Anthropic Models',
        'JWT + OAuth',
        'Celery',
        'Docker',
        'DAG Execution',
        'Alembic',
        'Redis',
        'AWS S3',
      ],
      links: [
        { label: 'Patent Spec No. 202621005880', url: '#' },
        { label: 'GitHub Repository', url: 'https://github.com/MrunalTalikoti' },
      ],
    },
    {
      id: 'clover',
      title: 'Clover — Fine-Tuning Studio',
      subtitle: '1st Place Winner, CodeApex 2026',
      badge: 'Hackathon 1st Place',
      role: 'Lead Architect & Full-Stack AI Engineer',
      description:
        'A no-code AI studio empowering domain experts without machine learning experience to fine-tune Small Language Models (Qwen2.5-3B) using QLoRA and Unsloth. Won 1st place among 150+ engineering teams.',
      achievements: [
        'Won 1st place among 150+ teams as part of a 4-member team at CodeApex 2026.',
        'Achieved state-of-the-art fine-tuning efficiency with training loss of 0.97 and perplexity of 2.64 on Qwen2.5-3B.',
        'Architected a FastAPI + React + Supabase platform featuring Ollama-based local inference.',
        'Built complete end-to-end model evaluation, dataset curation, and one-click deployment pipelines.',
      ],
      techStack: [
        'Python',
        'FastAPI',
        'React',
        'Supabase',
        'QLoRA',
        'Unsloth',
        'Ollama',
        'Qwen2.5-3B',
      ],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/MrunalTalikoti' },
      ],
    },
    {
      id: 'factless',
      title: 'Factless — Hallucination Detection',
      subtitle: 'Presented at IEEE ICDBS (Paper ID 1324)',
      badge: 'IEEE Research Paper',
      role: 'Lead Researcher & Engineer',
      description:
        'An explainable, post-generation hallucination risk assessment system for large language models, utilizing a specialized 7-layer agentic architecture to isolate and score factual discrepancies in real-time.',
      achievements: [
        'Engineered a 7-layer agentic pipeline to cross-reference LLM generations against verifiable ground-truth contexts.',
        'Implemented semantic-search-based, color-coded risk scoring for instant hallucination detection in LLM outputs.',
        'Published and presented research paper ID 1324 at the IEEE ICDBS international conference.',
      ],
      techStack: [
        'Sentence Transformers',
        'FastAPI',
        'Google Gemini',
        'LangChain',
        'Python SDK',
        'Vector Similarity',
      ],
      links: [
        { label: 'IEEE Paper ID 1324', url: '#' },
        { label: 'GitHub Repository', url: 'https://github.com/MrunalTalikoti' },
      ],
    },
    {
      id: 'analog-workflow',
      title: 'AI Analog Workflow Pipeline',
      subtitle: 'Industry Automation Project at UST Global',
      badge: 'Industry Automation',
      role: 'Software Intern — Industry Project',
      description:
        'An automated machine learning pipeline predicting transistor parameters, generating SPICE netlists, and verifying semiconductor circuits, significantly accelerating integrated circuit design cycles.',
      achievements: [
        'Engineered an AI-driven analog workflow automation pipeline, cutting manual circuit design time by 70%.',
        'Trained Random Forest Regressors (91.2% accuracy) and XGBoost models across 20+ transistor parameters.',
        'Applied Particle Swarm Optimization (PSO) for automated parameter convergence and circuit verification.',
      ],
      techStack: [
        'Python',
        'Random Forest (91.2%)',
        'XGBoost',
        'Particle Swarm Optimization (PSO)',
        'SPICE Netlist',
      ],
      links: [
        { label: 'UST Global Project', url: 'https://github.com/MrunalTalikoti' },
      ],
    },
    {
      id: 'privacy-ai',
      title: 'Privacy.AI & Legacy Extraction',
      subtitle: 'Data Automation Engine at Valentius Kryptix',
      badge: 'Data Modernization',
      role: 'Machine Learning Intern',
      description:
        'Web user interface and legacy-system automated extraction engine designed to streamline data entry and enforce enterprise privacy standards.',
      achievements: [
        'Built a Privacy.AI web UI using modern Lightning Web Components, HTML, CSS, and JavaScript.',
        'Automated legacy-system data extraction using optimized SQL pipelines, cutting manual data entry by 90%.',
      ],
      techStack: [
        'HTML/CSS/JS',
        'Lightning Web Components (LWC)',
        'SQL Pipelines',
        'Data Extraction',
      ],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/MrunalTalikoti' },
      ],
    },
  ] as ProjectItem[],

  experiences: [
    {
      id: 'bizamica',
      company: 'BizAmica',
      role: 'Software Engineer Intern (Full Time)',
      type: 'Full Time Internship',
      location: 'Pune, Maharashtra',
      period: 'Jan 2026 – Aug 2026',
      summary:
        'Leading production AI engineering for large-scale enterprise document intelligence systems handling hundreds of thousands of daily corporate records.',
      highlights: [
        'Engineered document classification, verification, auto-allocation, and extraction pipelines using LangChain and Pydantic, processing 100,000+ documents per day across 25+ document types.',
        'Integrated Azure Document Intelligence and Azure OpenAI LLMs to extract data from unstructured business documents at 89% accuracy and ~9 seconds per page, cutting manual processing time by 82%.',
        'Designed resilient schema validation protocols ensuring high-throughput compliance across diverse document structures.',
      ],
      skills: ['LangChain', 'Pydantic', 'Azure Document Intelligence', 'Azure OpenAI', 'FastAPI', 'ETL Pipelines'],
    },
    {
      id: 'ust-global',
      company: 'UST Global',
      role: 'Software Intern (Part Time) – Industry Project',
      type: 'Industry Project',
      location: 'Pune, Maharashtra',
      period: 'Jan 2026 – Apr 2026',
      summary:
        'Developed semiconductor automation tools applying machine learning regression to transistor parameter estimation and circuit netlist generation.',
      highlights: [
        'Engineered an AI-driven analog workflow automation pipeline for transistor parameter prediction, SPICE netlist generation, and circuit verification, cutting manual design time by 70%.',
        'Trained Random Forest Regressor (91.2% accuracy) and XGBoost models across 20+ transistor parameters; applied PSO for optimal parameter tuning.',
      ],
      skills: ['Python', 'Random Forest Regressor', 'XGBoost', 'PSO', 'SPICE Netlists', 'Analog Circuit Automation'],
    },
    {
      id: 'iotiot',
      company: 'IoTIoT',
      role: 'AI Intern',
      type: 'Internship',
      location: 'Pune, Maharashtra',
      period: 'Jul 2025 – Dec 2025',
      summary:
        'Pioneered autonomous multi-agent CRM pipelines and structured SOP execution engines using modern agent frameworks.',
      highlights: [
        'Built a proof-of-concept multi-agent CRM automation using LangGraph and an MCP (Model Context Protocol) server, automating 6+ workflow steps end-to-end.',
        'Designed autonomous SOP prototypes with LangChain and Smolagents, taking them from concept to verified working demo.',
      ],
      skills: ['LangGraph', 'MCP Server', 'LangChain', 'Smolagents', 'Multi-Agent Systems', 'Python'],
    },
    {
      id: 'valentius',
      company: 'Valentius Kryptix',
      role: 'Machine Learning Intern',
      type: 'Internship',
      location: 'Pune, Maharashtra',
      period: 'Jul 2024 – Mar 2025',
      summary:
        'Engineered privacy-conscious frontend components and automated legacy SQL database extraction pipelines.',
      highlights: [
        'Built a Privacy.AI web UI using HTML/CSS/JS and Lightning Web Components (LWC).',
        'Automated legacy-system data extraction with SQL, cutting manual data entry by 90%.',
      ],
      skills: ['Lightning Web Components', 'JavaScript', 'SQL', 'Data Extraction', 'ETL'],
    },
  ] as ExperienceItem[],

  research: [
    {
      id: 'patent-agent',
      title: 'A System and a Method for Generation of an Agent',
      type: 'Patent',
      identifier: 'Indian Patent No. 202621005880',
      venueOrOrg: 'Intellectual Property India (Controller General of Patents)',
      status: 'Patent Filed / Inventor',
      description:
        'Invented an autonomous architecture for hierarchical orchestration of sub-agents capable of generating, validating, and deploying specialized software agents directly from user intents.',
      details: [
        'Covers autonomous agent synthesis and validation pipeline.',
        'Includes dynamic context management, load balancing, and DAG workflow scheduling.',
      ],
      techOrFocus: ['Multi-Agent Generation', 'Orchestration', 'DAG Scheduling', 'Autonomous Systems'],
    },
    {
      id: 'ieee-factless',
      title: 'Factless: Explainable Hallucination Detection',
      type: 'Conference Paper',
      identifier: 'Paper ID 1324',
      venueOrOrg: 'IEEE ICDBS International Conference',
      status: 'Presented (Publication Pending)',
      description:
        'A research contribution detailing a 7-layer agentic architecture for real-time post-generation hallucination detection in LLM responses via semantic risk scoring.',
      details: [
        'Presented at IEEE ICDBS conference.',
        'Demonstrates quantifiable reduction in undetected factual hallucinations.',
      ],
      techOrFocus: ['Sentence Transformers', 'LLM Hallucinations', 'Agentic Architecture', 'Semantic Search'],
    },
    {
      id: 'icindia-allergen',
      title: 'Vision Based Allergen Detection',
      type: 'Conference Paper',
      identifier: 'Paper ID 749',
      venueOrOrg: 'ICINDIA International Conference',
      status: 'Presented (Publication Pending)',
      description:
        'Computer vision methodology and deep neural network pipeline designed to detect food allergens visually from packaging and prepared food items.',
      details: [
        'Presented at ICINDIA conference.',
        'Addresses consumer safety through real-time multi-label visual classification.',
      ],
      techOrFocus: ['Computer Vision', 'Deep Learning', 'Image Classification', 'Safety AI'],
    },
    {
      id: 'fortea-hemiplegia',
      title: 'Hemiplegia Detection Model Partnership',
      type: 'Industry Research',
      venueOrOrg: 'Partnered with FORTEA.IA',
      status: 'Active Collaboration',
      description:
        'Applied machine learning diagnostic models for early hemiplegia detection and motor impairment tracking in clinical research.',
      details: ['Collaborative research combining motion analysis and predictive ML algorithms.'],
      techOrFocus: ['Healthcare AI', 'Machine Learning', 'Motion Analysis'],
    },
    {
      id: 'certifications',
      title: 'Industry Certifications & Credentials',
      type: 'Certification',
      venueOrOrg: 'Microsoft, Hugging Face, DeepLearning.AI',
      status: 'Certified',
      description:
        'Recognized credentials in foundational and advanced AI agent architectures, production RAG engineering, and generative AI systems.',
      details: [
        'Generative AI Certification — Microsoft',
        'AI Agents Mastery — Hugging Face',
        'Retrieval-Augmented Generation (RAG) Systems — DeepLearning.AI',
      ],
      techOrFocus: ['Generative AI', 'AI Agents', 'RAG Systems', 'Vector Search'],
    },
  ] as ResearchItem[],

  skills: [
    {
      category: 'AI / LLM & Agents',
      items: [
        'Generative AI',
        'RAG (Retrieval-Augmented Generation)',
        'Agentic AI & Multi-Agent Systems',
        'LLM & NLP',
        'Prompt Engineering',
        'LLM Evaluation',
        'Fine-Tuning (QLoRA, Unsloth)',
        'Machine Learning',
        'Deep Learning',
      ],
    },
    {
      category: 'Languages & Frameworks',
      items: [
        'Python',
        'C++',
        'PyTorch',
        'LangChain',
        'LangGraph',
        'MCP (Model Context Protocol)',
        'OpenAI SDK / Azure OpenAI',
        'Hugging Face Transformers',
        'FastAPI',
        'Smolagents',
        'Stable Diffusion',
        'Pydantic',
        'React',
      ],
    },
    {
      category: 'Vector DBs & Data',
      items: [
        'FAISS',
        'Pinecone',
        'Supabase Vector',
        'ETL Pipelines',
        'Data Extraction',
        'REST APIs',
        'Workflow Automation (n8n)',
      ],
    },
    {
      category: 'Cloud, DevOps & Systems',
      items: [
        'Azure (Document Intelligence, OpenAI)',
        'Docker & Containerization',
        'CI/CD Pipelines',
        'Celery Task Queues',
        'RabbitMQ',
        'Redis Caching',
        'AWS S3',
        'System Design & Scalable Architecture',
      ],
    },
    {
      category: 'Databases & Storage',
      items: ['PostgreSQL', 'SQL', 'MySQL', 'MongoDB', 'Supabase', 'Alembic Migrations'],
    },
    {
      category: 'Tools & Development',
      items: ['GitHub (Code Reviews, Git)', 'Jupyter Notebooks', 'Google Colab', 'Ollama (Local LLMs)', 'Linux/Bash'],
    },
  ] as SkillCategory[],

  coCurricular: [
    {
      title: 'CodeApex 2026 Winner (1st / 150+ Teams)',
      org: 'CodeApex Hackathon',
      desc: 'Built Clover — a no-code SLM fine-tuning studio allowing domain experts to fine-tune Qwen2.5-3B models with 0.97 training loss and local Ollama inference.',
    },
    {
      title: 'Patent Holder at Age 20',
      org: 'Indian Patent Office',
      desc: 'Sole/Primary inventor of multi-agent generation architecture (Patent No. 202621005880).',
    },
    {
      title: 'Dual International Conference Presenter',
      org: 'IEEE ICDBS & ICINDIA',
      desc: 'Presented primary research in hallucination detection (Factless) and computer vision allergen detection.',
    },
    {
      title: '4x Production Internships',
      org: 'BizAmica, UST Global, IoTIoT, Valentius Kryptix',
      desc: 'Shipped production AI solutions handling 100,000+ daily documents and cutting manual engineering effort by 70–90%.',
    },
  ],
};
