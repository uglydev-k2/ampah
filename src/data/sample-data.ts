import type { Product, Category, Review } from "@/types/database";

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

export const sampleProducts: Product[] = [
  {
    id: "prod-1", name: "Ibuprofen 200mg", slug: "ibuprofen-200mg",
    description: "Fast-acting pain relief for headaches, muscle aches, and fever. Each tablet contains 200mg of ibuprofen for effective relief.",
    short_description: "Fast-acting pain relief tablets",
    price: 8.99, compare_at_price: 12.99, category_id: "cat-1",
    image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=800&fit=crop"],
    ingredients: "Ibuprofen 200mg, Microcrystalline Cellulose, Starch",
    usage_instructions: "Take 1-2 tablets every 4-6 hours. Do not exceed 6 tablets in 24 hours.",
    stock: 150, low_stock_threshold: 20, rating: 4.8, review_count: 234,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-2", name: "Vitamin D3 5000 IU", slug: "vitamin-d3-5000",
    description: "High-potency Vitamin D3 supplement to support bone health, immune function, and overall wellness.",
    short_description: "High-potency bone health supplement",
    price: 14.99, compare_at_price: null, category_id: "cat-2",
    image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f71?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1550572017-edd951aa8f71?w=800&h=800&fit=crop"],
    ingredients: "Vitamin D3 (Cholecalciferol) 5000 IU, Olive Oil, Gelatin",
    usage_instructions: "Take 1 softgel daily with a meal.",
    stock: 200, low_stock_threshold: 25, rating: 4.9, review_count: 412,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-3", name: "Cold & Flu Relief", slug: "cold-flu-relief",
    description: "Multi-symptom relief for cold and flu including congestion, cough, and body aches.",
    short_description: "Multi-symptom cold relief",
    price: 11.49, compare_at_price: 15.99, category_id: "cat-3",
    image_url: "https://images.unsplash.com/photo-1587854692152-cad860a0e7a?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1587854692152-cad860a0e7a?w=800&h=800&fit=crop"],
    ingredients: "Acetaminophen, Dextromethorphan, Phenylephrine",
    usage_instructions: "Take 2 caplets every 4 hours. Maximum 10 caplets per day.",
    stock: 85, low_stock_threshold: 15, rating: 4.5, review_count: 178,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-4", name: "Hydrating Face Cream", slug: "hydrating-face-cream",
    description: "Dermatologist-tested moisturizing cream with hyaluronic acid for all skin types.",
    short_description: "Hyaluronic acid moisturizer",
    price: 22.99, compare_at_price: 29.99, category_id: "cat-4",
    image_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop"],
    ingredients: "Hyaluronic Acid, Glycerin, Ceramides, Vitamin E",
    usage_instructions: "Apply to clean face morning and evening.",
    stock: 60, low_stock_threshold: 10, rating: 4.7, review_count: 89,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-5", name: "Baby Gentle Wash", slug: "baby-gentle-wash",
    description: "Tear-free, hypoallergenic body wash formulated for sensitive baby skin.",
    short_description: "Tear-free baby body wash",
    price: 9.99, compare_at_price: null, category_id: "cat-5",
    image_url: "https://images.unsplash.com/photo-1515488042361-ee00e3ddd4e4?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1515488042361-ee00e3ddd4e4?w=800&h=800&fit=crop"],
    ingredients: "Water, Cocamidopropyl Betaine, Glycerin, Chamomile Extract",
    usage_instructions: "Apply to wet skin, lather gently, rinse thoroughly.",
    stock: 120, low_stock_threshold: 20, rating: 4.9, review_count: 156,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-6", name: "Blood Glucose Monitor", slug: "blood-glucose-monitor",
    description: "Accurate blood glucose monitoring system with fast 5-second results.",
    short_description: "Fast 5-second glucose monitor",
    price: 34.99, compare_at_price: 44.99, category_id: "cat-6",
    image_url: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&h=800&fit=crop"],
    ingredients: null,
    usage_instructions: "Insert test strip, apply blood sample, read result in 5 seconds.",
    stock: 45, low_stock_threshold: 8, rating: 4.6, review_count: 67,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-7", name: "Omega-3 Fish Oil", slug: "omega-3-fish-oil",
    description: "Premium fish oil supplement supporting heart, brain, and joint health.",
    short_description: "Heart & brain health supplement",
    price: 19.99, compare_at_price: 24.99, category_id: "cat-7",
    image_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=800&fit=crop"],
    ingredients: "Fish Oil, EPA 360mg, DHA 240mg, Gelatin",
    usage_instructions: "Take 2 softgels daily with food.",
    stock: 175, low_stock_threshold: 20, rating: 4.8, review_count: 298,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-8", name: "Antibacterial Hand Sanitizer", slug: "hand-sanitizer",
    description: "Kills 99.9% of germs with moisturizing aloe vera formula.",
    short_description: "99.9% germ-killing sanitizer",
    price: 5.99, compare_at_price: null, category_id: "cat-8",
    image_url: "https://images.unsplash.com/photo-1584483766114-2cea1facdf57?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1584483766114-2cea1facdf57?w=800&h=800&fit=crop"],
    ingredients: "Ethyl Alcohol 70%, Aloe Vera, Glycerin, Vitamin E",
    usage_instructions: "Apply to hands and rub until dry.",
    stock: 300, low_stock_threshold: 50, rating: 4.4, review_count: 521,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-9", name: "Digital Thermometer", slug: "digital-thermometer",
    description: "Fast and accurate digital thermometer with fever alert.",
    short_description: "Fast-read digital thermometer",
    price: 12.99, compare_at_price: 16.99, category_id: "cat-9",
    image_url: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=800&fit=crop"],
    ingredients: null,
    usage_instructions: "Place under tongue, wait for beep. Read display.",
    stock: 90, low_stock_threshold: 15, rating: 4.5, review_count: 143,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-10", name: "First Aid Kit Premium", slug: "first-aid-kit-premium",
    description: "Comprehensive 100-piece first aid kit for home, office, or travel.",
    short_description: "100-piece comprehensive kit",
    price: 29.99, compare_at_price: 39.99, category_id: "cat-10",
    image_url: "https://images.unsplash.com/photo-1603398937418-0a4e1550a67a?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1603398937418-0a4e1550a67a?w=800&h=800&fit=crop"],
    ingredients: null,
    usage_instructions: "Use appropriate items for minor injuries. Seek medical help for serious injuries.",
    stock: 55, low_stock_threshold: 10, rating: 4.7, review_count: 87,
    is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-11", name: "Acetaminophen 500mg", slug: "acetaminophen-500mg",
    description: "Extra strength pain reliever and fever reducer.",
    short_description: "Extra strength pain reliever",
    price: 7.49, compare_at_price: null, category_id: "cat-1",
    image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&h=800&fit=crop"],
    ingredients: "Acetaminophen 500mg",
    usage_instructions: "Take 1-2 caplets every 6 hours. Max 8 caplets per day.",
    stock: 200, low_stock_threshold: 30, rating: 4.6, review_count: 189,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
  {
    id: "prod-12", name: "Multivitamin Daily", slug: "multivitamin-daily",
    description: "Complete daily multivitamin with 23 essential vitamins and minerals.",
    short_description: "23 essential vitamins & minerals",
    price: 16.99, compare_at_price: 21.99, category_id: "cat-2",
    image_url: "https://images.unsplash.com/photo-1526253033463-99c25a0f7d6c?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1526253033463-99c25a0f7d6c?w=800&h=800&fit=crop"],
    ingredients: "Vitamin A, C, D, E, B-Complex, Zinc, Iron, Calcium",
    usage_instructions: "Take 1 tablet daily with food.",
    stock: 180, low_stock_threshold: 25, rating: 4.7, review_count: 345,
    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
  },
];

export const sampleReviews: Review[] = [
  { id: "rev-1", product_id: "prod-1", user_id: "user-1", rating: 5, title: "Works great!", comment: "Fast relief for my headaches. Highly recommend.", created_at: "2024-02-15" },
  { id: "rev-2", product_id: "prod-1", user_id: "user-2", rating: 4, title: "Good product", comment: "Effective but takes about 30 minutes to kick in.", created_at: "2024-02-20" },
  { id: "rev-3", product_id: "prod-2", user_id: "user-3", rating: 5, title: "Essential supplement", comment: "My doctor recommended this and I feel much better.", created_at: "2024-03-01" },
];

export const testimonials = [
  { id: 1, name: "Sarah Johnson", role: "Regular Customer", avatar: "SJ", rating: 5, text: "Ampah Pharmacy has been my go-to for years. Fast delivery, genuine products, and excellent customer service." },
  { id: 2, name: "Michael Chen", role: "Verified Buyer", avatar: "MC", rating: 5, text: "The prescription upload process is seamless. My medications arrive on time every month." },
  { id: 3, name: "Emily Rodriguez", role: "Healthcare Professional", avatar: "ER", rating: 5, text: "As a nurse, I trust Ampah Pharmacy for quality products. Their pharmacists are knowledgeable and helpful." },
];

export const faqItems = [
  { question: "How do I upload a prescription?", answer: "Visit our Prescription Upload page, fill in your details, and drag-and-drop your prescription image or PDF. Our licensed pharmacists will review it within 24 hours." },
  { question: "What are your delivery options?", answer: "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas. Free shipping on orders over $35." },
  { question: "Are your products authentic?", answer: "Yes, all products are sourced directly from licensed manufacturers and distributors. We are a fully licensed pharmacy regulated by state and federal authorities." },
  { question: "Can I return a product?", answer: "Unopened products can be returned within 30 days for a full refund. Prescription medications cannot be returned due to safety regulations." },
  { question: "Do you accept insurance?", answer: "Yes, we accept most major insurance plans. You can select insurance as a payment option during checkout or contact us for assistance." },
  { question: "How do I track my order?", answer: "Once your order ships, you'll receive a tracking number via email. You can also view order status in your Customer Dashboard." },
  { question: "Is my personal information secure?", answer: "Absolutely. We use industry-standard encryption and comply with HIPAA regulations to protect your health and personal information." },
  { question: "Do you offer pharmacist consultations?", answer: "Yes, our licensed pharmacists are available for free consultations via phone, chat, or in-store. Contact us to schedule a consultation." },
];

export const adminStats = {
  totalRevenue: 128450,
  totalOrders: 1847,
  totalCustomers: 3421,
  totalProducts: 156,
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
