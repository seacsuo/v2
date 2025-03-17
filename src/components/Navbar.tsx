"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import seacIcon from "@/app/icon.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div>
      <Card className="rounded-none py-4 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center flex-row gap-4">
            <Image src={seacIcon} width={50} height={50} alt="SEAC Logo" />
            <CardTitle className="text-3xl">SEAC</CardTitle>
          </div>
          <div className="flex gap-4 items-center">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "link" : "ghost"} // Highlight active link
                className={cn(
                  "text-sm",
                  pathname === link.href && "font-bold text-primary underline"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <ModeToggle />
            <Sheet>
              <SheetTrigger>
                <Button size={"icon"} variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="flex items-center gap-4">
                  <Image
                    src={seacIcon}
                    width={100}
                    height={100}
                    alt="SEAC Logo"
                  />
                </SheetHeader>
                <div className="flex flex-col gap-4 w-1/2 mx-auto justify-center">
                  {links.map((link) => (
                    <Button
                      key={link.href}
                      variant={pathname === link.href ? "link" : "ghost"} // Highlight active link
                      className={cn(
                        "text-sm",
                        pathname === link.href &&
                          "font-bold text-primary underline"
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
