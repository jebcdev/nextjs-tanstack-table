import type { Metadata } from "next";
import {
    generateAsyncTitle,
    generateAsyncDescription,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const title = await generateAsyncTitle("Inicio");
    const description = await generateAsyncDescription(
        "Inicio de la aplicación",
    );
    return {
        title,
        description,
    };
}

export default function HomePage() {
    return (
        <>
            <main>
                <h1>Inicio</h1>
            </main>
        </>
    );
}
