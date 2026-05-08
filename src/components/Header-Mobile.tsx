'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface NavLink {
  href: string;
  label: string;
}

interface ProductCategory {
  href: string;
  label: string;
}

interface HeaderMobileProps {
  navLinks: NavLink[];
  productCategories: ProductCategory[];
}

export default function HeaderMobile({ navLinks, productCategories }: HeaderMobileProps) {
  const { getCartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only showing cart count after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden flex items-center gap-3">
      {/* Cart Icon */}
      <Link
        href="/cart"
        className="relative text-gray-700 hover:text-blue-600 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {mounted && getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {getCartCount()}
          </span>
        )}
      </Link>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Mobile menu trigger button */}
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      {/* Mobile menu content - opens from left */}
      <SheetContent
        side="left"
        className="w-[280px] sm:w-[320px] p-0 flex flex-col"
        overlayClassName="bg-white/30 backdrop-blur-sm"
      >
        {/* Header with logo */}
        <SheetHeader className="border-b px-4 py-4">
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <Image
              src="/company-logo/logo.png"
              alt="Gadgets By Kihoro Logo"
              width={180}
              height={36}
              className="h-9 w-auto"
            />
          </Link>
          <SheetTitle className="sr-only">Main Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate through Gadgets By Kihoro products, services, and contact information
          </SheetDescription>
        </SheetHeader>

        {/* Navigation links */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              link.label === 'Products' ? (
                <Accordion key={link.href} type="single" collapsible className="border-0">
                  <AccordionItem value="products" className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold text-base text-gray-700 transition-colors">
                      {link.label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="ml-4 mt-1 space-y-1">
                        {productCategories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={handleLinkClick}
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* WhatsApp CTA Button - Fixed at bottom */}
        <SheetFooter className="mt-auto border-t">
          <a
            href="https://wa.me/254743816791"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-base hover:shadow-lg transition-shadow"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </div>
  );
}
