'use client';

import { Product, formatPrice } from '@/data/products';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };

  const handleAddToCart = () => {
    addToCart(product);
    // Stay on current page - no redirect
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${product.name} (${formatPrice(product.price)}). Is it available?`
    );
    window.open(`https://wa.me/254743816791?text=${message}`, '_blank');
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col h-full">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="bg-[#f8f8f6] h-64 flex items-center justify-center overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={512}
                height={512}
                className="object-contain w-full h-full"
                priority={false}
              />
            ) : (
              <svg className="w-20 h-20 text-gray-300" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
                <rect x="20" y="10" width="8" height="2" rx="1" fill="currentColor" />
                <circle cx="24" cy="38" r="2" fill="currentColor" />
              </svg>
            )}
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <div className="bg-[#0066ff]/10 text-[#0066ff] px-2.5 py-1 rounded-lg text-xs font-semibold">
                {product.badge}
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute top-3 right-3">
            {product.stock < 10 && product.stock > 0 && (
              <div className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                Only {product.stock} left!
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg text-xs font-semibold">
                Out of Stock
              </div>
            )}
          </div>

          {/* Quick View Button */}
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold text-sm shadow-lg transform scale-95 group-hover:scale-100 transition-transform">
              Quick View
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[#0066ff] uppercase tracking-wider">{product.brand}</p>
            {product.kcbEligible && (
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-md font-medium">
                KCB
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-[#0a0a0a] mb-2 group-hover:text-[#0066ff] transition-colors duration-200 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#6b6b6b] mb-3 line-clamp-2">{product.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-lg font-bold text-[#0a0a0a]">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-[#6b6b6b] line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-auto">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="text-center px-4 py-2.5 bg-[#0066ff] text-white rounded-xl font-semibold text-sm hover:bg-[#0052cc] transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {product.stock === 0 ? 'Sold Out' : 'Buy Now'}
              </button>
              <button
                onClick={handleWhatsApp}
                className="text-center px-2.5 py-2.5 bg-[#25d366] text-white rounded-xl text-sm hover:bg-[#20bd5a] transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full px-4 py-2.5 bg-[#f8f8f6] text-[#0a0a0a] border border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[fade-in_150ms_ease-out]"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.2)] animate-[dialog-enter_200ms_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="sticky top-0 z-10 flex justify-end p-4 pb-0">
              <button
                onClick={() => setShowQuickView(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-6 pb-6">
              {/* Image */}
              <div className="flex items-center justify-center p-6 md:pr-8">
                <div className="bg-[#f8f8f6] rounded-2xl w-full aspect-square flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={800}
                      className="object-contain w-full h-full p-4"
                      priority
                    />
                  ) : (
                    <svg className="w-24 h-24 text-gray-300" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                      <rect x="10" y="8" width="44" height="48" rx="5" stroke="currentColor" strokeWidth="2.5" />
                      <rect x="26" y="12" width="12" height="3" rx="1.5" fill="currentColor" />
                      <circle cx="32" cy="50" r="2.5" fill="currentColor" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col py-2 md:py-6">
                {/* Brand + Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0066ff] uppercase tracking-wider">{product.brand}</span>
                  {product.badge && (
                    <span className="bg-[#0066ff]/10 text-[#0066ff] px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                      {product.badge}
                    </span>
                  )}
                  {product.kcbEligible && (
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide">
                      KCB
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-[#0a0a0a] mb-2 leading-tight">{product.name}</h2>

                <p className="text-sm text-[#6b6b6b] mb-5 leading-relaxed">{product.description}</p>

                {/* Specs */}
                <div className="mb-5">
                  <h3 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider mb-2.5">Specifications</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-1 bg-[#f8f8f6] text-xs text-[#404040] rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-5" />

                {/* Price + Stock */}
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-2xl font-bold text-[#0a0a0a] tracking-tight">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-sm text-[#6b6b6b] line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                        <span className="text-xs font-semibold text-green-600">
                          Save {discountPercentage}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? (product.stock < 10 ? 'bg-amber-400' : 'bg-green-500') : 'bg-gray-300'}`} />
                    <span className={`text-xs font-medium ${product.stock > 0 ? (product.stock < 10 ? 'text-amber-600' : 'text-green-600') : 'text-gray-400'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-[1fr_auto] gap-2.5">
                    <button
                      onClick={handleBuyNow}
                      disabled={product.stock === 0}
                      className="px-5 py-3 bg-[#0066ff] text-white rounded-xl font-semibold text-sm hover:bg-[#0052cc] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="px-5 py-3 bg-[#25d366] text-white rounded-xl text-sm hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="hidden sm:inline font-semibold">WhatsApp</span>
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full px-5 py-3 bg-[#f8f8f6] text-[#0a0a0a] border border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>

                {product.kcbEligible && (
                  <div className="mt-4 px-4 py-3 bg-green-50 rounded-xl flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-800">KCB Financing Available</p>
                      <p className="text-xs text-green-700 mt-0.5">Pay in easy installments. Contact us for details.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

