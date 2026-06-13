import type { Product, Category, Review } from "@/types/database";
import { buildCatalogProducts } from "@/data/product-factory";
import {
  painReliefFeatured,
  painReliefProductNames,
} from "@/data/catalog/pain-relief";
import {
  vitaminsFeatured,
  vitaminsProductNames,
} from "@/data/catalog/vitamins-supplements";
import { getProductImage, getProductImageThumb } from "@/data/product-images";

export const sampleCategories: Category[] = [
  { id: "cat-1", name: "Pain Relief", slug: "pain-relief", description: "Effective pain management solutions", image_url: null, created_at: "2024-01-01" },
  { id: "cat-2", name: "Vitamins and Supplements", slug: "vitamins-supplements", description: "Daily wellness essentials", image_url: null, created_at: "2024-01-01" },
  { id: "cat-3", name: "Cold and Flu", slug: "cold-flu", description: "Relief for cold and flu symptoms", image_url: null, created_at: "2024-01-01" },
  { id: "cat-4", name: "Skin Care", slug: "skin-care", description: "Dermatologist-recommended products", image_url: null, created_at: "2024-01-01" },
  { id: "cat-5", name: "Baby Care", slug: "baby-care", description: "Gentle care for your little ones", image_url: null, created_at: "2024-01-01" },
  { id: "cat-6", name: "Diabetes Care", slug: "diabetes-care", description: "Diabetes management products", image_url: null, created_at: "2024-01-01" },
  { id: "cat-7", name: "Heart Health", slug: "heart-health", description: "Cardiovascular wellness", image_url: null, created_at: "2024-01-01" },
  { id: "cat-8", name: "Personal Care", slug: "personal-care", description: "Everyday hygiene essentials", image_url: null, created_at: "2024-01-01" },
  { id: "cat-9", name: "Medical Equipment", slug: "medical-equipment", description: "Professional medical devices", image_url: null, created_at: "2024-01-01" },
  { id: "cat-10", name: "First Aid", slug: "first-aid", description: "Emergency care essentials", image_url: null, created_at: "2024-01-01" },
];

const painReliefProducts = buildCatalogProducts({
  names: [...painReliefProductNames],
  categoryId: "cat-1",
  idPrefix: "pain",
  featuredNames: [...painReliefFeatured],
  descriptions: {
    short: "Trusted pain relief product",
    long: "Pharmacy-grade analgesic for effective relief of pain, inflammation, and discomfort.",
    usage: "Use as directed on the package or consult your pharmacist before use.",
  },
});

const vitaminProducts = buildCatalogProducts({
  names: [...vitaminsProductNames],
  categoryId: "cat-2",
  idPrefix: "vitamin",
  featuredNames: [...vitaminsFeatured],
  descriptions: {
    short: "Daily wellness supplement",
    long: "Quality vitamin and supplement formulated to support health and daily nutrition.",
    usage: "Take as directed with food unless otherwise advised by your healthcare provider.",
  },
});

const otherCategoryProducts: Product[] = [
  {
    id: "prod-3", name: "Cold & Flu Relief", slug: "cold-flu-relief",
    description: "Multi-symptom relief for cold and flu including congestion, cough, and body aches.",
    short_description: "Multi-symptom cold relief",
    price: 18.0, compare_at_price: 22.0, category_id: "cat-3",
    image_url: getProductImageThumb("Cold Flu Relief Syrup"),
    images: [getProductImage("Cold Flu Relief Syrup")],
    ingredients: "Acetaminophen, Dextromethorphan, Phenylephrine",
    usage_instructions: "Take 2 caplets every 4 hours. Maximum 10 caplets per day.",
    stock: 85, low_stock_threshold: 15, rating: 4.5, review_count: 178,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-4", name: "Hydrating Face Cream", slug: "hydrating-face-cream",
    description: "Dermatologist-tested moisturizing cream with hyaluronic acid for all skin types.",
    short_description: "Hyaluronic acid moisturizer",
    price: 85.0, compare_at_price: 110.0, category_id: "cat-4",
    image_url: getProductImageThumb("Hydrating Face Cream"),
    images: [getProductImage("Hydrating Face Cream")],
    ingredients: "Hyaluronic Acid, Glycerin, Ceramides, Vitamin E",
    usage_instructions: "Apply to clean face morning and evening.",
    stock: 60, low_stock_threshold: 10, rating: 4.7, review_count: 89,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-5", name: "Baby Gentle Wash", slug: "baby-gentle-wash",
    description: "Tear-free, hypoallergenic body wash formulated for sensitive baby skin.",
    short_description: "Tear-free baby body wash",
    price: 35.0, compare_at_price: null, category_id: "cat-5",
    image_url: getProductImageThumb("Baby Gentle Wash Syrup"),
    images: [getProductImage("Baby Gentle Wash Syrup")],
    ingredients: "Water, Cocamidopropyl Betaine, Glycerin, Chamomile Extract",
    usage_instructions: "Apply to wet skin, lather gently, rinse thoroughly.",
    stock: 120, low_stock_threshold: 20, rating: 4.9, review_count: 156,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-6", name: "Blood Glucose Monitor", slug: "blood-glucose-monitor",
    description: "Accurate blood glucose monitoring system with fast 5-second results.",
    short_description: "Fast 5-second glucose monitor",
    price: 180.0, compare_at_price: 220.0, category_id: "cat-6",
    image_url: getProductImageThumb("Blood Glucose Monitor"),
    images: [getProductImage("Blood Glucose Monitor Injection")],
    ingredients: null,
    usage_instructions: "Insert test strip, apply blood sample, read result in 5 seconds.",
    stock: 45, low_stock_threshold: 8, rating: 4.6, review_count: 67,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-7", name: "Omega-3 Heart Support", slug: "omega-3-heart-support",
    description: "Premium fish oil supplement supporting heart, brain, and joint health.",
    short_description: "Heart & brain health supplement",
    price: 65.0, compare_at_price: 80.0, category_id: "cat-7",
    image_url: getProductImageThumb("Omega-3 Fish Oil"),
    images: [getProductImage("Omega-3 Fish Oil")],
    ingredients: "Fish Oil, EPA 360mg, DHA 240mg, Gelatin",
    usage_instructions: "Take 2 softgels daily with food.",
    stock: 175, low_stock_threshold: 20, rating: 4.8, review_count: 298,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-8", name: "Antibacterial Hand Sanitizer", slug: "hand-sanitizer",
    description: "Kills 99.9% of germs with moisturizing aloe vera formula.",
    short_description: "99.9% germ-killing sanitizer",
    price: 15.0, compare_at_price: null, category_id: "cat-8",
    image_url: getProductImageThumb("Hand Sanitizer Gel"),
    images: [getProductImage("Hand Sanitizer Gel")],
    ingredients: "Ethyl Alcohol 70%, Aloe Vera, Glycerin, Vitamin E",
    usage_instructions: "Apply to hands and rub until dry.",
    stock: 300, low_stock_threshold: 50, rating: 4.4, review_count: 521,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-9", name: "Digital Thermometer", slug: "digital-thermometer",
    description: "Fast and accurate digital thermometer with fever alert.",
    short_description: "Fast-read digital thermometer",
    price: 55.0, compare_at_price: 70.0, category_id: "cat-9",
    image_url: getProductImageThumb("Digital Thermometer"),
    images: [getProductImage("Digital Thermometer")],
    ingredients: null,
    usage_instructions: "Place under tongue, wait for beep. Read display.",
    stock: 90, low_stock_threshold: 15, rating: 4.5, review_count: 143,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-10", name: "First Aid Kit Premium", slug: "first-aid-kit-premium",
    description: "Comprehensive 100-piece first aid kit for home, office, or travel.",
    short_description: "100-piece comprehensive kit",
    price: 120.0, compare_at_price: 150.0, category_id: "cat-10",
    image_url: getProductImageThumb("First Aid Kit Premium"),
    images: [getProductImage("First Aid Kit Premium")],
    ingredients: null,
    usage_instructions: "Use appropriate items for minor injuries. Seek medical help for serious injuries.",
    stock: 55, low_stock_threshold: 10, rating: 4.7, review_count: 87,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
];

export const sampleProducts: Product[] = [
  ...painReliefProducts,
  ...vitaminProducts,
  ...otherCategoryProducts,
];

export const sampleReviews: Review[] = [
  { id: "rev-1", product_id: "pain-1", user_id: "user-1", rating: 5, title: "Works great!", comment: "Fast relief for my headaches. Highly recommend.", created_at: "2024-02-15" },
  { id: "rev-2", product_id: "pain-1", user_id: "user-2", rating: 4, title: "Good product", comment: "Effective but takes about 30 minutes to kick in.", created_at: "2024-02-20" },
  { id: "rev-3", product_id: "vitamin-12", user_id: "user-3", rating: 5, title: "Essential supplement", comment: "My doctor recommended this and I feel much better.", created_at: "2024-03-01" },
];

export const testimonials = [
  { id: 1, name: "Sarah Johnson", role: "Regular Customer", avatar: "SJ", rating: 5, text: "Ampah Pharmacy has been my go-to for years. Fast delivery, genuine products, and excellent customer service." },
  { id: 2, name: "Michael Chen", role: "Verified Buyer", avatar: "MC", rating: 5, text: "The prescription upload process is seamless. My medications arrive on time every month." },
  { id: 3, name: "Emily Rodriguez", role: "Healthcare Professional", avatar: "ER", rating: 5, text: "As a nurse, I trust Ampah Pharmacy for quality products. Their pharmacists are knowledgeable and helpful." },
];

export const faqItems = [
  { question: "How do I upload a prescription?", answer: "Visit our Prescription Upload page, fill in your details, and drag-and-drop your prescription image or PDF. Our licensed pharmacists will review it within 24 hours." },
  { question: "What are your delivery options?", answer: "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in Accra and Kumasi. Free shipping on orders over GH₵200." },
  { question: "Are your products authentic?", answer: "Yes, all products are sourced directly from licensed manufacturers and distributors. We are a fully licensed pharmacy regulated by state and federal authorities." },
  { question: "Can I return a product?", answer: "Unopened products can be returned within 30 days for a full refund. Prescription medications cannot be returned due to safety regulations." },
  { question: "Do you accept insurance?", answer: "Yes, we accept most major insurance plans. You can select insurance as a payment option during checkout or contact us for assistance." },
  { question: "How do I track my order?", answer: "Once your order ships, you'll receive a tracking number via email. You can also view order status in your Customer Dashboard." },
  { question: "Is my personal information secure?", answer: "Absolutely. We use industry-standard encryption and comply with HIPAA regulations to protect your health and personal information." },
  { question: "Do you offer pharmacist consultations?", answer: "Yes, our licensed pharmacists are available for free consultations via phone, chat, or in-store. Contact us to schedule a consultation." },
];

export const adminStats = {
  totalRevenue: 1850000,
  totalOrders: 1847,
  totalCustomers: 3421,
  totalProducts: sampleProducts.length,
  pendingPrescriptions: 12,
  lowStockItems: 8,
  revenueChart: [
    { month: "Jan", revenue: 8500 },
    { month: "Feb", revenue: 9200 },
    { month: "Mar", revenue: 10100 },
    { month: "Apr", revenue: 9800 },
    { month: "May", revenue: 11200 },
    { month: "Jun", revenue: 12400 },
    { month: "Jul", revenue: 11800 },
    { month: "Aug", revenue: 13100 },
    { month: "Sep", revenue: 14200 },
    { month: "Oct", revenue: 13800 },
    { month: "Nov", revenue: 15600 },
    { month: "Dec", revenue: 16750 },
  ],
};

export function getProductBySlug(slug: string): Product | undefined {
  return sampleProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return sampleProducts.filter((p) => p.category_id === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return sampleProducts.filter((p) => p.is_featured);
}

export function getRelatedProducts(productId: string, categoryId: string): Product[] {
  return sampleProducts
    .filter((p) => p.category_id === categoryId && p.id !== productId)
    .slice(0, 4);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return sampleCategories.find((c) => c.slug === slug);
}

export function getReviewsByProduct(productId: string): Review[] {
  return sampleReviews.filter((r) => r.product_id === productId);
}

export const catalogCounts = {
  painRelief: painReliefProductNames.length,
  vitamins: vitaminsProductNames.length,
  total: sampleProducts.length,
};
