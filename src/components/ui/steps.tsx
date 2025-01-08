import { cn } from "@/lib/utils";

interface StepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2",
              currentStep > index + 1
                ? "bg-primary border-primary text-primary-foreground"
                : currentStep === index + 1
                ? "border-primary text-primary"
                : "border-muted-foreground text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-12 mx-2",
                currentStep > index + 1
                  ? "bg-primary"
                  : "bg-muted-foreground"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}