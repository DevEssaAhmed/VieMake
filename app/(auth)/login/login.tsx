"use client";

import * as React from "react"

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [type, setType] = React.useState<string>('login')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: any) => {
    // This function is created to handle the sign up of new users, using signUp helper from Supabase

    setLoading(true)
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          role: 'company_admin',
        }
      },
    });
    setTimeout(() => setLoading(false), 5000)
    if (error) {
      setMessage(error.message)
      setLoading(false)
    }
    if (!error) {
      toast({
        title: `Email has been sent.`
      })
    }
    router.refresh();
  };

  const handleSignIn = async (e: any) => {
    // This function makes it possible for users to log in to the application with Password

    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message)
      console.log(error)
      setLoading(false)
    }
    router.refresh();
  };

  const handleReset = async (e: any) => {
    // This function makes it possible for users to log in to the application with Password

    e.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://demo-v1.supaboost.dev/reset'
    });

    if (error) {
      setMessage(error.message)
      console.log(error)
      setLoading(false)
    }
    router.refresh();
    setLoading(false)
  };

  const SignInWithGoogle = async() => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://demo-v1.supaboost.dev/auth/callback`,
      },
    })
  }

  if (type === 'login') {
    return (
      <>
        <Button variant="outline" className={cn(
          buttonVariants({ variant: "outline" }),
          "w-32 absolute right-4 top-4 md:right-8 md:top-8"
        )} onClick={() => {
          setType('signup')
          setMessage('')
        }}>Sign up</Button>
        <div className="min-w-full max-w-screen-lg">
          <form onSubmit={handleSignIn}>
            <h3 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center mb-8">
              Log in to your account
            </h3>
            <div className="flex flex-col my-2">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                className={message ? "border-destructive border" : ""}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onInput={(e: any) => setEmail(e.target.value)} />
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                className={message ? "border-destructive border mt-2" : "mt-2"}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                onInput={(e: any) => setPassword(e.target.value)} />
            </div>
            <p className="text-red-500 font-semibold text-sm text-center">
              {message}
            </p> 
            <p onClick={() => setType('reset')} className="hover:underline text-sm text-muted-foreground mt-2 text-right hover:cursor-pointer">Forgot password?</p>
            <Button variant={"default"} disabled={loading} type="submit" className="w-full mt-4">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in
            </Button>
          </form>
          <Button variant={"outline"} disabled={loading} type="submit" className="w-full mt-4" onClick={SignInWithGoogle}>
              Sign in with Google
            </Button>
        </div>
      </>
    )
  } else if (type === 'signup') {
    return (
      <>
        <Button variant="outline" className={cn(
          buttonVariants({ variant: "outline" }),
          "w-32 absolute right-4 top-4 md:right-8 md:top-8"
        )} onClick={() => {
          setType('login')
          setMessage('')
        }}>Login</Button>
        <div className="min-w-full max-w-screen-lg">
          <form onSubmit={handleSignUp}>
            <h3 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center mb-8">
              Create a new account
            </h3>
            <div className="flex flex-col my-2">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                className={message ? "border-destructive border" : ""}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onInput={(e: any) => setEmail(e.target.value)} />
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                className={message ? "border-destructive border mt-2" : "mt-2"}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                onInput={(e: any) => setPassword(e.target.value)} />
            </div>
            <p className="text-red-500 font-semibold text-sm text-center">
              {message}
            </p>
            <Button variant={"default"} disabled={loading} type="submit" className="w-full mt-4">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign up
            </Button>
          </form>
        </div>
      </>
    )
  } else if (type === 'reset') {
    return (
      <>
        <Button variant="outline" className={cn(
          buttonVariants({ variant: "outline" }),
          "w-32 absolute right-4 top-4 md:right-8 md:top-8"
        )} onClick={() => {
          setType('login')
          setMessage('')
        }}>Login</Button>
        <div className="min-w-full max-w-screen-lg">
          <form onSubmit={handleReset}>
            <h3 className="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center mb-8">
              Send a password reset email
            </h3>
            <div className="flex flex-col my-2">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                className={message ? "border-destructive border" : ""}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onInput={(e: any) => setEmail(e.target.value)} />
            </div>
            <p className="text-red-500 font-semibold text-sm text-center">
              {message}
            </p>
            <Button variant={"default"} disabled={loading} type="submit" className="w-full mt-4">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Reset
            </Button>
          </form>
        </div>
      </>
    )
  }
}