import type { BlogPost, BlogCategory } from "../types";

// For now we mock data. Later replace with real fetch to CMS/API.
const POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "exploring-southeast-asian-markets",
    title: "Exploring Southeast Asian Markets: Trends and Opportunities",
    excerpt:
      "Emerging trends and opportunities in Southeast Asian markets focusing on Indonesia, Philippines, and Singapore.",
    content: `# Exploring Southeast Asian Markets\n\nSoutheast Asia is one of the fastest growing economic regions. This article outlines macro trends, local nuances, and strategic considerations for market entry.\n\n## Key Growth Drivers\n- Digital adoption\n- Rising middle class\n- Cross-border commerce\n\n## Strategy Checklist\n1. Local regulatory due diligence\n2. Cultural & language adaptation\n3. Supply chain resilience\n\n> Success depends on hyper-local insight combined with regional scalability.`,
    coverImage: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    category: "Market Research",
    publishedAt: "2025-10-12T00:00:00Z",
    readTime: 8,
  },
  {
    id: "2",
    slug: "drone-technology-in-field-research",
    title: "Leveraging Drone Technology in Field Research",
    excerpt:
      "How modern drone platforms streamline data capture, safety, and cost efficiency in complex terrain.",
    content: `# Leveraging Drone Technology\n\nDrones enable repeatable, high-resolution data collection. We explore operational patterns and risk mitigation.\n\n## Core Advantages\n- Accessibility\n- Cost reduction\n- Temporal consistency\n\n## Practical Tips\nEnsure pilot certification, flight plan logging, and secure data pipelines.`,
    coverImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Michael Wong", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    category: "Technology",
    publishedAt: "2025-10-05T00:00:00Z",
    readTime: 6,
  },
  {
    id: "3",
    slug: "research-travel-coordination-best-practices",
    title: "Best Practices for Research Travel Coordination",
    excerpt:
      "Operational checklist for coordinating multi-site research travel across Southeast Asia.",
    content: `# Research Travel Coordination\n\nCoordinated travel reduces friction for field teams. This guide enumerates planning heuristics.\n\n## Pre-Trip Essentials\n- Permit & visa validation\n- Equipment manifest\n- Safety & medical contingencies\n\n## On-Site Routines\nDaily briefings, structured data offloading, and local liaison feedback loops.`,
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Lisa Rahman", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    category: "Travel",
    publishedAt: "2025-09-28T00:00:00Z",
    readTime: 7,
  },
  {
    id: "4",
    slug: "ai-powered-market-analysis",
    title: "AI-Powered Market Analysis: The Future of Research",
    excerpt:
      "Discover how artificial intelligence is revolutionizing market research and data analysis in 2025.",
    content: `# AI-Powered Market Analysis\n\nArtificial intelligence is transforming how we conduct market research. Learn about the latest tools and methodologies.`,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=60",
    author: { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
    category: "Technology",
    publishedAt: "2025-10-20T00:00:00Z",
    readTime: 10,
  },
  {
    id: "5",
    slug: "sustainable-tourism-indonesia",
    title: "Sustainable Tourism in Indonesia: A Guide for Researchers",
    excerpt:
      "How to conduct ethical and sustainable tourism research in Indonesia's diverse ecosystems.",
    content: `# Sustainable Tourism in Indonesia\n\nIndonesia's natural beauty requires careful stewardship. This guide helps researchers minimize their environmental impact.`,
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Amanda Putri", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    category: "Travel",
    publishedAt: "2025-10-18T00:00:00Z",
    readTime: 9,
  },
  {
    id: "6",
    slug: "remote-sensing-applications",
    title: "Remote Sensing Applications in Agricultural Research",
    excerpt:
      "Using satellite imagery and drone data for precision agriculture and crop monitoring.",
    content: `# Remote Sensing in Agriculture\n\nModern remote sensing technologies enable unprecedented insights into agricultural patterns and productivity.`,
    coverImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Robert Santos", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
    category: "Technology",
    publishedAt: "2025-10-15T00:00:00Z",
    readTime: 7,
  },
  {
    id: "7",
    slug: "cross-cultural-research-methods",
    title: "Cross-Cultural Research Methods in Southeast Asia",
    excerpt:
      "Best practices for conducting culturally sensitive research across diverse Southeast Asian communities.",
    content: `# Cross-Cultural Research\n\nNavigating cultural differences is essential for effective research in Southeast Asia.`,
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Maya Nguyen", avatar: "https://randomuser.me/api/portraits/women/72.jpg" },
    category: "Market Research",
    publishedAt: "2025-10-10T00:00:00Z",
    readTime: 11,
  },
  {
    id: "8",
    slug: "digital-nomad-research-hubs",
    title: "Top Digital Nomad Hubs for Field Researchers in 2025",
    excerpt:
      "The best cities in Southeast Asia offering infrastructure for remote researchers and field teams.",
    content: `# Digital Nomad Research Hubs\n\nCombine productivity with exploration in these researcher-friendly Southeast Asian cities.`,
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Chris Anderson", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    category: "Travel",
    publishedAt: "2025-10-08T00:00:00Z",
    readTime: 6,
  },
  {
    id: "9",
    slug: "blockchain-supply-chain-tracking",
    title: "Blockchain for Supply Chain Transparency in Research",
    excerpt:
      "How blockchain technology ensures data integrity and traceability in field research operations.",
    content: `# Blockchain in Research\n\nBlockchain provides immutable records for research data and supply chain operations.`,
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Jennifer Lee", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    category: "Technology",
    publishedAt: "2025-10-03T00:00:00Z",
    readTime: 8,
  },
  {
    id: "10",
    slug: "indonesian-market-regulations-2025",
    title: "Understanding Indonesian Market Regulations in 2025",
    excerpt:
      "A comprehensive guide to navigating Indonesia's evolving business and research regulations.",
    content: `# Indonesian Market Regulations\n\nStay compliant with the latest regulatory changes affecting research operations in Indonesia.`,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Ahmad Hidayat", avatar: "https://randomuser.me/api/portraits/men/78.jpg" },
    category: "Market Research",
    publishedAt: "2025-09-30T00:00:00Z",
    readTime: 12,
  },
  {
    id: "11",
    slug: "underwater-drone-photography",
    title: "Underwater Drone Photography: Capturing Marine Ecosystems",
    excerpt:
      "Advanced techniques for using underwater drones in marine research and conservation projects.",
    content: `# Underwater Drone Photography\n\nExplore the depths with cutting-edge underwater drone technology for research purposes.`,
    coverImage: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Ocean Martinez", avatar: "https://randomuser.me/api/portraits/men/85.jpg" },
    category: "Technology",
    publishedAt: "2025-09-25T00:00:00Z",
    readTime: 9,
  },
  {
    id: "12",
    slug: "budget-travel-tips-researchers",
    title: "Budget Travel Tips for Field Researchers",
    excerpt:
      "How to maximize your research budget while traveling across Southeast Asia for field work.",
    content: `# Budget Travel for Researchers\n\nPractical tips for cost-effective travel without compromising research quality.`,
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/89.jpg" },
    category: "Travel",
    publishedAt: "2025-09-22T00:00:00Z",
    readTime: 7,
  },
  {
    id: "13",
    slug: "consumer-behavior-post-pandemic",
    title: "Post-Pandemic Consumer Behavior in Asian Markets",
    excerpt:
      "Analyzing the lasting impact of COVID-19 on consumer preferences and shopping habits in Asia.",
    content: `# Post-Pandemic Consumer Behavior\n\nThe pandemic has permanently altered consumer behavior patterns across Asian markets.`,
    coverImage: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Dr. Priya Sharma", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
    category: "Market Research",
    publishedAt: "2025-09-20T00:00:00Z",
    readTime: 10,
  },
  {
    id: "14",
    slug: "5g-iot-field-research",
    title: "5G and IoT: Revolutionizing Field Research Data Collection",
    excerpt:
      "How 5G networks and IoT devices are enabling real-time data collection and analysis in remote locations.",
    content: `# 5G and IoT in Research\n\nNext-generation connectivity transforms how we collect and process field data in real-time.`,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Kevin Zhang", avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
    category: "Technology",
    publishedAt: "2025-09-18T00:00:00Z",
    readTime: 8,
  },
  {
    id: "15",
    slug: "visa-requirements-researchers",
    title: "Visa Requirements for Researchers in Southeast Asia",
    excerpt:
      "Complete guide to obtaining research visas and permits across Southeast Asian countries.",
    content: `# Research Visa Guide\n\nNavigate the visa requirements for conducting research across Southeast Asian nations.`,
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Sofia Rodriguez", avatar: "https://randomuser.me/api/portraits/women/95.jpg" },
    category: "Travel",
    publishedAt: "2025-09-15T00:00:00Z",
    readTime: 11,
  },
  {
    id: "16",
    slug: "ecommerce-trends-indonesia",
    title: "E-Commerce Trends Shaping Indonesia's Digital Economy",
    excerpt:
      "Deep dive into the e-commerce boom and digital payment adoption across Indonesian markets.",
    content: `# E-Commerce in Indonesia\n\nIndonesia's e-commerce sector is experiencing unprecedented growth and innovation.`,
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Budi Santoso", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
    category: "Market Research",
    publishedAt: "2025-09-12T00:00:00Z",
    readTime: 9,
  },
  {
    id: "17",
    slug: "thermal-imaging-drones",
    title: "Thermal Imaging Drones in Environmental Research",
    excerpt:
      "Using thermal sensors and drones to monitor wildlife, vegetation, and environmental changes.",
    content: `# Thermal Imaging Technology\n\nThermal drones reveal invisible patterns in ecosystems and environmental processes.`,
    coverImage: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Dr. Rachel Green", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    category: "Technology",
    publishedAt: "2025-09-10T00:00:00Z",
    readTime: 7,
  },
  {
    id: "18",
    slug: "solo-female-researcher-safety",
    title: "Safety Guide for Solo Female Researchers in Asia",
    excerpt:
      "Essential safety tips and cultural considerations for women conducting solo field research.",
    content: `# Solo Female Researcher Safety\n\nPractical advice for staying safe while conducting independent research across Asia.`,
    coverImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Nina Patel", avatar: "https://randomuser.me/api/portraits/women/58.jpg" },
    category: "Travel",
    publishedAt: "2025-09-08T00:00:00Z",
    readTime: 8,
  },
  {
    id: "19",
    slug: "qualitative-vs-quantitative-research",
    title: "Qualitative vs Quantitative Research in Asian Markets",
    excerpt:
      "Choosing the right research methodology for understanding complex Asian consumer markets.",
    content: `# Research Methodologies\n\nUnderstand when to use qualitative versus quantitative approaches in market research.`,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Thomas Müller", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    category: "Market Research",
    publishedAt: "2025-09-05T00:00:00Z",
    readTime: 10,
  },
  {
    id: "20",
    slug: "autonomous-drone-swarms",
    title: "Autonomous Drone Swarms for Large-Scale Data Collection",
    excerpt:
      "How coordinated autonomous drone fleets are revolutionizing large-area research projects.",
    content: `# Autonomous Drone Swarms\n\nMultiple drones working in coordination can cover vast areas efficiently and cost-effectively.`,
    coverImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&auto=format&fit=crop&q=60",
    author: { name: "Alex Johnson", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
    category: "Technology",
    publishedAt: "2025-09-02T00:00:00Z",
    readTime: 9,
  },
];

const CATEGORIES: BlogCategory[] = [
  { id: "cat1", name: "Market Research", slug: "market-research", count: 6 },
  { id: "cat2", name: "Technology", slug: "technology", count: 8 },
  { id: "cat3", name: "Travel", slug: "travel", count: 6 },
];

export class BlogService {
  static async listPosts(): Promise<BlogPost[]> {
    await new Promise(r => setTimeout(r, 200));
    return POSTS;
  }
  static async listCategories(): Promise<BlogCategory[]> {
    await new Promise(r => setTimeout(r, 100));
    return CATEGORIES;
  }
  static async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    await new Promise(r => setTimeout(r, 150));
    return POSTS.find(p => p.slug === slug);
  }
  static async featured(): Promise<BlogPost[]> {
    return POSTS.slice(0, 2);
  }
}
