export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategoryId;
}

export type FaqCategoryId =
  | 'general'
  | 'studio'
  | 'interiors'
  | 'models'
  | 'prestige'
  | 'projects';

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
}

export const faqIntro =
  'Find answers to common questions about DX Interiors, our modules, and how we help developers, architects, and homeowners bring unbuilt homes to life.';

export const faqCategories: FaqCategory[] = [
  { id: 'general', label: 'General' },
  { id: 'studio', label: 'Studio' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'models', label: 'Models' },
  { id: 'prestige', label: 'Prestige' },
  { id: 'projects', label: 'Projects' },
];

/** Static FAQ content used as CMS fallback when the FAQ global has no items. */
export const faqItems: FaqItem[] = [
  {
    id: 'general-1',
    category: 'general',
    question: 'What is DX Interiors?',
    answer:
      'DX Interiors is a collaborative project intelligence platform that replaces uncertainty with a single source of truth. We transform complex project data into clear, interactive visualisations and models, providing clarity and alignment for every stakeholder from concept to completion.',
  },
  {
    id: 'general-2',
    category: 'general',
    question: 'What makes DX Interiors different from other platforms?',
    answer:
      'We go beyond creating pretty pictures. While our visualisations are stunning, our core strength is building certainty. DX Interiors integrates design, data, and supply chain into one collaborative platform, aligning every team, preventing miscommunication, and turning complex projects into predictable successes.',
  },
  {
    id: 'general-3',
    category: 'general',
    question: 'How can developers benefit from DX Interiors?',
    answer:
      'Accelerate your sales cycle and secure investor funding faster. DX Interiors de-risks your project with data-rich, compelling visualisations that build trust and confidence, helping you pre-sell units and demonstrate clear project viability.',
  },
  {
    id: 'general-4',
    category: 'general',
    question: 'How does DX Interiors help architects and designers?',
    answer:
      'DX Interiors ensures your creative intent is understood and executed perfectly by clients, engineers, and builders, eliminating costly misinterpretations and change orders.',
  },
  {
    id: 'general-5',
    category: 'general',
    question: 'What advantages does DX Interiors offer to custom builders?',
    answer:
      'Streamline your entire construction process. By integrating seamlessly with your suppliers and providing a clear visual plan, we help you reduce errors, avoid delays, and keep projects on schedule and on budget.',
  },
  {
    id: 'general-6',
    category: 'general',
    question: 'Why should a homeowner use DX Interiors?',
    answer:
      'Be certain about every choice, from floorboards to fixtures, before construction starts. Experience and explore your future home in immersive detail, allowing you to make informed decisions, visualise finishes, and eliminate the anxiety of the unknown.',
  },
  {
    id: 'general-7',
    category: 'general',
    question: 'How does DX Interiors protect my investment as a project investor?',
    answer:
      'Mitigate risk and maximize returns. Our data-driven models provide a clear, objective view of the project’s potential and progress, enabling you to make smarter, more confident investment decisions based on certainty, not just blueprints.',
  },
  {
    id: 'general-8',
    category: 'general',
    question: 'How can I contact DX Interiors support?',
    answer:
      'You can reach us by phone at 1800 333 539, send a message through our contact page, or use the live chat on this website. We’re happy to help with product questions, project enquiries, and partnership opportunities.',
  },
  {
    id: 'general-9',
    category: 'general',
    question: 'Where is the DX Interiors office located?',
    answer:
      'Our office is at 44 Lakeview Drive, Scoresby VIC 3179, Australia. You’re welcome to get in touch ahead of a visit so we can arrange the right team for your enquiry.',
  },
  {
    id: 'general-10',
    category: 'general',
    question: 'Can my clients upload their own content?',
    answer:
      'Yes. Depending on your plan and module, clients and collaborators can share project materials, finishes preferences, and reference content so teams stay aligned. Speak with our team to confirm which upload options best suit your workflow.',
  },
  {
    id: 'studio-1',
    category: 'studio',
    question: 'What is DX Studio?',
    answer:
      'DX Studio combines decades of construction expertise with advanced visualisation and planning technology. We help you foresee challenges, enhance efficiency, and deliver flawless execution on high-end residential projects.',
  },
  {
    id: 'studio-2',
    category: 'studio',
    question: 'Who is DX Studio for?',
    answer:
      'DX Studio supports builders, architects, developers, and homeowners who need high-end residential clarity — from planning through construction — with visualisation, foresight, and collaborative tools.',
  },
  {
    id: 'studio-3',
    category: 'studio',
    question: 'What makes DX Studio different?',
    answer:
      'With master craftsmanship insight, foresight for flawless execution, uncompromising visual communication, and agile collaboration, DX Studio helps you anticipate risk, communicate clearly, and stay true to design intent throughout the build.',
  },
  {
    id: 'studio-4',
    category: 'studio',
    question: 'What services do you offer in DX Studio?',
    answer:
      'Our services span pre-tender to construction, including master plan programs and scenario analysis, photorealistic interior and exterior renders, 3D models and 4D interactive tours, site management plans, cash flow and resource analysis, program validation, progress videos, and interactive live models.',
  },
  {
    id: 'studio-5',
    category: 'studio',
    question: 'How does DX Studio improve my project?',
    answer:
      'We reduce risks, save time and money, and improve communication by providing clarity at every stage. This supports confident decision-making, efficient workflows, and alignment among all stakeholders.',
  },
  {
    id: 'studio-6',
    category: 'studio',
    question: 'Do you offer subscriptions for DX Studio?',
    answer:
      'Yes. Our subscription plans provide ongoing access to visualisation tools, models, and insights tailored to your project’s needs, ensuring continuous clarity from design through construction.',
  },
  {
    id: 'studio-7',
    category: 'studio',
    question: 'How do I get started with DX Studio?',
    answer:
      'Connect with us to discuss your project. We’ll recommend the right mix of services and tools to help you build smarter, visualise perfectly, and deliver flawlessly.',
  },
  {
    id: 'studio-8',
    category: 'studio',
    question: 'Can DX Studio help before construction begins?',
    answer:
      'Absolutely. DX Studio is designed to surface risks, validate programmes, and align stakeholders early — so issues are resolved before they become costly on site.',
  },
  {
    id: 'studio-9',
    category: 'studio',
    question: 'Does DX Studio work with my existing design team?',
    answer:
      'Yes. Studio is built for collaboration across architects, builders, developers, and consultants, helping everyone share a common visual and data-led understanding of the project.',
  },
  {
    id: 'studio-10',
    category: 'studio',
    question: 'Is DX Studio only for high-end residential work?',
    answer:
      'DX Studio is optimised for high-end residential projects where precision, finish quality, and stakeholder alignment matter most. Talk to us if you have a specialised project and we’ll advise on fit.',
  },
  {
    id: 'interiors-1',
    category: 'interiors',
    question: 'What is DX Interiors?',
    answer:
      'DX Interiors helps homeowners, designers, and suppliers explore finishes and products in realistic settings — bridging creative ideas with real-world materials so every detail is beautiful and buildable.',
  },
  {
    id: 'interiors-2',
    category: 'interiors',
    question: 'How does DX Interiors benefit homeowners and designers?',
    answer:
      'Validate design ideas before committing, access real materials and supplier products, and start with a free plan to experiment or unlock premium access for a fuller library of products and finishes.',
  },
  {
    id: 'interiors-3',
    category: 'interiors',
    question: 'What are the benefits for suppliers?',
    answer:
      'Boost purchase intent by letting clients visualise products in real design settings, strengthen partnerships with developers and designers, and streamline the marketing-to-sales funnel with clearer demand insights.',
  },
  {
    id: 'interiors-4',
    category: 'interiors',
    question: 'What’s the difference between Free and Premium plans?',
    answer:
      'The Free plan provides essential tools to test and experiment with design ideas. Premium unlocks fuller supplier product catalogues, finishes, and advanced visualisation tools for personalised, future-ready interiors.',
  },
  {
    id: 'interiors-5',
    category: 'interiors',
    question: 'Who should use DX Interiors?',
    answer:
      'Homeowners designing with confidence, architects and designers validating concepts immersively, and suppliers or brands seeking digital-first exposure on live projects.',
  },
  {
    id: 'interiors-6',
    category: 'interiors',
    question: 'How is DX Interiors different from mood boards?',
    answer:
      'DX Interiors goes beyond inspiration boards. It connects creativity with real-world materials so every design detail is both beautiful and buildable.',
  },
  {
    id: 'interiors-7',
    category: 'interiors',
    question: 'How do I get started with DX Interiors?',
    answer:
      'Choose your Free or Premium plan and begin exploring. Whether you’re designing, showcasing, or sourcing, DX Interiors makes interiors real, interactive, and future-proof.',
  },
  {
    id: 'interiors-8',
    category: 'interiors',
    question: 'Can I see supplier products in a real room context?',
    answer:
      'Yes. DX Interiors is built so products and finishes can be reviewed in realistic spatial contexts, helping clients understand how materials feel in a finished home.',
  },
  {
    id: 'interiors-9',
    category: 'interiors',
    question: 'Does DX Interiors support collaboration?',
    answer:
      'Yes. Designers, homeowners, and project teams can align on finishes and products earlier, reducing late-stage changes and miscommunication.',
  },
  {
    id: 'interiors-10',
    category: 'interiors',
    question: 'Can suppliers list their catalogues on DX Interiors?',
    answer:
      'Yes. Suppliers can feature products for greater exposure across DX Interiors experiences. Apply via our suppliers pathway or contact the team to discuss partnership options.',
  },
  {
    id: 'models-1',
    category: 'models',
    question: 'What is DX Model?',
    answer:
      'DX Model is a web-based design and visualisation platform that lets you experiment with interior ideas in real time — swap finishes, rearrange furniture, adjust lighting, and experience spaces in photorealistic walkthroughs.',
  },
  {
    id: 'models-2',
    category: 'models',
    question: 'How does DX Model benefit homeowners?',
    answer:
      'Experiment freely with layouts and finishes without costly mistakes, visualise your space before you build, and upgrade to unlock a wider range of supplier products for a truly personalised space.',
  },
  {
    id: 'models-3',
    category: 'models',
    question: 'How does DX Model benefit suppliers and trade professionals?',
    answer:
      'Gain exposure across DX experiences, showcase products in photorealistic settings, convert visual interest into sales, collaborate with project teams, and track demand trends.',
  },
  {
    id: 'models-4',
    category: 'models',
    question: 'Can I collaborate with professionals on DX Model?',
    answer:
      'Yes. DX Model creates a collaborative ecosystem where homeowners, designers, architects, and builders can work together in real time so vision stays aligned with expert input.',
  },
  {
    id: 'models-5',
    category: 'models',
    question: 'Is DX Model available in the browser?',
    answer:
      'Yes. DX Model is designed as a web-based experience so teams can explore and iterate without specialised local hardware setups for everyday use.',
  },
  {
    id: 'models-6',
    category: 'models',
    question: 'Can I change finishes and furniture in real time?',
    answer:
      'Yes. Swap finishes, rearrange furniture, and adjust lighting to compare options quickly and make decisions with greater confidence.',
  },
  {
    id: 'models-7',
    category: 'models',
    question: 'Does DX Model support immersive walkthroughs?',
    answer:
      'Yes. Explore spaces through photorealistic walkthrough experiences so stakeholders can understand scale, light, and finish choices before construction.',
  },
  {
    id: 'models-8',
    category: 'models',
    question: 'How do I upgrade for premium product access?',
    answer:
      'Premium access unlocks a broader library of supplier products and finishes. Contact us or start from the model experience to review plan options that fit your project.',
  },
  {
    id: 'models-9',
    category: 'models',
    question: 'Is DX Model suitable for sales presentations?',
    answer:
      'Yes. Interactive models help developers and sales teams communicate options clearly, reduce misunderstanding, and accelerate buyer confidence.',
  },
  {
    id: 'models-10',
    category: 'models',
    question: 'How do I get started with DX Model?',
    answer:
      'Begin from our Model experience or speak with the DX Interiors team. We’ll help you choose the right setup for homeowner exploration, designer collaboration, or sales presentation.',
  },
  {
    id: 'prestige-1',
    category: 'prestige',
    question: 'What is DX Prestige?',
    answer:
      'DX Prestige delivers elevated visualisation and presentation experiences for discerning residential projects — helping teams communicate luxury detail, atmosphere, and intent with exceptional clarity.',
  },
  {
    id: 'prestige-2',
    category: 'prestige',
    question: 'Who is DX Prestige designed for?',
    answer:
      'Prestige is for developers, architects, and sales teams working on high-end residential projects where presentation quality and buyer confidence are critical.',
  },
  {
    id: 'prestige-3',
    category: 'prestige',
    question: 'How is Prestige different from Studio or Model?',
    answer:
      'Studio focuses on construction foresight and delivery clarity, Model supports interactive design exploration, and Prestige elevates presentation and sales-ready experiences for premium projects.',
  },
  {
    id: 'prestige-4',
    category: 'prestige',
    question: 'Can Prestige support off-the-plan sales?',
    answer:
      'Yes. High-fidelity visualisation helps buyers understand unbuilt homes with confidence, supporting stronger off-the-plan engagement and decision-making.',
  },
  {
    id: 'prestige-5',
    category: 'prestige',
    question: 'Does Prestige integrate with other DX Interiors modules?',
    answer:
      'Yes. Prestige sits within the broader DX Interiors platform so project intelligence, interiors, and model experiences can work together where your workflow requires it.',
  },
  {
    id: 'prestige-6',
    category: 'prestige',
    question: 'What kind of visuals can Prestige deliver?',
    answer:
      'Expect refined stills, immersive experiences, and presentation assets tailored to communicate premium residential quality — from finishes to atmosphere and spatial flow.',
  },
  {
    id: 'prestige-7',
    category: 'prestige',
    question: 'How early in a project should we engage Prestige?',
    answer:
      'Engage as soon as clear design direction and sales or stakeholder communication goals are defined. Earlier clarity reduces revisions and accelerates alignment.',
  },
  {
    id: 'prestige-8',
    category: 'prestige',
    question: 'Can Prestige help with investor presentations?',
    answer:
      'Yes. Compelling, precise visuals give investors a clearer view of project quality and intent, supporting more confident decisions.',
  },
  {
    id: 'prestige-9',
    category: 'prestige',
    question: 'Is Prestige customisable to our brand?',
    answer:
      'We tailor experiences to your project narrative and presentation needs. Speak with our team about how Prestige should represent your brand and product.',
  },
  {
    id: 'prestige-10',
    category: 'prestige',
    question: 'How do I enquire about DX Prestige?',
    answer:
      'Reach out through our contact page, call 1800 333 539, or start a chat. Share your project stage and goals and we’ll recommend the right Prestige pathway.',
  },
  {
    id: 'projects-1',
    category: 'projects',
    question: 'Where can I see DX Interiors projects?',
    answer:
      'Visit our Projects page to explore selected work and understand how DX Interiors supports residential developments with clarity before construction begins.',
  },
  {
    id: 'projects-2',
    category: 'projects',
    question: 'What types of projects does DX Interiors support?',
    answer:
      'We focus on discerning residential projects — from custom homes to multi-unit developments — where visualisation, data, and collaboration create real delivery advantage.',
  },
  {
    id: 'projects-3',
    category: 'projects',
    question: 'Can DX Interiors support my project before I have full documentation?',
    answer:
      'Yes. Early engagement often delivers the most value. We can help clarify options, communicate intent, and align stakeholders while documentation is still evolving.',
  },
  {
    id: 'projects-4',
    category: 'projects',
    question: 'How do I start a project with DX Interiors?',
    answer:
      'Contact our team with a brief overview of your project, timeline, and goals. We’ll recommend the right modules and next steps.',
  },
  {
    id: 'projects-5',
    category: 'projects',
    question: 'Do you work with interstate projects?',
    answer:
      'Yes. DX Interiors supports projects across Australia. Digital collaboration and visualisation tools make it practical to engage teams wherever they are based.',
  },
  {
    id: 'projects-6',
    category: 'projects',
    question: 'Can multiple stakeholders access the same project experience?',
    answer:
      'Yes. Shared clarity is central to DX Interiors. Architects, developers, builders, suppliers, and clients can align around a common visual source of truth.',
  },
  {
    id: 'projects-7',
    category: 'projects',
    question: 'How long does a typical engagement take?',
    answer:
      'Timelines vary by module, scope, and project stage. After an initial conversation we provide a clear pathway and expected delivery windows for your goals.',
  },
  {
    id: 'projects-8',
    category: 'projects',
    question: 'Can DX Interiors integrate with my existing consultants?',
    answer:
      'Yes. We work alongside your existing design, construction, and sales teams to strengthen communication rather than replace proven project relationships.',
  },
  {
    id: 'projects-9',
    category: 'projects',
    question: 'Do you offer project demos?',
    answer:
      'Yes. We can walk you through relevant experiences so you can see how DX Interiors would support your development, interiors journey, or sales presentation.',
  },
  {
    id: 'projects-10',
    category: 'projects',
    question: 'Who do I contact for partnership or project enquiries?',
    answer:
      'Use the contact page, call 1800 333 539, or open live chat. For supplier partnerships, you can also start through our Apply / Suppliers pathway.',
  },
];
