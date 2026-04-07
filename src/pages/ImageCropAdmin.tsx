import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useImageCropSettings } from "@/hooks/useImageCropSettings";
import { toast } from "sonner";
import shop1 from "@/assets/shop-new-1.jpg";
import shop2 from "@/assets/shop-new-2.jpg";
import shop3 from "@/assets/shop-new-3.jpg";

const images = [
  { key: "shop-1", src: shop1, label: "Product front view" },
  { key: "shop-2", src: shop2, label: "Product angled view" },
  { key: "shop-3", src: shop3, label: "Matcha latte pour" },
];

const ImageCropEditor = ({ imageKey, src, label }: { imageKey: string; src: string; label: string }) => {
  const { settings, update } = useImageCropSettings(imageKey);
  const [posX, setPosX] = useState(() => parseInt(settings.objectPosition.split(" ")[0]) || 50);
  const [posY, setPosY] = useState(() => parseInt(settings.objectPosition.split(" ")[1]) || 50);
  const [scale, setScale] = useState(settings.scale);

  const handlePosX = (val: number) => {
    setPosX(val);
    update({ objectPosition: `${val}% ${posY}%` });
  };
  const handlePosY = (val: number) => {
    setPosY(val);
    update({ objectPosition: `${posX}% ${val}%` });
  };
  const handleScale = (val: number) => {
    setScale(val);
    update({ scale: val });
  };
  const handleReset = () => {
    setPosX(50);
    setPosY(50);
    setScale(1);
    update({ objectPosition: "50% 50%", scale: 1 });
    toast.success(`Reset ${label}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-cream tracking-wide">{label}</h3>
        <button onClick={handleReset} className="text-cream/40 hover:text-cream transition-colors" title="Reset">
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Preview */}
      <div className="aspect-square overflow-hidden bg-cream/5 border border-cream/10">
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover transition-all duration-200"
          style={{
            objectPosition: `${posX}% ${posY}%`,
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div>
          <label className="font-body text-xs text-cream/50 tracking-wide block mb-1">
            Horizontal position: {posX}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={posX}
            onChange={(e) => handlePosX(Number(e.target.value))}
            className="w-full accent-cream h-1 bg-cream/20 rounded-full appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="font-body text-xs text-cream/50 tracking-wide block mb-1">
            Vertical position: {posY}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={posY}
            onChange={(e) => handlePosY(Number(e.target.value))}
            className="w-full accent-cream h-1 bg-cream/20 rounded-full appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="font-body text-xs text-cream/50 tracking-wide block mb-1">
            Zoom: {scale.toFixed(2)}x
          </label>
          <input
            type="range"
            min={100}
            max={200}
            value={Math.round(scale * 100)}
            onChange={(e) => handleScale(Number(e.target.value) / 100)}
            className="w-full accent-cream h-1 bg-cream/20 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const ImageCropAdmin = () => {
  return (
    <div className="min-h-screen bg-primary">
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link
            to="/product/ceremonial-matcha"
            className="inline-flex items-center gap-2 font-body text-sm text-cream/50 hover:text-cream transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            Back to product
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl text-cream font-light tracking-wide mb-4"
          >
            Image Crop Settings
          </motion.h1>
          <p className="font-body text-sm text-cream/50 mb-12">
            Adjust how each product image is cropped and positioned. Changes are saved automatically and applied across the site.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img) => (
              <motion.div
                key={img.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageCropEditor imageKey={img.key} src={img.src} label={img.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropAdmin;
