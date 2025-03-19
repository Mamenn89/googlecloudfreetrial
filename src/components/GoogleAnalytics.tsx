import useGoogleAnalytics from "@/lib/useGoogleAnalytics";

export default function GoogleAnalytics() {
  // The hook will handle the script injection
  useGoogleAnalytics();
  
  // This component doesn't render anything
  return null;
} 