
// opticsStudio.jsx
import { CartProvider } from "./contexts/CardContext";
import { useHashRouter } from "./hook/usehashrooter.js";
import {
  HomePage, ProductsPage, CollectionPage, ProductDetailPage, CartPage,
  CheckoutPage, OrderSuccessPage, WishlistPage, ReviewSubmissionPage, AboutUsPage,
} from "./page/page.jsx";
import DashboardPage from "./userdashboard/dashboardpage.jsx";

export default function OpticsStudio() {
  const { route, productId, collectionSlug, reviewProductId, reviewId, navigate,queryParams } = useHashRouter();

  return (
    <CartProvider>
      {route === "home"          && <HomePage navigate={navigate} />}
      {route === "products"      && <ProductsPage navigate={navigate} queryParams={queryParams} />}
      {route === "collection"    && <CollectionPage slug={collectionSlug} navigate={navigate} />}
      {route === "product"       && <ProductDetailPage productId={productId} navigate={navigate} />}
      {route === "cart"          && <CartPage navigate={navigate} />}
      {route === "checkout"      && <CheckoutPage navigate={navigate} />}
      {route === "order-success" && <OrderSuccessPage navigate={navigate} />}
      {route === "dashboard"     && <DashboardPage navigate={navigate} />}
      {route === "wishlist"      && <WishlistPage navigate={navigate} />}
      {route === "story"         && <AboutUsPage navigate={navigate} />}
      {route === "review"        && (
        <ReviewSubmissionPage
          productId={reviewProductId}
          reviewId={reviewId}
          navigate={navigate}
        />
      )}

      <style>{`
        @keyframes fadeUp    { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes scanLine  { 0% { top:0; opacity:0.6; } 100% { top:100%; opacity:0; } }
        @keyframes cartBounce { 0%{transform:scale(1)} 30%{transform:scale(1.3)} 60%{transform:scale(0.9)} 100%{transform:scale(1)} }
        @keyframes _spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:#f5f5f5; } ::-webkit-scrollbar-thumb { background:#ddd; }
      `}</style>
    </CartProvider>
  );
}