import React from "react"
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation"
import { useCurrentCourse } from "@/hooks/useCurrentCourse"
import { useClerk, useUser } from "@clerk/nextjs"
import { CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCreateTransactionMutation } from "@/state/api"
import { toast } from "sonner"
import CoursePreview from "@/components/NonDashboard/course-preview"
import StripeProvider from "./StripeProvider"

const PaymentPageContent = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [createTransaction] = useCreateTransactionMutation()
  const { navigateToStep } = useCheckoutNavigation()
  const { course, courseId } = useCurrentCourse()
  const { user } = useUser()
  const { signOut } = useClerk()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      toast.error("Stripe service is not available")
      return
    }

    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
      ? `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : undefined

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
      },
      redirect: "if_required",
    })

    if (result.paymentIntent?.status === "succeeded") {
      const transactionData: Partial<Transaction> = {
        transactionId: result.paymentIntent.id,
        userId: user?.id,
        courseId: courseId,
        paymentProvider: "stripe",
        amount: course?.price || 0,
      }

      await createTransaction(transactionData)
      navigateToStep(3)
    }
  }

  const handleSignOutAndNavigate = async () => {
    await signOut()
    navigateToStep(1)
  }

  if (!course) return null

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 gap-10 sm:flex">
        {/* Order Summary */}
        <div className="basis-1/2 rounded-lg">
          <CoursePreview course={course} />
        </div>

        {/* Payment Form */}
        <div className="basis-1/2">
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4 rounded-lg bg-card p-10">
              <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
              <p className="text-sm text-muted-foreground">
                Fill out the payment details below to complete your purchase.
              </p>

              <div className="mt-6 flex w-full flex-col gap-2">
                <h3 className="text-md text-foreground">Payment Method</h3>

                <div className="flex flex-col rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 bg-muted/50 px-2 py-2">
                    <CreditCard size={24} className="text-foreground" />
                    <span className="text-foreground">Credit/Debit Card</span>
                  </div>
                  <div className="px-4 py-6">
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex w-full items-center justify-between">
        <Button
          className="hover:bg-accent"
          onClick={handleSignOutAndNavigate}
          variant="outline"
          type="button"
        >
          Switch Account
        </Button>

        <Button
          form="payment-form"
          type="submit"
          className="bg-primary hover:bg-primary/90"
          disabled={!stripe || !elements}
        >
          Pay with Credit Card
        </Button>
      </div>
    </div>
  )
}

const PaymentPage = () => (
  <StripeProvider>
    <PaymentPageContent />
  </StripeProvider>
)

export default PaymentPage