import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CallHistory = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-foreground mb-8">Call history</h1>
        
        <div className="bg-dialpad-bg rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <Phone className="w-16 h-16 text-muted-foreground/50" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-xl font-medium text-foreground mb-2">
            No call history yet
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Make your first call from the phone tab
          </p>
          
          <Link 
            to="/"
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 transition-colors"
          >
            Go to Phone →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallHistory;
