import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, User, ChevronDown, Delete, ArrowRight } from "lucide-react";

const DialPad = ({ onNumberClick, onDelete }: { onNumberClick: (num: string) => void; onDelete: () => void }) => {
  const keys = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "+" },
    { number: "#", letters: "" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {keys.map((key) => (
        <button
          key={key.number}
          onClick={() => onNumberClick(key.number)}
          className="flex flex-col items-center justify-center h-16 rounded-full bg-[hsl(var(--dialpad-bg))] hover:bg-muted transition-colors"
        >
          <span className="text-2xl font-medium text-[hsl(var(--dialpad-text))]">{key.number}</span>
          {key.letters && (
            <span className="text-xs text-muted-foreground">{key.letters}</span>
          )}
        </button>
      ))}
    </div>
  );
};

const TutorialCard = ({ onSkip, onNext }: { onSkip: () => void; onNext: () => void }) => (
  <div className="absolute top-0 left-0 right-0 bg-card rounded-t-3xl p-6 shadow-lg z-10">
    <Badge className="bg-primary text-primary-foreground mb-4">Tutorial</Badge>
    <h2 className="text-2xl font-bold mb-3 text-foreground">Enter a phone number</h2>
    <p className="text-muted-foreground mb-6">
      Type a phone number you want to call. You can use the dial pad or type directly.
    </p>
    <div className="flex items-center justify-between">
      <button
        onClick={onSkip}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Skip tutorial
      </button>
      <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

export const PhoneDialer = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);

  const handleNumberClick = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    console.log("Calling:", phoneNumber);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="bg-background rounded-3xl p-6 shadow-2xl">
          {showTutorial && (
            <TutorialCard
              onSkip={() => setShowTutorial(false)}
              onNext={() => setShowTutorial(false)}
            />
          )}

          <div className={`space-y-6 ${showTutorial ? "mt-64" : ""}`}>
            {/* Balance and status */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-foreground">Balance: $0.00</span>
                <button className="text-accent-foreground hover:text-foreground transition-colors">
                  <span className="text-lg">+</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>1 min test call available</span>
              </div>
            </div>

            {/* Phone input */}
            <div className="relative">
              <div className="flex items-center gap-2 border-2 border-primary rounded-2xl px-4 py-3 bg-card">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                  <span>US +1</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                {phoneNumber && (
                  <button onClick={handleDelete} className="text-muted-foreground hover:text-foreground">
                    <Delete className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Call from selector */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Call from:</span>
              <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                </div>
                <span>Public number</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Add contact button */}
            <div className="flex justify-center">
              <Button variant="outline" className="rounded-full border-2 text-foreground hover:bg-muted">
                <User className="h-4 w-4 mr-2" />
                Add contact
              </Button>
            </div>

            {/* Dial pad */}
            <DialPad onNumberClick={handleNumberClick} onDelete={handleDelete} />

            {/* Bottom actions */}
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--dialpad-bg))] hover:bg-muted transition-colors">
                <span className="text-lg font-medium text-[hsl(var(--dialpad-text))]">123</span>
              </button>
              <button
                onClick={handleCall}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-primary/90 transition-all shadow-lg"
              >
                <Phone className="h-6 w-6 text-primary-foreground" />
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--dialpad-bg))] hover:bg-muted transition-colors"
              >
                <Delete className="h-5 w-5 text-[hsl(var(--dialpad-text))]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
