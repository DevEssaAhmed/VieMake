export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col md:flex-row">
      {/* Left side of the page */}
      <div className="md:w-1/2 h-40 md:h-screen bg-foreground dark:bg-background flex border border-foreground dark:border-background">
        <div className="text-white m-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Template
          </h1>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Plus text you can write here
          </h4>
        </div>
      </div>
      {/* Right side of the page */}
      <div className="md:w-1/2 md:h-screen flex mt-20 p-4">
        {/* The login component */}
        {children}
      </div>
    </section>
  );
}
