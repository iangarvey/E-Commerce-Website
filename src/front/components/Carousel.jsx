import { getAllBanners, getBannerForCategory } from "./CarouselBannersMaintenance";

export const Carousel = ({ specificCategory = null }) => {
  const banners = specificCategory 
    ? [getBannerForCategory(specificCategory)] // Single banner for category pages
    : getAllBanners(); // All banners for home page

  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade">
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img 
              src={banner} 
              className="d-block w-100" 
              alt={`${specificCategory || 'Home'} banner ${index + 1}`}
            />
          </div>
        ))}
      </div>
      
      {/* Only show controls if there are multiple banners */}
      {banners.length > 1 && (
        <>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
};