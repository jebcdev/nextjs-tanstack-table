/**
 * @fileoverview Seeder que limpia y crea datos de prueba.
 *   Genera 5 categorías y 30 productos (6 por categoría)
 *   con datos realistas del sector tecnológico en COP.
 * @module lib/db/seeders/categories-products
 *
 * @description
 * 1. Elimina todos los productos y categorías existentes
 * 2. Crea 5 categorías tecnológicas en paralelo
 * 3. Crea 6 productos por categoría (30 total) secuencialmente
 * 4. Retorna resumen de lo creado
 */

import { prismaDB } from "@/lib/db/prismaDB";

export const seedCategoriesAndProducts = async () => {
    try {
        console.log("🗑️  Cleaning categories and products...");

        // Limpiar en orden inverso por las FK
        await prismaDB.product.deleteMany({});
        await prismaDB.category.deleteMany({});

        console.log("✅ Cleaned!");

        const categoriesData = [
            {
                name: "Computadores y Portátiles",
                slug: "computadores-y-portatiles",
                description: "Equipos de cómputo, laptops y workstations para uso personal y profesional",
            },
            {
                name: "Smartphones y Tablets",
                slug: "smartphones-y-tablets",
                description: "Teléfonos inteligentes y tablets de las marcas más reconocidas",
            },
            {
                name: "Componentes y Hardware",
                slug: "componentes-y-hardware",
                description: "Piezas para ensamblar, actualizar y potenciar tu equipo",
            },
            {
                name: "Periféricos y Accesorios",
                slug: "perifericos-y-accesorios",
                description: "Teclados, ratones, monitores, audífonos y más accesorios tecnológicos",
            },
            {
                name: "Redes y Conectividad",
                slug: "redes-y-conectividad",
                description: "Routers, switches, cables y equipos para infraestructura de red",
            },
        ];

        console.log("📂 Creating categories...");
        // Crear categorías en paralelo para mejor performance
        const categories = await Promise.all(
            categoriesData.map((cat) =>
                prismaDB.category.create({ data: cat })
            )
        );
        console.log(`✅ Created ${categories.length} categories`);

        const productsData = [
            // 1. Computadores y Portátiles (index 0)
            {
                categoryIndex: 0,
                items: [
                    {
                        name: "MacBook Pro 14\" M3 Pro",
                        slug: "macbook-pro-14-m3-pro",
                        description: "Chip M3 Pro con CPU de 12 núcleos y GPU de 18 núcleos, 32GB RAM unificada, 512GB SSD, pantalla Liquid Retina XDR 14.2\"",
                        price: 8499000,
                    },
                    {
                        name: "Dell XPS 15 OLED",
                        slug: "dell-xps-15-oled",
                        description: "Intel Core i7-13700H, 16GB DDR5, 512GB SSD, pantalla 15.6\" OLED 3.5K táctil, NVIDIA GeForce RTX 4050",
                        price: 6299000,
                    },
                    {
                        name: "Lenovo ThinkPad X1 Carbon Gen 11",
                        slug: "lenovo-thinkpad-x1-carbon-gen-11",
                        description: "Intel Core i7-1365U, 16GB LPDDR5, 512GB SSD, pantalla 14\" 2.8K IPS, peso 1.12kg, batería 57Wh",
                        price: 7199000,
                    },
                    {
                        name: "HP Pavilion Gaming 15",
                        slug: "hp-pavilion-gaming-15",
                        description: "Intel Core i5-13420H, 16GB DDR4, 512GB SSD, NVIDIA GeForce RTX 3050 6GB, pantalla 15.6\" FHD 144Hz",
                        price: 3899000,
                    },
                    {
                        name: "ASUS ROG Zephyrus G14",
                        slug: "asus-rog-zephyrus-g14",
                        description: "AMD Ryzen 9 7940HS, 16GB DDR5, 1TB SSD, NVIDIA GeForce RTX 4060 8GB, pantalla 14\" QHD 165Hz",
                        price: 6799000,
                    },
                    {
                        name: "iMac 24\" M3",
                        slug: "imac-24-m3",
                        description: "Chip M3 con GPU de 8 núcleos, 8GB RAM unificada, 256GB SSD, pantalla Retina 4.5K 24\", colores vibrantes",
                        price: 7999000,
                    },
                ],
            },
            // 2. Smartphones y Tablets (index 1)
            {
                categoryIndex: 1,
                items: [
                    {
                        name: "Apple iPhone 15 Pro Max 256GB",
                        slug: "apple-iphone-15-pro-max-256gb",
                        description: "Chip A17 Pro, pantalla Super Retina XDR 6.7\" ProMotion, cámara triple 48MP, titanio natural, 256GB",
                        price: 6299000,
                    },
                    {
                        name: "Samsung Galaxy S24 Ultra 512GB",
                        slug: "samsung-galaxy-s24-ultra-512gb",
                        description: "Snapdragon 8 Gen 3, pantalla Dynamic AMOLED 2X 6.8\" QHD+ 120Hz, cámara 200MP, S Pen, 12GB RAM",
                        price: 5499000,
                    },
                    {
                        name: "Xiaomi 14 Pro 256GB",
                        slug: "xiaomi-14-pro-256gb",
                        description: "Snapdragon 8 Gen 3, pantalla AMOLED 6.73\" 2K 120Hz, cámara Leica 50MP, 12GB RAM, carga rápida 120W",
                        price: 3299000,
                    },
                    {
                        name: "Google Pixel 8 Pro 128GB",
                        slug: "google-pixel-8-pro-128gb",
                        description: "Google Tensor G3, pantalla Super Actua OLED 6.7\" QHD+ 120Hz, cámara 50MP, 12GB RAM, Android 14 puro",
                        price: 4199000,
                    },
                    {
                        name: "Apple iPad Air M2 11\" 128GB",
                        slug: "apple-ipad-air-m2-11-128gb",
                        description: "Chip M2, pantalla Liquid Retina 11\" 2360x1640, 128GB, WiFi 6E, lápiz USB-C compatible",
                        price: 3799000,
                    },
                    {
                        name: "Samsung Galaxy Tab S9 FE 128GB",
                        slug: "samsung-galaxy-tab-s9-fe-128gb",
                        description: "Exynos 1380, pantalla TFT 10.9\" 2304x1440, 6GB RAM, 128GB, S Pen incluido, resistencia IP68",
                        price: 1899000,
                    },
                ],
            },
            // 3. Componentes y Hardware (index 2)
            {
                categoryIndex: 2,
                items: [
                    {
                        name: "NVIDIA GeForce RTX 4090 24GB",
                        slug: "nvidia-geforce-rtx-4090-24gb",
                        description: "Arquitectura Ada Lovelace, 16384 CUDA cores, 24GB GDDR6X 384-bit, DLSS 3, Ray Tracing, 450W TDP",
                        price: 8999000,
                    },
                    {
                        name: "AMD Ryzen 9 7950X",
                        slug: "amd-ryzen-9-7950x",
                        description: "16 núcleos / 32 hilos, frecuencia base 4.5GHz / turbo 5.7GHz, 80MB caché, AM5, 170W TDP",
                        price: 2699000,
                    },
                    {
                        name: "Samsung 990 Pro 2TB NVMe SSD",
                        slug: "samsung-990-pro-2tb-nvme-ssd",
                        description: "PCIe 4.0 x4 NVMe 2.0, lecturas 7450MB/s, escrituras 6900MB/s, controlador Samsung Pascal, heatsink integrado",
                        price: 899000,
                    },
                    {
                        name: "Corsair Vengeance DDR5 32GB (2x16GB)",
                        slug: "corsair-vengeance-ddr5-32gb-2x16gb",
                        description: "DDR5 5600MHz, latencia CL36, perfil XMP 3.0, voltaje 1.25V, disipador de aluminio negro",
                        price: 499000,
                    },
                    {
                        name: "Intel Core i9-14900K",
                        slug: "intel-core-i9-14900k",
                        description: "24 núcleos (8P + 16E) / 32 hilos, frecuencia turbo 6.0GHz, 36MB caché L3, LGA1700, 253W TDP",
                        price: 2899000,
                    },
                    {
                        name: "ASUS ROG Strix Z790-E Gaming WiFi",
                        slug: "asus-rog-strix-z790-e-gaming-wifi",
                        description: "Chipset Z790, LGA1700, DDR5, PCIe 5.0, WiFi 6E, Bluetooth 5.3, 2.5Gb LAN, 4x M.2 NVMe",
                        price: 1899000,
                    },
                ],
            },
            // 4. Periféricos y Accesorios (index 3)
            {
                categoryIndex: 3,
                items: [
                    {
                        name: "Logitech MX Master 3S",
                        slug: "logitech-mx-master-3s",
                        description: "Ratón inalámbrico, sensor 8000 DPI, desplazamiento electromagnético MagSpeed, silencioso, USB-C, 70 días de batería",
                        price: 429000,
                    },
                    {
                        name: "Monitor Samsung Odyssey G7 27\" 4K",
                        slug: "monitor-samsung-odyssey-g7-27-4k",
                        description: "Panel IPS 27\" 4K UHD 3840x2160, 144Hz, 1ms, HDR600, G-Sync compatible, AMD FreeSync Premium Pro",
                        price: 2899000,
                    },
                    {
                        name: "Teclado Mecánico Keychron Q1 Pro",
                        slug: "teclado-mecanico-keychron-q1-pro",
                        description: "Teclado mecánico inalámbrico QMK/VIA, 75%, lubricado de fábrica, Gateron Jupiter Banana, aluminio CNC",
                        price: 849000,
                    },
                    {
                        name: "Audífonos Sony WH-1000XM5",
                        slug: "audifonos-sony-wh-1000xm5",
                        description: "Cancelación de ruido activa LDAC, controlador 30mm, 30h batería, carga rápida USB-C, plegables, negro",
                        price: 1499000,
                    },
                    {
                        name: "Webcam Logitech Brio 4K",
                        slug: "webcam-logitech-brio-4k",
                        description: "Resolución 4K Ultra HD 30fps / 1080p 60fps, campo visión 90°, autoenfoque, RightLight 3, micrófono dual",
                        price: 599000,
                    },
                    {
                        name: "Silla Ergonómica DXRacer Master Series",
                        slug: "silla-ergonomica-dxracer-master-series",
                        description: "Silla gaming/ejecutiva, reposabrazos 4D, soporte lumbar ajustable, respaldo reclinable 180°, capacidad 130kg",
                        price: 2299000,
                    },
                ],
            },
            // 5. Redes y Conectividad (index 4)
            {
                categoryIndex: 4,
                items: [
                    {
                        name: "Router TP-Link Archer AX73 AX5400",
                        slug: "router-tp-link-archer-ax73-ax5400",
                        description: "WiFi 6 AX5400 dual-band, 4 antenas externas, 4 puertos Gigabit, USB 3.0, 6 streams, cobertura amplia",
                        price: 349000,
                    },
                    {
                        name: "Switch TP-Link TL-SG108 8 Puertos",
                        slug: "switch-tp-link-tl-sg108-8-puertos",
                        description: "Switch Gigabit 10/100/1000, 8 puertos, plug-and-play, diseño metálico, sin ventilador, VLAN, QoS",
                        price: 129000,
                    },
                    {
                        name: "MESH TP-Link Deco X60 AX3000 (3 Unidades)",
                        slug: "mesh-tp-link-deco-x60-ax3000-3-unidades",
                        description: "Sistema WiFi 6 AX3000 mesh, cobertura hasta 580m², control parental, antivirus TP-Link HomeShield",
                        price: 799000,
                    },
                    {
                        name: "Ubiquiti UniFi 6 Pro Access Point",
                        slug: "ubiquiti-unifi-6-pro-access-point",
                        description: "Access Point WiFi 6 AX5400, 5.3 Gbps throughput, PoE+, diseño discreto, gestionado vía UniFi Controller",
                        price: 599000,
                    },
                    {
                        name: "Cable Ethernet UTP Cat6a 10m",
                        slug: "cable-ethernet-utp-cat6a-10m",
                        description: "Cable de red categoría 6a AWG24, 10 Gigabit, blindado S/FTP, conectores RJ45 chapados en oro, 10 metros",
                        price: 45000,
                    },
                    {
                        name: "Router MikroTik hAP ax3",
                        slug: "router-mikrotik-hap-ax3",
                        description: "Router WiFi 6 AX, 5 puertos Gigabit, USB 3.0, RouterOS, gestión avanzada, ideal SOHO y empresarial",
                        price: 449000,
                    },
                ],
            },
        ];

        console.log("📦 Creating products...");
        let totalProducts = 0;

        // Los productos se crean secuencialmente para mantener el orden
        // y porque dependen del ID de la categoría creada antes
        for (const group of productsData) {
            const category = categories[group.categoryIndex];

            for (const product of group.items) {
                await prismaDB.product.create({
                    data: {
                        categoryId: category.id,
                        name: product.name,
                        slug: product.slug,
                        description: product.description,
                        price: product.price,
                    },
                });
                totalProducts++;
            }
        }

        console.log(`✅ Created ${totalProducts} products`);
        console.log("✅ Categories & products seeded successfully!");
        console.log(`   Categories: ${categories.length}`);
        console.log(`   Products: ${totalProducts}`);

        return { categories, totalProducts };
    } catch (error) {
        console.error("❌ Error seeding categories & products:", error);
        throw error;
    }
};
