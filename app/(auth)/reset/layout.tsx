import "./../../globals.css";
import Reset from "./reset";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex m-auto">
      <div className="md:h-screen flex">
        <div className="m-auto">
          {/* The login component */}
          {/* <Login /> */}
          <div className="flex justify-center items-center md:h-screen">
            <div className="md:w-96 w-72">
              <Reset />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
