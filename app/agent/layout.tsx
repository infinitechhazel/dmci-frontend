export default function AgentPageLayout({
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
        <h1 className="uppercase text-3xl md:text-5xl text-white font-bold">agent profile</h1>
    
      </div>
      <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-8">
        {children}
      </section>
    </>
  );
}
