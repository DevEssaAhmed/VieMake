"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";
import OAuthForm from "./OAuthForm";

export function AuthForm() {
  return (
    <div className="w-full space-y-5">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Log in</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="reset" className="hidden">
            Forgot password?
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-full"></span>
            <p className="hover:cursor-default text-xs text-center text-gray-800 dark:text-gray-200 uppercase px-4">
              or
            </p>
            <span className="border-b w-full"></span>
          </div>
          <OAuthForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
