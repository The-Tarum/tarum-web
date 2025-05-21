import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiHeart, FiShare2, FiShoppingCart } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import { fetchProductDetails } from "../../services/ProductService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselIndicator } from "@/components/ui/carousel";
import ActionBar from "../../components/ActionBar";

const Shimmer = () => (
  <div className="animate-pulse p-4">
    <div className="h-48 bg-gray-300 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
  </div>
);

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const { isMobileApp } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchProductDetails(productId);
        if (response.success) {
          setProduct(response.data);
        }
      } catch (err) {
        setProduct({
          name: "Citric Acid",
          ProductImages: [{ imageUrl: "https://via.placeholder.com/400", type: "image/jpeg" }],
          ProductPrice: { price: 0.95 },
          quantity: 3000,
          packaging: "25 kgs",
          storage: "EXW New Jersey",
          deliveryType: "Courier",
          expectedDeliveryDays: "Immediate",
          attributes: { grade: "Food Grade" },
          reviewCount: 117,
          overallRating: "4.3",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  const handleRequestQuote = () => {
    console.log("Requesting quote for quantity:", quantity);
  };

  if (loading) return <Shimmer />;

  const {
    name,
    ProductImages = [],
    ProductPrice = {},
    packaging,
    storage,
    deliveryType,
    expectedDeliveryDays,
    attributes = {},
    reviewCount,
    overallRating,
  } = product;

  const price = ProductPrice.price || 0.95;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <ActionBar name="Product Details" />

      {/* Fullscreen Viewer */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={ProductImages[fullscreenIndex].imageUrl}
              className="max-h-full max-w-full object-contain"
              alt="fullscreen product"
            />
          </div>
          <div className="bg-black py-4">
            <Carousel>
              <CarouselContent className="px-4 gap-4">
                {ProductImages.map((media, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-24 shrink-0 cursor-pointer"
                    onClick={() => setFullscreenIndex(idx)}
                  >
                    <img
                      src={media.imageUrl}
                      className={`rounded-md border ${fullscreenIndex === idx ? "border-white" : "border-transparent"}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <Button
            className="absolute top-4 right-4 bg-white text-black"
            onClick={() => setFullscreen(false)}
          >
            Close
          </Button>
        </div>
      )}

      <div className="p-4 space-y-4">
        <Carousel>
          <CarouselContent className="gap-4">
            {ProductImages.map((media, idx) => (
              <CarouselItem key={idx} onClick={() => { setFullscreen(true); setFullscreenIndex(idx); }}>
                <Card className="overflow-hidden aspect-[4/3] rounded-xl shadow-sm">
                  <CardContent className="p-0">
                    {media.type?.includes("video") ? (
                      <video
                        controls
                        className="w-full h-full object-contain"
                        src={media.imageUrl}
                      />
                    ) : (
                      <img
                        src={media.imageUrl}
                        className="w-full h-full object-contain"
                        alt={`product ${idx}`}
                      />
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
         <CarouselIndicator />
        </Carousel>

        <div className="space-y-1">
          <h1 className="text-xl font-bold leading-tight tracking-tight">{name}</h1>
          <p className="text-muted-foreground">Busnik Specialities</p>
          <div className="text-yellow-500 text-sm">⭐ {overallRating} • {reviewCount} reviews</div>
        </div>

        <div className="text-sm space-y-1">
          <p>Minimum order: {quantity} units</p>
          <p>Price: ${price}/{product.unit || "kg"}</p>
          <p>Packaging: {packaging}</p>
          <p>Storage: {storage}</p>
          <p>Delivery: {deliveryType}</p>
          <p>Lead time: {expectedDeliveryDays}</p>
          {Object.entries(attributes).map(([key, val]) => (
            <p key={key}>{key[0].toUpperCase() + key.slice(1)}: {val}</p>
          ))}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Quantity</label>
          <div className="flex items-center border rounded-md overflow-hidden w-fit">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-x border-gray-200"
            />
            <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-primary text-white" onClick={handleRequestQuote}>
            <FiShoppingCart className="mr-2" /> Sample Request
          </Button>
          <Button variant="outline" size="icon"><FiHeart /></Button>
          <Button variant="outline" size="icon"><FiShare2 /></Button>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h2 className="text-md font-semibold">Review ({reviewCount})</h2>
          <div className="bg-muted p-2 rounded-md text-sm">
            "We brought this many times, best quality natural sweetener..."
            <div className="text-xs text-muted-foreground">January 06, 2024</div>
          </div>
          <Button variant="link" className="text-sm">See All Reviews</Button>
        </div>

        <div className="pt-6 space-y-2">
          <h2 className="text-md font-semibold">Similar products from supplier</h2>
          <div className="flex gap-4 overflow-x-auto">
            {["Ascorbic Acid", "Steel", "Titanium Dioxide"].map((item, idx) => (
              <Card key={idx} className="min-w-[100px]">
                <CardContent className="p-2 space-y-1">
                  <img
                    src="https://via.placeholder.com/100"
                    className="rounded"
                    alt={item}
                  />
                  <div className="text-sm font-medium">{item}</div>
                  <div className="text-xs text-muted-foreground">$3.50</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-4 py-3 flex gap-2 z-50">
        <Button className="flex-1" variant="outline">Chat</Button>
        <Button className="flex-1" variant="outline">Send Inquiry</Button>
        <Button className="flex-1 bg-blue-600 text-white">Buy</Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
