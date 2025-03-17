"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <Card className="rounded-none ">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">MySite</h1>
        <div className="flex gap-4  items-center">
          <Button variant="link">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="link">
            <Link href="/about">About</Link>
          </Button>
          <Button variant="link">
            <Link href="/events">Events</Link>
          </Button>
          <Button variant="link">
            <Link href="/contact">Contact</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </Card>
  );
};

export default Navbar;
