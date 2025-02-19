const fs = require("fs");
const path = require("path");

const domain = "https://www.mastercar-nt.ru"; // Ваш домен

// Статические пути (без изменений)
const staticPaths = [
  "/",
  "/about"
];

// Читаем JSON с услугами
const servicesFilePath = path.resolve(__dirname, "src/data/services.json");
const services = JSON.parse(fs.readFileSync(servicesFilePath, "utf8"));

// Генерируем пути для услуг с `#/id/description`
const servicePaths = services.map(service => `#${service.id}/description`);

// Все пути для sitemap
const paths = [...staticPaths, ...servicePaths];

// Генерация XML
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths
    .map(
      (route) => `
    <url>
      <loc>${domain}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

// Записываем в public/sitemap.xml
fs.writeFileSync(path.resolve(__dirname, "./public/sitemap.xml"), sitemapContent);

console.log("✅ Sitemap создан: public/sitemap.xml");
