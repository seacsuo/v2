import rmlogo from "@public/rmlogov2.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Footer() {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <>
      <div className="border-b w-full border-dashed"></div>
      <Card className="text-center rounded-none border-y-0 border-x shadow-none container mx-auto ">
        <CardHeader>
          <CardTitle>
            &copy; 2016 - {getYear()} SEAC (&quot;South East Asian Club&quot;)
          </CardTitle>
          <CardDescription className="text-lg"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm flex items-center justify-center space-x-2">
            <p>Made with ❤️ by</p>
            <span>
              <a href="https://rinm.dev" target="_blank" rel="noreferrer">
                <Image
                  src={rmlogo}
                  alt="Rin Meng Logo"
                  width={75}
                  height={75}
                />
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
