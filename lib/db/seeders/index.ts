"use server";

import { seedCategoriesAndProducts } from "./categories-products.seeder";

const main = async () => {
    console.log("🌱 Starting seed...");

    await seedCategoriesAndProducts();

    console.log("✅ Seed completed!");
};

main().catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
});
