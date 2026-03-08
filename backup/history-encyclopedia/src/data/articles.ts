export interface Article {
    slug: string;
    title: string;
    category: string;
    era: string;
    region: string;
    desc: string;
    img: string;
}

export const ARTICLES: Article[] = [
    {
        slug: "fall-of-carthage",
        title: "The Fall of Carthage",
        category: "WARFARE",
        era: "Antiquity",
        region: "Africa",
        desc: "A meticulous account of the Punic Wars and the final destruction of the North African empire.",
        img: "https://images.unsplash.com/photo-1549419194-e8f00db72f2d?q=80&w=1000&auto=format&fit=crop"
    },
    {
        slug: "viking-runes",
        title: "The Sagas of Viking Runes",
        category: "ARTIFACTS",
        era: "Medieval",
        region: "Europe",
        desc: "Deciphering the secret sagas and spiritual meanings carved into the monumental stones of the North.",
        img: "https://images.unsplash.com/photo-1599427303058-f04cbcf4753f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        slug: "library-alexandria",
        title: "The Library of Alexandria",
        category: "KNOWLEDGE",
        era: "Antiquity",
        region: "Egypt",
        desc: "Reconstructing the lost zenith of human wisdom in the ancient world's greatest center of learning.",
        img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop"
    },
    {
        slug: "roman-engineering",
        title: "The Foundations of Rome",
        category: "TECHNICAL",
        era: "Antiquity",
        region: "Europe",
        desc: "Exploring the aqueducts, arches, and revolutionary concrete that allowed Rome to build for eternity.",
        img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop"
    },
    {
        slug: "samurai-bushido",
        title: "The Way of the Warrior",
        category: "PHILOSOPHY",
        era: "Feudal",
        region: "Asia",
        desc: "Tracing the origins and extreme discipline of the Japanese Samurai and their code of Bushido.",
        img: "https://images.unsplash.com/photo-1563821731610-d9d3008447be?q=80&w=1000&auto=format&fit=crop"
    },
    {
        slug: "mesopotamian-math",
        title: "The Sexagesimal System",
        category: "SCIENCE",
        era: "Bronze Age",
        region: "Mesopotamia",
        desc: "How the Sumerians invented the base-60 system still used to measure our minutes and degrees.",
        img: "https://images.unsplash.com/photo-1533923304851-81d3d62325ce?q=80&w=1000&auto=format&fit=crop"
    }
];
