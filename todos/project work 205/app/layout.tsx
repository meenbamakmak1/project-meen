'use client'


import Header from "@/components/Header";
import "./globals.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import { Badge } from "@/components/tailgrids/core/badge";


import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

import { GlobalDataContext } from "@/context/GlobalData";
import { fetchProducts } from "@/data/products";
import type { Product } from "@/data/products";
import type { User } from "@/data/users";

const USER_KEY = "csi205-user";
const CARTS_KEY = "csi205-carts";

// ปุ่มเมนู: ใช้ style ของ Button แต่เป็น Link ตรง ๆ (ไม่เอา <button> ไปซ้อนใน <a>)
const navStyle = (active: boolean) =>
  buttonStyles({ variant: "primary", appearance: active ? "fill" : "outline" });


export default function RootLayout({ children }: LayoutProps<"/">) {

  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [cartsLoaded, setCartsLoaded] = useState(false);

  useEffect(() => {
    // โหลดตะกร้าที่เคยบันทึกไว้ก่อน
    let savedCarts: Product[] = [];
    try {
      const saved = localStorage.getItem(CARTS_KEY);
      if (saved) savedCarts = JSON.parse(saved) as Product[];
    } catch {}
    setCarts(savedCarts);
    setCartsLoaded(true);

    // สินค้าที่อยู่ในตะกร้าแล้ว ไม่ต้องโชว์ซ้ำในหน้า Products
    const inCart = new Set(savedCarts.map((p) => p.id));
    fetchProducts()
      .then((data) =>
        setProducts((data as Product[]).filter((p) => !inCart.has(p.id)))
      )
      .catch(() => setProducts([]));
  }, []);

  // บันทึกตะกร้าทุกครั้งที่มีการเพิ่ม / ลบ
  useEffect(() => {
    if (!cartsLoaded) return;
    try {
      localStorage.setItem(CARTS_KEY, JSON.stringify(carts));
    } catch {}
  }, [carts, cartsLoaded]);

  // user เก็บไว้แค่ใน state: เปลี่ยนหน้าไม่ต้อง login ใหม่ แต่รีเฟรชแล้วต้อง login ใหม่
  // (ลบ user เก่าที่เวอร์ชันก่อนเคยบันทึกไว้ในเบราว์เซอร์)
  useEffect(() => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{ products, setProducts, carts, setCarts, user, setUser }}
    >
    <html>
      <body>

        <Header/>
        <nav className="mt-4 flex justify-center gap-4">
          <Link href="/" className={navStyle(pathname === "/")}>
      Home
          </Link>
          <Link href="/animation" className={navStyle(pathname === "/animation")}>
      Animation
          </Link>
          <Link href="/calculator" className={navStyle(pathname === "/calculator")}>
      Calculator
          </Link>
          <Link href="/todos" className={navStyle(pathname === "/todos")}>
      Todos
          </Link>
          <Link href="/products" className={navStyle(pathname === "/products")}>
      Products ({products.length})
          </Link>
          <div className="relative">
            <Link href="/carts" className={navStyle(pathname === "/carts")}>
      Carts
            </Link>
            <Badge size="sm" className="absolute -top-2 -right-2 bg-red-600 text-slate-50">
              {carts.length}
            </Badge>
          </div>
          <Button appearance="outline" variant="danger" onPress={() => setUser(null)}>
      Logout
    </Button>
        </nav>
        <main>{children}</main>
        <Footer />
        <LoginModal isOpen={user === null} onLogin={setUser} />
      </body>
    </html>
    </GlobalDataContext.Provider>
  );
}
