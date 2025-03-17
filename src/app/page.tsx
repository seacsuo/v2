import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-4">
      <Card className="container mx-auto">
        <CardHeader>
          <CardTitle>South East Asian Club</CardTitle>
          <CardDescription>
            We are a club that celebrates the diverse cultures of South East
            Asia.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
