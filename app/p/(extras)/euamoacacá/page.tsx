"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import {
  formatDistanceToNow,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Heart, Music } from "lucide-react";

export default function LoveCounter() {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: "",
  });

  const [showPlaylist, setShowPlaylist] = useState(false);

  // Data do início do relacionamento: 07/09/24 às 22:07
  const startDate = new Date(2024, 8, 7, 22, 7, 0);

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();

      const days = differenceInDays(now, startDate);
      const hours = differenceInHours(now, startDate) % 24;
      const minutes = differenceInMinutes(now, startDate) % 60;
      const seconds = differenceInSeconds(now, startDate) % 60;

      const formatted = formatDistanceToNow(startDate, {
        locale: ptBR,
        includeSeconds: true,
      });

      setTimeTogether({
        days,
        hours,
        minutes,
        seconds,
        formatted: `Há ${formatted} juntos`,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-rose-100 text-pink-900 p-4">
      <Head>
        <title>Nosso Tempo Juntos</title>
        <meta name="description" content="Contador do nosso amor" />
      </Head>

      <main className="w-full max-w-2xl mx-auto space-y-6">
        {/* Card Principal */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-rose-600 flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
              Nosso Amor
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
            </CardTitle>
            <p className="text-lg text-pink-700">
              Desde antes de 07/09/2024 às 22:07
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-medium text-pink-800">
                {timeTogether.formatted}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { value: timeTogether.days, label: "Dias" },
                { value: timeTogether.hours, label: "Horas" },
                { value: timeTogether.minutes, label: "Minutos" },
                { value: timeTogether.seconds, label: "Segundos" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-rose-100/80 p-4 rounded-lg border border-rose-200 text-center"
                >
                  <span className="text-3xl font-bold block text-rose-700">
                    {item.value}
                  </span>
                  <span className="text-sm text-rose-600">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                className="bg-green-500 hover:bg-green-600 text-white border-green-600 flex items-center gap-2"
                onClick={() => setShowPlaylist(!showPlaylist)}
              >
                <Music className="w-4 h-4" />
                {showPlaylist ? "Esconder Playlist" : "Nossa Playlist"}
              </Button>
            </div>

            {showPlaylist && (
              <div className="mt-6 rounded-lg overflow-hidden">
                <iframe
                  src="https://open.spotify.com/embed/playlist/2QjvyH0qo2o8qSj76d5x1C?utm_source=generator&theme=0"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              className="text-rose-600 hover:text-rose-800"
              onClick={() => (window.location.href = "/")}
            >
              ← Voltar à origem do app
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-pink-700 italic flex items-center justify-center gap-1">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          Cada segundo contigo é especial
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
        </p>
      </main>
    </div>
  );
}
