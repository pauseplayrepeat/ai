const { PrismaClient } = require ("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Mixing" },
                { name: "Mastering" },
                { name: "Synthesis and Sound Design" },
                { name: "Drum Programming" },
                { name: "Vocal Production" },
                { name: "Ableton" },
                { name: "FL Studio" },
                { name: "Logic" },
            ]
        });

    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();