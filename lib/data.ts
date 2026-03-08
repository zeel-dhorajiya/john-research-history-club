export type ContentBlock =
    | { type: 'heading'; text: string; level: 2 | 3 }
    | { type: 'paragraph'; text: string }
    | { type: 'image'; src: string; alt: string; caption?: string }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'divider' };

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    categorySlug: string;
    image: string;
    readingTime: number;
    publishedAt: string;
    featured: boolean;
    content: ContentBlock[];
}

export interface Category {
    slug: string;
    name: string;
    description: string;
    icon: string;
    articleCount: number;
}

export const categories: Category[] = [
    {
        slug: 'ancient-civilizations',
        name: 'Ancient Civilizations',
        description: 'Explore the mysteries of lost empires and forgotten worlds.',
        icon: 'temple',
        articleCount: 12,
    },
    {
        slug: 'empires',
        name: 'Empires',
        description: 'The rise and fall of the greatest powers in history.',
        icon: 'crown',
        articleCount: 9,
    },
    {
        slug: 'war-and-battles',
        name: 'War & Battles',
        description: 'Battles that changed the course of civilization.',
        icon: 'swords',
        articleCount: 14,
    },
    {
        slug: 'archaeology',
        name: 'Archaeology',
        description: 'Unearthing the artifacts that define our past.',
        icon: 'shovel',
        articleCount: 7,
    },
    {
        slug: 'historical-figures',
        name: 'Historical Figures',
        description: 'The men and women who shaped the world we know.',
        icon: 'person',
        articleCount: 11,
    },
];

export const articles: Article[] = [
    {
        slug: 'fall-of-ancient-egypt',
        title: 'The Fall of Ancient Egypt',
        excerpt:
            'How one of the most powerful civilizations in human history crumbled under the weight of political intrigue, invasion, and internal collapse.',
        category: 'Ancient Civilizations',
        categorySlug: 'ancient-civilizations',
        image: '/hero_ancient_egypt.png',
        readingTime: 8,
        publishedAt: '2026-02-10',
        featured: true,
        content: [
            {
                type: 'paragraph',
                text: 'Ancient Egypt stood for over three millennia as one of history\'s most enduring civilizations. Yet even the most powerful empires eventually fall — and Egypt\'s story is no exception.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Seeds of Decline',
            },
            {
                type: 'paragraph',
                text: 'By the Third Intermediate Period (c. 1070–664 BCE), Egypt had already begun to fragment. The unified authority of the pharaoh was eroded by powerful priests of Amun, provincial governors who acted as independent rulers, and foreign mercenaries who held increasing sway over the military.',
            },
            {
                type: 'quote',
                text: 'A great civilization is not conquered from without until it has destroyed itself from within.',
                author: 'Will Durant',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Foreign Invasions',
            },
            {
                type: 'paragraph',
                text: 'The Assyrians struck first, sacking Thebes in 663 BCE and reducing Egypt to a vassal state. Though Egypt briefly regained independence under the Saite Dynasty, the writing was on the wall. The Persian Empire under Cambyses II conquered Egypt in 525 BCE, and centuries of foreign rule followed: Persian, Greek, and finally Roman domination.',
            },
            {
                type: 'image',
                src: '/hero_ancient_egypt.png',
                alt: 'The pyramids of Giza at dawn',
                caption: 'The Giza Necropolis — eternal monuments to a civilization that once ruled the world.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Cleopatra and the Final Chapter',
            },
            {
                type: 'paragraph',
                text: 'The last ruler of an independent Egypt was the legendary Cleopatra VII. Her attempts to use Roman power — first through Julius Caesar, then through Mark Antony — to preserve Egyptian sovereignty ultimately failed. After the Battle of Actium in 31 BCE and Antony\'s defeat, Cleopatra took her own life. Egypt became a Roman province.',
            },
            {
                type: 'paragraph',
                text: 'And yet, even in death, Ancient Egypt never truly disappeared. Its art, religion, and architecture influenced every civilization that followed. The pyramids still stand. The Nile still flows. The legacy of the pharaohs endures in our collective imagination — a testament to what humanity can build when it dreams big enough.',
            },
            { type: 'divider' },
            {
                type: 'quote',
                text: 'Egypt gave the world a mirror in which it saw the best of what it could become.',
                author: 'John JHRC Research',
            },
        ],
    },
    {
        slug: 'rise-of-the-roman-empire',
        title: 'Rise of the Roman Empire',
        excerpt:
            'From a collection of villages on the banks of the Tiber to masters of the known world — the extraordinary rise of Rome is history\'s most ambitious story.',
        category: 'Empires',
        categorySlug: 'empires',
        image: '/hero_roman_empire.png',
        readingTime: 10,
        publishedAt: '2026-02-15',
        featured: true,
        content: [
            {
                type: 'paragraph',
                text: 'Rome was not built in a day — the old adage rings true. The Roman Empire\'s ascent spans over seven centuries of warfare, politics, engineering, and sheer will. What began as a pastoral settlement in central Italy became the most extensive political and social structure in Western civilization.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Republic That Became an Empire',
            },
            {
                type: 'paragraph',
                text: 'For nearly 500 years, Rome was governed as a Republic. The Senate, the consuls, and the complex machinery of Roman governance produced a culture of civic duty and martial excellence. It was conquest that enriched the Republic, and conquest that ultimately broke it.',
            },
            {
                type: 'quote',
                text: 'I found Rome a city of bricks and left it a city of marble.',
                author: 'Augustus Caesar',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Augustus and the Pax Romana',
            },
            {
                type: 'paragraph',
                text: 'When Octavian — soon to be Augustus — defeated Mark Antony and Cleopatra in 31 BCE, he inherited a world exhausted by civil war. His genius lay not in conquest but in consolidation. He reorganized the army, reformed taxation, built infrastructure, and created the conditions for 200 years of relative peace known as the Pax Romana.',
            },
            {
                type: 'image',
                src: '/hero_roman_empire.png',
                alt: 'The Roman Colosseum at dusk',
                caption: 'The Colosseum — symbol of Roman power, ambition, and the complexity of empire.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Engineering an Empire',
            },
            {
                type: 'paragraph',
                text: 'Rome\'s true genius was its infrastructure. Roads that stretched from Scotland to Mesopotamia. Aqueducts that brought clean water to millions. Legal codes that still form the foundation of Western law. The Roman Empire was as much an administrative achievement as a military one.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'The echoes of Rome are everywhere — in our languages, our laws, our architecture, the very calendar by which we structure our days. To understand the modern West is, in large part, to understand Rome.',
            },
        ],
    },
    {
        slug: 'alexander-the-great',
        title: 'Alexander the Great: Conqueror of the World',
        excerpt:
            'In just 13 years, Alexander of Macedon built the largest empire the ancient world had ever seen — and changed the course of history forever.',
        category: 'Historical Figures',
        categorySlug: 'historical-figures',
        image: '/hero_alexander.png',
        readingTime: 9,
        publishedAt: '2026-02-20',
        featured: true,
        content: [
            {
                type: 'paragraph',
                text: 'Born in 356 BCE in Pella, Macedonia, Alexander III would go on to become the most celebrated military commander in history. Tutored by Aristotle, inspired by Achilles, and driven by an insatiable hunger for conquest, he carved an empire that stretched from Greece to India.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Young Conqueror',
            },
            {
                type: 'paragraph',
                text: 'Alexander took the throne at just 20 years old after the assassination of his father, Philip II. Within two years, he had consolidated Macedonian power over Greece and launched his life\'s great ambition: the destruction of the Persian Empire.',
            },
            {
                type: 'quote',
                text: 'There is nothing impossible to him who will try.',
                author: 'Alexander the Great',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Persian Campaigns',
            },
            {
                type: 'paragraph',
                text: 'Alexander\'s campaign against Persia was a masterclass in military strategy. The battles of Granicus, Issus, and Gaugamela — each against odds that would have deterred lesser generals — ended with the collapse of the Achaemenid Empire, the greatest power the world had ever seen.',
            },
            {
                type: 'image',
                src: '/hero_alexander.png',
                alt: 'Alexander the Great in battle',
                caption: 'Alexander at the Battle of Issus — where he faced and defeated the Persian king Darius III.',
            },
            {
                type: 'paragraph',
                text: 'He did not stop at Persia. Egypt welcomed him as a liberator and pharaoh. He pushed east into Bactria and India, winning battles at the very edges of the known world. Only the mutiny of his exhausted troops forced him to turn back.',
            },
            { type: 'divider' },
            {
                type: 'quote',
                text: 'He was, in a word, unbeatable in war and uncontrollable in peace.',
                author: 'Plutarch',
            },
        ],
    },
    {
        slug: 'mysteries-of-the-indus-valley',
        title: 'Mysteries of the Indus Valley Civilization',
        excerpt:
            'The Indus Valley civilization was one of the world\'s earliest urban cultures — and one of its most mysterious. Who were they, and where did they go?',
        category: 'Ancient Civilizations',
        categorySlug: 'ancient-civilizations',
        image: '/hero_indus_valley.png',
        readingTime: 7,
        publishedAt: '2026-02-25',
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: 'Along the floodplains of the Indus River, in what is now Pakistan and northwestern India, a remarkable urban civilization flourished between 3300 and 1300 BCE. The Indus Valley Civilization — also called the Harappan Civilization — was one of the world\'s first great urban cultures, and one of its most baffling.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Cities Before Their Time',
            },
            {
                type: 'paragraph',
                text: 'Mohenjo-daro and Harappa, the civilization\'s two great cities, reveal an astonishing level of urban planning. Grid-pattern streets, sophisticated drainage systems, standardized brick sizes, public baths, and granaries — all evidence of a society with advanced civic organization and shared cultural norms.',
            },
            {
                type: 'quote',
                text: 'The Indus Valley people were, in their own way, as sophisticated as the Egyptians or the Mesopotamians.',
                author: 'Dr. Jonathan Mark Kenoyer',
            },
            {
                type: 'image',
                src: '/hero_indus_valley.png',
                alt: 'Ruins of Mohenjo-daro',
                caption: 'The Great Bath at Mohenjo-daro — evidence of a civilization obsessed with cleanliness and ritual.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Undeciphered Script',
            },
            {
                type: 'paragraph',
                text: 'One of history\'s greatest unsolved mysteries is the Indus script. Over 400 signs carved onto thousands of seals remain undeciphered to this day. Without being able to read their writing, we cannot know their language, their history as they told it, or the names of their leaders and gods.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'Around 1900 BCE, the civilization began to decline. Climate change, shifting river courses, and possibly migration are all proposed explanations. The people dispersed. The cities were abandoned. And for over 3,000 years, the world forgot the Indus Valley — until archaeology brought it back to light.',
            },
        ],
    },
    {
        slug: 'battle-of-thermopylae',
        title: 'The Battle of Thermopylae: 300 Against a Million',
        excerpt:
            'In 480 BCE, a small force of Greek warriors stood against the largest army the world had ever assembled. Their defeat became history\'s greatest moral victory.',
        category: 'War & Battles',
        categorySlug: 'war-and-battles',
        image: '/hero_warfare.png',
        readingTime: 6,
        publishedAt: '2026-03-01',
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: 'The Persian king Xerxes I assembled an army of unprecedented size to crush the Greeks who had humiliated his father at Marathon. The number most cited by ancient sources — 1.7 million soldiers — is certainly an exaggeration, but the Persian force was immense. Greece faced annihilation.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Hot Gates',
            },
            {
                type: 'paragraph',
                text: 'Thermopylae — the "Hot Gates" — was a narrow coastal pass where the mountains of Greece came down to the sea. Here, a force of approximately 7,000 Greeks, led by Spartan King Leonidas and his 300 elite warriors, blocked the Persian advance for three days.',
            },
            {
                type: 'quote',
                text: 'Come back with your shield, or on it.',
                author: 'Spartan saying',
            },
            {
                type: 'image',
                src: '/hero_warfare.png',
                alt: 'Ancient battle scene',
                caption: 'The narrow pass of Thermopylae turned Persian numbers into a disadvantage — until the Greeks were betrayed.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'A Greek traitor named Ephialtes revealed a mountain path that allowed the Persians to outflank the defenders. Leonidas, knowing the battle was lost, dismissed most of the Greek force and stayed with his 300 Spartans to fight to the last, buying time for Greece to survive.',
            },
        ],
    },
    {
        slug: 'secrets-of-the-terracotta-army',
        title: 'Secrets of the Terracotta Army',
        excerpt:
            'In 1974, farmers digging a well near Xi\'an, China, stumbled upon one of the greatest archaeological finds of the 20th century.',
        category: 'Archaeology',
        categorySlug: 'archaeology',
        image: '/hero_archaeology.png',
        readingTime: 7,
        publishedAt: '2026-03-05',
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: 'In the spring of 1974, a group of farmers digging a water well near the city of Xi\'an in central China broke through into an underground chamber. Inside lay thousands of life-sized clay warriors — soldiers, horses, chariots — standing in battle formation, silent for 2,200 years.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'An Emperor\'s Eternal Army',
            },
            {
                type: 'paragraph',
                text: 'The Terracotta Army was commissioned by Qin Shi Huang, China\'s first emperor, to accompany him in the afterlife and protect his eternal reign. Over 8,000 soldiers, 130 chariots, and 670 horses have been excavated — and archaeologists believe more remain buried.',
            },
            {
                type: 'quote',
                text: 'The discovery of the Terracotta Army is the eighth wonder of the world.',
                author: 'Jacques Chirac, former President of France',
            },
            {
                type: 'image',
                src: '/hero_archaeology.png',
                alt: 'Archaeological excavation',
                caption: 'The scale of the Qin Mausoleum complex is barely hinted at by what has been excavated so far.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Individual Faces, Collective Wonder',
            },
            {
                type: 'paragraph',
                text: 'What makes the Terracotta Army extraordinary is the individuality of each figure. No two faces are the same. Warriors\' expressions, hairstyles, and armor details vary widely — suggesting they were modeled on real soldiers. Each figure was originally brightly painted, though the pigments faded upon exposure to air.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'Advanced non-invasive surveys suggest the main burial chamber of Qin Shi Huang himself — described by ancient texts as containing rivers of mercury, a jeweled ceiling representing the night sky, and untold riches — remains unexcavated, its secrets intact.',
            },
        ],
    },
    {
        slug: 'genghis-khan-mongol-empire',
        title: 'Genghis Khan and the World Conquest',
        excerpt:
            'No ruler in history conquered more territory than Genghis Khan. His Mongol Empire remade the political, cultural, and demographic map of the world.',
        category: 'Empires',
        categorySlug: 'empires',
        image: '/hero_mongol.png',
        readingTime: 11,
        publishedAt: '2026-03-08',
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: 'Temüjin — born around 1162 on the windswept steppes of Mongolia — rose from an abandoned orphan to become the supreme ruler of the Mongol tribes. He united the feuding clans under a single banner, gave himself the title Genghis Khan ("Universal Ruler"), and launched the most extensive land conquest in history.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'Military Innovation',
            },
            {
                type: 'paragraph',
                text: 'The Mongol army was perhaps the finest military machine of the medieval world. Its core was the mounted archer — warriors who had spent their entire lives on horseback, capable of firing arrows with lethal accuracy at full gallop. But the Mongols also adapted rapidly, adopting Chinese siege technology to reduce fortified cities.',
            },
            {
                type: 'quote',
                text: 'The greatest happiness is to vanquish your enemies, to chase them before you, to rob them of their wealth.',
                author: 'Genghis Khan',
            },
            {
                type: 'image',
                src: '/hero_mongol.png',
                alt: "Mongol cavalry on the steppe",
                caption: 'The Mongol cavalry moved with a speed and coordination that conventional armies could not match.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Pax Mongolica',
            },
            {
                type: 'paragraph',
                text: 'At its height, the Mongol Empire stretched from the Pacific Ocean to Eastern Europe — an area of over 24 million square kilometers. But conquest was not the only legacy. Under Mongol rule, the Silk Road became safe for travelers for the first time in centuries. Trade, ideas, and disease flowed between East and West, reshaping medieval civilization.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'Modern genetic research suggests that around 16 million men alive today are direct descendants of Genghis Khan — a testament to the extraordinary reach of his legacy, for better and for worse.',
            },
        ],
    },
    {
        slug: 'cleopatra-queen-of-egypt',
        title: 'Cleopatra: The Last Pharaoh',
        excerpt:
            'More than just a love interest for Roman generals, Cleopatra VII was a brilliant ruler, a master of statecraft, and the last of an ancient royal line.',
        category: 'Historical Figures',
        categorySlug: 'historical-figures',
        image: '/hero_figures.png',
        readingTime: 8,
        publishedAt: '2026-03-06',
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: 'History has not been kind to Cleopatra VII. Reduced by time — and Hollywood — to a seductress of Roman generals, the real Cleopatra was one of antiquity\'s most brilliant political minds. She was fluent in nine languages, well-versed in mathematics, philosophy, and oratory, and completely devoted to preserving Egyptian independence against overwhelming Roman power.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'A Queen in Exile',
            },
            {
                type: 'paragraph',
                text: 'When her brother Ptolemy XIII had her exiled, Cleopatra did not give up. She smuggled herself into the palace at Alexandria to meet Julius Caesar — wrapped in a carpet, according to legend — and convinced the most powerful man in the world to support her cause. Caesar restored her to the throne.',
            },
            {
                type: 'quote',
                text: 'She had a beautiful face and a most charming voice. It was a pleasure merely to hear the sound of her voice.',
                author: 'Plutarch',
            },
            {
                type: 'image',
                src: '/hero_figures.png',
                alt: 'Portrait of historical figures',
                caption: 'Cleopatra was the last of the Ptolemaic dynasty — Greek rulers who had governed Egypt for nearly 300 years.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'After Caesar\'s assassination, she allied with Mark Antony, Caesar\'s successor in the East. Together they ruled over a vast territory, had three children, and dreamed of a dual empire to rival Rome. When Octavian\'s forces defeated them at Actium in 31 BCE, Cleopatra chose death over the humiliation of being paraded through Rome as a conquered queen.',
            },
        ],
    },
    {
        slug: 'lost-city-of-pompeii',
        title: 'Pompeii: The City Frozen in Time',
        excerpt:
            'When Mount Vesuvius erupted in 79 CE, it buried the Roman city of Pompeii in ash — preserving a snapshot of ancient life that archaeologists are still uncovering today.',
        category: 'Archaeology',
        categorySlug: 'archaeology',
        image: '/hero_roman_empire.png',
        readingTime: 6,
        publishedAt: '2026-03-07',
        featured: false,
        content: [
            {
                type: 'paragraph',
                text: 'On the morning of August 24, 79 CE, the residents of Pompeii woke to a normal day. By evening, their city — their homes, their shops, their temples, their bodies — would be sealed beneath four to six meters of volcanic ash and pumice. And there it would stay, preserved in extraordinary detail, for nearly 1,700 years.',
            },
            {
                type: 'heading',
                level: 2,
                text: 'The Eruption',
            },
            {
                type: 'paragraph',
                text: 'Vesuvius had not erupted in living memory, and many residents did not recognize the warning signs. The mountain began to rumble in the morning; by afternoon it had unleashed a column of ash 33 kilometers into the sky. Superheated pyroclastic surges swept through the city, killing those who had not already fled.',
            },
            {
                type: 'quote',
                text: 'A darkness came which was not like a moonless or cloudy night, but like being in a completely sealed room with all the lamps out.',
                author: 'Pliny the Younger, eyewitness account',
            },
            {
                type: 'image',
                src: '/hero_roman_empire.png',
                alt: 'Ancient Roman ruins',
                caption: 'Pompeii\'s streets, forums, and homes give us an unparalleled window into daily Roman life.',
            },
            { type: 'divider' },
            {
                type: 'paragraph',
                text: 'Today, Pompeii is both a tragedy and a gift. The plaster casts of its victims — human forms preserved in the exact posture of their final moments — are among the most haunting artifacts in the world. The site continues to yield discoveries, including recent finds of intact rooms, food, and even graffiti that speak across 2,000 years.',
            },
        ],
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
    return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((c) => c.slug === slug);
}

export function getFeaturedArticles(): Article[] {
    return articles.filter((a) => a.featured);
}

export function getLatestArticles(count = 6): Article[] {
    return [...articles]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, count);
}
