"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import seacIcon from "@/app/icon.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/merch", label: "Merch" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div>
      <Card className="rounded-none py-4 fixed top-0 w-full z-10 px-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center flex-row gap-4">
            <Image src={seacIcon} width={50} height={50} alt="SEAC Logo" />
            <CardTitle className="text-3xl font-extralight">SEAC</CardTitle>
          </Link>
          <div className="flex gap-4 items-center">
            {/* Links for desktop */}
            <div className="hidden gap-4 items-center lg:flex">
              {links.map((link) => (
                <Button
                  asChild
                  key={link.href}
                  variant={pathname === link.href ? "link" : "ghost"} // Highlight active link
                  className={cn(
                    "text-md",
                    pathname === link.href && "font-bold underline"
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
            <ModeToggle />
            {/* Links for mobile */}
            <Sheet>
              <SheetTrigger className="flex items-center">
                <div className="p-2 rounded-lg items-center border bg-primary text-secondary dark:text-secondary-foreground">
                  <Menu />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="flex items-center gap-4">
                  <Link href="/">
                    <SheetTitle></SheetTitle>
                    <Image
                      src={seacIcon}
                      width={100}
                      height={100}
                      alt="SEAC Logo"
                    />
                  </Link>
                </SheetHeader>
                <div className="flex flex-col gap-4 w-1/2 mx-auto justify-center">
                  {links.map((link) => (
                    <Button
                      asChild
                      key={link.href}
                      variant={pathname === link.href ? "link" : "ghost"} // Highlight active link
                      className={cn(
                        "text-md",
                        pathname === link.href && "font-bold underline"
                      )}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                  <div className="flex justify-center">
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Navbar;
