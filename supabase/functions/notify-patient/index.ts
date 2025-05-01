import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { email, name, date } = await req.json();

  console.log(`Отправляем уведомление: ${email}, ${name}, ${date}`);

  // Здесь можно вызвать внешний API или отправить email

  return new Response(JSON.stringify({
    message: `Уведомление для ${name} отправлено!`
  }), {
    headers: { "Content-Type": "application/json" }
  });
});
