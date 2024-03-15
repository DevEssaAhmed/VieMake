import Link from "next/link";
import "./../../globals.css";
import RegisterForm from "./components/RegisterForm";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex">
            {/* Left side of the page */}
            <div className="w-1/2 h-screen bg-foreground dark:bg-background flex border border-foreground dark:border-background">
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
            <div className="w-1/2 h-screen flex">
                <div className="m-auto w-1/2">
                    {/* The login component */}
                    {/* <Login /> */}
                    <RegisterForm />
                    {children}
                    <p className="mt-8 px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        {/* Add your link to Terms of Service */}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        {/* Add your link to Privacy Policy */}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>

        </section>
    );
}