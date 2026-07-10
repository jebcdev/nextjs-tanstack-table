//  import { generateAsyncTitle,generateAsyncDescription } from "@/lib/seo";

export const APP_NAME = "NextJS Tanstack Query|Table";
export const APP_DESCRIPTION =
    "NextJS Tanstack Query|Table Probando el funcionamiento y por supuesto ApReNdIeNdO!.";

const generateTitle = (title?: string) => {
    return title ? `${title} | ${APP_NAME}` : APP_NAME;
};

const generateDescription = (description?: string) => {
    return description || APP_DESCRIPTION;
};

const generateAsyncTitle = async (
    title?: string,
): Promise<string> => {
    return title ? `${title} | ${APP_NAME}` : APP_NAME;
};

const generateAsyncDescription = async (
    description?: string,
): Promise<string> => {
    return description || APP_DESCRIPTION;
};

export {
    generateTitle,
    generateDescription,
    generateAsyncTitle,
    generateAsyncDescription,
};
