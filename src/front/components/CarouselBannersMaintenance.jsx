// Import all your banner images here 
import electronicsImg from "../assets/img/electronics_banner.jpg";
import placeholderImg from "../assets/img/placeholder_banner.jpg";

//====================
// MAINTENANCE POINT
//====================
export const categoryBanners = {
  "electronics": electronicsImg,
  "jewelery": placeholderImg,
  "men's clothing": placeholderImg,
  "women's clothing": placeholderImg,
  // Add new categories here as needed
};

// Default banner for categories without specific images
export const defaultBanner = placeholderImg;

// Get banner for a specific category
export const getBannerForCategory = (category) => {
  const normalizedCategory = category?.toLowerCase().trim();
  return categoryBanners[normalizedCategory] || defaultBanner;
};

// Get all banners for carousel (home page)
export const getAllBanners = () => {
  const banners = Object.values(categoryBanners);
  // Add default banner if you want it in rotation, or remove this line
  return banners.length > 0 ? banners : [defaultBanner];
};