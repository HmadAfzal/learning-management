import { cn } from "@/lib/utils"
import { Check } from 'lucide-react'
import React from "react"

interface WizardStepperProps {
  currentStep: number
}

const WizardStepper = ({ currentStep }: WizardStepperProps) => {
  return (
    <div className="mb-4 flex w-1/2 flex-col items-center">
      <div className="mb-2 flex w-full items-center justify-between">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={cn("mb-2 flex h-8 w-8 items-center justify-center rounded-full", {
                  "bg-primary text-primary-foreground":
                    currentStep > step || (currentStep === 3 && step === 3),
                  "bg-secondary text-secondary-foreground":
                    currentStep === step && step !== 3,
                  "border border-muted-foreground text-muted-foreground": currentStep < step,
                })}
              >
                {currentStep > step || (currentStep === 3 && step === 3) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <p
                className={cn("text-sm", {
                  "text-foreground": currentStep >= step,
                  "text-muted-foreground": currentStep < step,
                })}
              >
                {step === 1 && "Details"}
                {step === 2 && "Payment"}
                {step === 3 && "Completion"}
              </p>
            </div>
            {index < 2 && (
              <div
                className={cn("mt-4 h-[1px] w-1/4 self-start", {
                  "bg-primary": currentStep > step,
                  "bg-muted": currentStep <= step,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default WizardStepper