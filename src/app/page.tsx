import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="container mx-auto">
      <CardHeader>Welcome to the South East Asian Club!</CardHeader>
      <CardDescription>
        We are a club that celebrates the diverse cultures of South East Asia.
      </CardDescription>
    </Card>
  );
}
