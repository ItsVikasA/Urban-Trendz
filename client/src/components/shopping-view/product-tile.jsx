import React, { useState, useCallback, useRef } from "react";
import { ImageIcon } from "lucide-react";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  isMobile = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const clickTimeoutRef = useRef(null);

  // pick first valid image URL
  const getProductImage = () => {
    if (Array.isArray(product?.images) && product.images.length) {
      const valid = product.images.find(
        (img) => typeof img === "string" && img.trim() !== ""
      );
      return valid || null;
    }
    return product?.image || null;
  };

  const productImage = getProductImage();
  const hasValidImage = productImage && !imageError;

  const handleImageError = () => setImageError(true);
  const handleImageLoad = () => setImageError(false);

  // FIXED: Prevent multiple calls with debounce and state check
  const handleProductClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("Product tile clicked, current isClicked state:", isClicked);

      // Prevent multiple clicks
      if (isClicked) {
        console.log("Click ignored - already processing");
        return;
      }

      // Clear any existing timeout
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      console.log("Processing click for product:", product._id);
      setIsClicked(true);

      // Call the handler
      handleGetProductDetails(product._id);

      // Reset the clicked state after a delay to prevent rapid clicking
      clickTimeoutRef.current = setTimeout(() => {
        console.log("Resetting isClicked state");
        setIsClicked(false);
      }, 2000); // 2 second cooldown
    },
    [product._id, handleGetProductDetails, isClicked]
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  // placeholder when no image
  const ImagePlaceholder = ({ className }) => (
    <div
      className={`bg-gray-800 flex items-center justify-center ${className}`}
    >
      <div className="text-center text-gray-500">
        <ImageIcon size={isMobile ? 24 : 48} className="mx-auto mb-1" />
        <p className="text-xs">No image</p>
      </div>
    </div>
  );

  // discount percentage
  const discountPercentage =
    product.sellPrice > 0 && product.price > product.sellPrice
      ? Math.round(((product.price - product.sellPrice) / product.price) * 100)
      : 0;

  // Check if product has sizes
  const hasSizes = () => {
    return (
      (product?.pantSizes && product.pantSizes !== "-") ||
      (product?.tshirtSizes && product.tshirtSizes !== "-")
    );
  };

  // Get available sizes
  const getAvailableSizes = () => {
    const sizes = [];
    if (product?.pantSizes && product.pantSizes !== "-") {
      sizes.push(...product.pantSizes.split(",").map((size) => size.trim()));
    }
    if (product?.tshirtSizes && product.tshirtSizes !== "-") {
      sizes.push(...product.tshirtSizes.split(",").map((size) => size.trim()));
    }
    return [...new Set(sizes)]; // Remove duplicates
  };

  // MOBILE VARIANT
  if (isMobile) {
    return (
      <div
        className={`w-full cursor-pointer transition-all duration-200 ${
          isClicked ? "opacity-60 pointer-events-none" : "hover:opacity-90"
        }`}
        onClick={handleProductClick}
      >
        {/* IMAGE */}
        <div className="relative w-40 h-50 overflow-hidden bg-gray-800">
          {hasValidImage ? (
            <img
              src={productImage}
              alt={product.title || "Product"}
              className="w-full h-full object-cover object-center"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <ImagePlaceholder className="w-full h-full" />
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1">
              -{discountPercentage}%
            </div>
          )}

          {/* Loading indicator when clicked */}
          {isClicked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="py-3">
          {/* Title */}
          <h3 className="text-sm font-normal mb-2 text-gray-200 line-clamp-2">
            {product.title || "Untitled Product"}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            {product.sellPrice > 0 ? (
              <>
                <span className="text-lg font-bold text-white">
                  Rs. {product.sellPrice}.00
                </span>
                <span className="text-sm line-through text-gray-500">
                  Rs. {product.price}.00
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-white">
                Rs. {product.price}.00
              </span>
            )}
          </div>

          {/* Sizes */}
          {hasSizes() && (
            <div className="flex flex-wrap gap-1">
              {getAvailableSizes()
                .slice(0, 4)
                .map((size, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1"
                  >
                    {size}
                  </span>
                ))}
              {getAvailableSizes().length > 4 && (
                <span className="text-xs text-gray-400">
                  +{getAvailableSizes().length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // DESKTOP VARIANT
  return (
    <div
      className={`w-full max-w-sm mx-auto cursor-pointer transition-all duration-200 group ${
        isClicked ? "opacity-60 pointer-events-none" : "hover:opacity-90"
      }`}
      onClick={handleProductClick}
    >
      {/* IMAGE */}
      <div className="relative h-[280px] overflow-hidden bg-gray-800">
        {hasValidImage ? (
          <img
            src={productImage}
            alt={product.title || "Product"}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <ImagePlaceholder className="w-full h-full" />
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1">
            -{discountPercentage}%
          </div>
        )}

        {/* Loading indicator when clicked */}
        {isClicked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="py-4">
        {/* Title */}
        <h2 className="text-base font-normal mb-3 text-gray-200 line-clamp-2 group-hover:text-orange-400 transition-colors">
          {product.title || "Untitled Product"}
        </h2>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {product.sellPrice > 0 ? (
            <>
              <span className="text-xl font-bold text-white">
                Rs. {product.sellPrice}.00
              </span>
              <span className="text-sm line-through text-gray-500">
                Rs. {product.price}.00
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-white">
              Rs. {product.price}.00
            </span>
          )}
        </div>

        {/* Sizes */}
        {hasSizes() && (
          <div className="flex flex-wrap gap-1">
            {getAvailableSizes()
              .slice(0, 5)
              .map((size, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-700 text-gray-300 px-2 py-1 border border-gray-600"
                >
                  {size}
                </span>
              ))}
            {getAvailableSizes().length > 5 && (
              <span className="text-xs text-gray-400">
                +{getAvailableSizes().length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingProductTile;
