"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Ensure you have cn utility from shadcn

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <Card className="rounded-none py-4 fixed top-0 w-full z-10 ">
      <div className="container mx-auto flex justify-between items-center py-2">
        <h1 className="text-xl font-bold">SEAC</h1>
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
        </div>
      </div>
    </Card>
  );
};

export default Navbar;
