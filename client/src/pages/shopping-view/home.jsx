import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  Glasses,
  Mars,
  Plug,
  GalleryVerticalEnd,
  Swords,
  ShoppingBag,
  Feather,
  Tag,
  Fan,
  Shirt,
  Castle,
  LandPlot,
  Star as LucideStar,
  Hexagon,
  Building,
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Component,
  SplitIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  setProductDetails
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDailog from "@/components/shopping-view/productDetails";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/common/image-upload-slice";

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const { featureImageList } = useSelector(
    (state) => state.commonFeatureImage
  );
  const slides = featureImageList;
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const brandsWithIcon = [
    { id: "massey", label: "Massey", icon: ShoppingBag },
    { id: "linonfeel", label: "Linon Feel", icon: Feather },
    { id: "manwill", label: "Manwill", icon: Tag },
    { id: "jockey", label: "Jockey", icon: Fan },
    { id: "siyaram", label: "Siyaram", icon: Shirt },
    { id: "raymond", label: "Raymond", icon: Castle },
    { id: "ramraj", label: "RamRaj", icon: LandPlot },
    { id: "sambodi", label: "Sambodi", icon: LucideStar },
    { id: "murarka", label: "Murarka", icon: LucideStar },
    { id: "solino", label: "Solino", icon: Hexagon },
    { id: "urbanInspire", label: "Urban Inspire", icon: Building }
  ];

  const categoriesWithIcon = [
    { id: "clothing", label: "Clothing", icon: GalleryVerticalEnd },
    { id: "combo", label: "Combo", icon: Swords },
    { id: "men", label: "Men", icon: Mars },
    { id: "accessories", label: "Accessories", icon: Glasses },
    { id: "electronics", label: "Electronics", icon: Plug },
    { id: "footwear", label: "Footwear", icon: Footprints }
  ];

  useEffect(() => {
    dispatch(getFeatureImages());
    dispatch(
      fetchAllFilteredProducts({ filterParams: {}, sortParams: "priceLowToHigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId, size) => {
    if (!size) {
      toast("Enter the size of the product", {
        icon: "❌",
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "black", color: "white" }
      });
      return;
    }
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1, size }))
      .then((response) => {
        if (response.payload?.success) {
          dispatch(fetchCartItems({ userId: user?.id }));
          toast(response.payload.message, {
            icon: "✅",
            duration: 1000,
            position: "top-center",
            style: { backgroundColor: "black", color: "white" }
          });
        }
      });
  };

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    return () => dispatch(setProductDetails());
  }, [dispatch]);

  const handleNavigateToListingPage = (item, section) => {
    const params = new URLSearchParams();
    params.append(section, item.id);
    navigate(`/shop/listing?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0.5, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen p-4 md:p-8 lg:p-16 bg-gray-900 gap-10"
    >
      {/* Hero Slider */}
      <div className="relative w-full h-64 md:h-80 lg:h-[400px] overflow-hidden">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide.image}
            className={`absolute w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
          }
          className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-gray-200 hover:bg-gray-700"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
          }
          className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-gray-200 hover:bg-gray-700"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Social & Reviews */}
      <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-100 items-center py-4">
        <a
          href="https://www.instagram.com/urban_trendz_mudhol"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-pink-500 transition"
        >
          <Instagram size={20} />
          Instagram
        </a>
        <a
          href="https://wa.me/917090607020"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-green-400 transition"
        >
          <Phone size={20} />
          WhatsApp
        </a>
        <a
          href="https://www.facebook.com/aribenchimallu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-500 transition"
        >
          <Facebook size={20} />
          Facebook
        </a>
        <a
          href="https://www.youtube.com/@UrbanTrendzMudhol"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-red-500 transition"
        >
          <Youtube size={20} />
          YouTube
        </a>
        <a
          href="https://g.co/kgs/noC8dHZ"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-yellow-300 transition"
        >
          <LucideStar size={20} />
          Reviews
        </a>
      </div>

      {/* Categories Section */}
      <section className="py-6 rounded-xl">
        <h2 className="flex items-center justify-center text-3xl font-bold gap-2 text-gray-200 mb-8">
          <Component />
          Shop by <span className="text-orange-200">Category</span>
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {categoriesWithIcon.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => handleNavigateToListingPage(cat, "category")}
              className="bg-gray-900 cursor-pointer hover:shadow-lg transition-shadow shadow-gray-600 border-gray-600"
            >
              <CardContent className="flex flex-col items-center justify-center bg-gray-900 text-gray-300 hover:scale-90 transition-all duration-200">
                <cat.icon className="w-12 h-12 mb-4" />
                <span className="font-bold text-sm">{cat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-6 rounded-xl">
        <h2 className="flex items-center justify-center text-3xl font-bold gap-2 text-gray-200 mb-8">
          <SplitIcon />
          Shop by <span className="text-orange-200">Brand</span>
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {brandsWithIcon.map((brand) => (
            <Card
              key={brand.id}
              onClick={() => handleNavigateToListingPage(brand, "brand")}
              className="bg-gray-900 cursor-pointer hover:shadow-lg transition-shadow shadow-gray-600 border-gray-600"
            >
              <CardContent className="flex flex-col items-center justify-center px-6 bg-gray-900 text-gray-300 hover:scale-90 transition-all duration-200">
                <brand.icon className="w-12 h-12 mb-4" />
                <span className="font-bold">{brand.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-800 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-orange-100 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDailog
        open={openDetailsDialog} 
        setOpen={setOpenDetailsDialog} 
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </motion.div>
  );
};

export default ShoppingHome;
