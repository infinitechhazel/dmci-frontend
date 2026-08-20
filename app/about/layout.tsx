'use client'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <>
      <div className="flex flex-col items-center inset-0 justify-center w-full h-52 bg-cover bg-center bg-no-repeat py-8"
        style={{
          backgroundImage: `url('/page-banner.png')`,
        }}>
        <h1 className="uppercase text-3xl md:text-5xl font-bold text-white">about us</h1>
      </div>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block text-center justify-center">{children}</div>
      </section>
    </>

  );
}
