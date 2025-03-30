import { featuredCrops } from '../../constants/home';

/**
 * Generates an expanded product list with variations for demo purposes
 * @returns {Array} Array of products with additional properties
 */
export const generateMoreProducts = () => {
    const baseProducts = featuredCrops;
    const expandedProducts = [];

    baseProducts.forEach(product => {
        const baseProduct = {
            ...product,
            numericPrice: parseInt(product.price.replace(/[^0-9]/g, '')),
            description: product.description || `Premium quality ${product.title.toLowerCase()} from ${product.farmType} in ${product.location}, Sri Lanka. Our products are carefully grown using sustainable farming practices.`
        };
        expandedProducts.push(baseProduct);

        // Add variations
        const variations = [
            {
                ...product,
                id: product.id + 100,
                title: `Premium ${product.title}`,
                price: `Rs ${baseProduct.numericPrice + 50}/kg`,
                numericPrice: baseProduct.numericPrice + 50,
                rating: Math.min(5, product.rating + 0.1),
                badge: 'Premium',
                description: `Highest quality ${product.title.toLowerCase()} from ${product.farmType} in ${product.location}, Sri Lanka. Hand-picked and inspected for premium quality.`
            },
            {
                ...product,
                id: product.id + 200,
                title: `Bulk ${product.title}`,
                price: `Rs ${baseProduct.numericPrice - 20}/kg`,
                numericPrice: baseProduct.numericPrice - 20,
                badge: 'Bulk',
                farmType: `${product.farmType} Collective`,
                description: `Buy ${product.title.toLowerCase()} in bulk for the best value. Sourced directly from ${product.farmType} Collective in ${product.location}, ideal for businesses and restaurants.`
            },
            {
                ...product,
                id: product.id + 300,
                title: `${product.title} Direct`,
                price: product.price,
                numericPrice: baseProduct.numericPrice,
                description: `${product.title} sourced directly from farmers in ${product.location}. Support local agriculture and enjoy the freshest products.`,
                badge: 'Direct',
            }
        ];

        expandedProducts.push(...variations);
    });

    return expandedProducts;
};

// Memoize the result so it's only generated once
let cachedProducts = null;
export const getAllProducts = () => {
    if (!cachedProducts) {
        cachedProducts = generateMoreProducts();
    }
    return cachedProducts;
};