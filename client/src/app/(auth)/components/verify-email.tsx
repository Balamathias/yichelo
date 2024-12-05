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
import { User } from "@/@types/user"
import { useSendVerificationOtp, useVerifyEmail } from "@/lib/react-query/user.query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LucideLoader } from "lucide-react"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

interface VerifyEmailProps {
  user?: User
}

export default function VerifyEmail({ user }: VerifyEmailProps) {

  const { mutate: verifyEmail, isPending: verifying } = useVerifyEmail()
  const { mutate: sendVerificationOtp, isPending: sending } = useSendVerificationOtp()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyEmail(data.otp, {
      onSuccess: (data) => {
        toast.success("Email verified successfully, redirecting...")
        router.replace("/")
      },
      onError: (error) => {
        toast.error("Failed to verify email", {
          description: "It seems like the one-time password you entered is incorrect. Please try again.",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                Please enter the one-time password we sent to your email <i className="italicise">{user?.email}</i>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center gap-x-1.5">
          <Button type="submit" className="rounded-xl">
            { verifying && <LucideLoader className="animate-spin" /> }
            { verifying ? "Verifying..." : "Verify" }
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="rounded-xl"
            onClick={() => {
              sendVerificationOtp(user?.email as string, {
                onSuccess: () => {
                  toast.success("One-time password sent successfully.")
                },
                onError: (error) => {
                  toast.error("Failed to send one-time password", {
                    description: error?.message,
                  })
                }
              })
            }}
            disabled={sending}
          >
            { sending && <LucideLoader className="animate-spin" /> }
            { sending ? "Sending..." : "Resend OTP" }
          </Button>
        </div>
      </form>
    </Form>
  )
}
