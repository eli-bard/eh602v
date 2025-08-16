import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Desculpe, algo deu errado.
              </CardTitle>
            </CardHeader>
            <Image src="/imgs/notfoundimgs/sorry-cat.jpg" alt="Gato triste" />
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Code error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Um erro não especificado ocorreu - código SOS
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
