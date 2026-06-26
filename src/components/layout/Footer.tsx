import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl gradient-brand text-white font-display font-black">G</span>
            <span className="font-display text-xl font-extrabold">Grip <span className="text-primary">Nova</span> Co.</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium physiotherapy, rehabilitation and recovery products — delivered across India.
          </p>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="size-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="size-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-primary"><Youtube className="size-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/shop/$category" params={{ category: "tens-machines" }} className="hover:text-primary">TENS Machines</Link></li>
            <li><Link to="/shop/$category" params={{ category: "resistance-bands" }} className="hover:text-primary">Resistance Bands</Link></li>
            <li><Link to="/shop/$category" params={{ category: "knee-braces" }} className="hover:text-primary">Knee Braces</Link></li>
            <li><Link to="/shop/$category" params={{ category: "foam-rollers" }} className="hover:text-primary">Foam Rollers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Information</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About Grip Nova Co.</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/faqs" className="hover:text-primary">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Policies</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/exchange-policy" className="hover:text-primary">Exchange Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /> +91 72076 82536</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-primary" /> care@gripnova.in</li>
            <li className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-primary" /> India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Grip Nova Co. All rights reserved.</span>
          <Link to="/admin/login" className="hover:text-primary">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
