import React, { useEffect, useState } from "react";
import Banner1 from "../../assets/banner-1.webp";
import Banner2 from "../../assets/banner-2.webp";
import Banner3 from "../../assets/banner-3.webp";
import { Button } from "../../components/ui/button";
import {
  Baby,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  GaugeIcon,
  Glasses,
  Leaf,
  LeafIcon,
  Mars,
  Plug,
  TreePalmIcon,
  TriangleDashedIcon,
  Venus,
  WandSparklesIcon,
  Component,
  SplitIcon,
  ShoppingBag,
  Feather,
  Tag,
  Fan,
  Shirt,
  Castle,
  LandPlot,
  Star,
  Sun,
  Hexagon,
  Building,
  Puzzle,
  GalleryVerticalEnd,
  Swords,
  Instagram,
  Facebook,
  Youtube,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  setProductDetails,
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
  const { featureImageList } = useSelector((state) => state.commonFeatureImage);
  const slides = featureImageList;
  const [openDetailsDailog, setOpenDetailsDailog] = useState(false);
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
    { id: "sambodi", label: "Sambodi", icon: Star },
    { id: "murarka", label: "Murarka", icon: Sun },
    { id: "solino", label: "Solino", icon: Hexagon },
    { id: "urbanInspire", label: "Urban Inspire", icon: Building },
  ];

  const categoriesWithIcon = [
    { id: "clothing", label: "Clothing", icon: GalleryVerticalEnd },
    { id: "combo", label: "Combo", icon: Swords },
    { id: "men", label: "Men", icon: Mars },
    { id: "accessories", label: "Accessories", icon: Glasses },
    { id: "electronics", label: "Electronics", icon: Plug },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "priceLowToHigh",
      })
    );
  }, [dispatch]);

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId, q, size) => {
    if (size === null) {
      toast("Enter the size of the product", {
        icon: "❌",
        duration: 2000,
        position: "top-center",
        style: { backgroundColor: "black", color: "white" },
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1, size })).then(
      (response) => {
        if (response.payload?.success) {
          dispatch(fetchCartItems({ userId: user?.id }));
          toast(response?.payload.message, {
            icon: "✅",
            duration: 1000,
            position: "top-center",
            style: { backgroundColor: "black", color: "white" },
          });
        }
      }
    );
  };

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDailog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    return () => {
      dispatch(setProductDetails());
    };
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
      <div className="relative w-full h-64 md:h-80 lg:h-[400px] overflow-hidden">
        {slides && slides.length > 0 &&
          slides.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`absolute w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

        <Button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? (slides?.length ? slides.length - 1 : 0) : prev - 1
            )
          }
          variant="outline"
          size="icon"
          className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-gray-200 hover:bg-gray-700"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          onClick={() =>
            setCurrentSlide((prev) =>
              slides && slides.length
                ? prev === slides.length - 1
                  ? 0
                  : prev + 1
                : 0
            )
          }
          variant="outline"
          size="icon"
          className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-gray-200 hover:bg-gray-700"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

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
      </div>

      {/* Remaining content (categories, brands, featured products, etc.) stays unchanged */}
      {/* ... */}

      <ProductDetailsDailog
        handleAddToCart={handleAddToCart}
        open={openDetailsDailog}
        setOpen={setOpenDetailsDailog}
        productDetails={productDetails}
      />
    </motion.div>
  );
};

export default ShoppingHome;
