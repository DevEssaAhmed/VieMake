"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./ResetForm";

export function AuthForm() {
	return (
		<div className="w-full space-y-5">
			<Tabs defaultValue="reset" className="w-full">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="reset">Reset Password</TabsTrigger>
				</TabsList>
				<TabsContent value="reset">
					<SignInForm />
				</TabsContent>
			</Tabs>
		</div>
	);
}