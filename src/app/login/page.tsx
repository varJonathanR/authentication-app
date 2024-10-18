import Auth from "@/components/Auth/Auth";
import RootLayout from "@/app/layout";

export default function Login() {
  return (
    <RootLayout>
      <main className="w-full md:w-5/6 pt-8 mx-auto flex flex-col items-center justify-center">
        <Auth register={false} />
      </main>
    </RootLayout>
  );
}
