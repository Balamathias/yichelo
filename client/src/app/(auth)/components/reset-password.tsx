"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useResetPassword } from "@/lib/react-query/user.query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LucideLoader } from "lucide-react"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP is not complete, please check and try again.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long"
  }),
})

interface VerifyEmailProps {
  email?: string,
}

export default function ResetPassword({ email }: VerifyEmailProps) {

  const { mutate: resetPassword, isPending: resetting } = useResetPassword()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data?.password !== data?.confirmPassword) {
      return form.setError("confirmPassword", { message: "Passwords do not match." })
    }

    resetPassword({
      otp: data?.otp,
      password: data?.password
    }, {
      onSuccess: (data) => {
        toast.success("Password reset was successful, redirecting...")
        router.replace("/")
      },
      onError: (error) => {
        toast.error("Failed to reset password.", {
          description: "It seems like the one-time password you entered is incorrect or it's expired. Please try again.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5 space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup className="flex flex-row items-center gap-x-1.5">
                    <InputOTPSlot index={0} className="rounded-xl"/>
                    <InputOTPSlot index={1} className="rounded-xl"/>
                    <InputOTPSlot index={2} className="rounded-xl"/>
                    <InputOTPSlot index={3} className="rounded-xl"/>
                    <InputOTPSlot index={4} className="rounded-xl"/>
                    <InputOTPSlot index={5} className="rounded-xl"/>
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the reset password OTP we sent to your email <i className="italicise">{email}</i>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-12" placeholder="Enter your new password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} className="h-12" placeholder="Confirm your new password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center gap-x-1.5">
          <Button type="submit" className="rounded-xl">
            { resetting && <LucideLoader className="animate-spin" /> }
            { resetting ? "Processing..." : "Proceed" }
          </Button>

        </div>
      </form>
    </Form>
  )
}
