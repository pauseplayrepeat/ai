// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const LandingPage = () => {
//   return (
//     <div>
//       Landing Page (Unrpotected)
//       <div>
//         <Link href="/sign-in">
//           <Button>Sign In</Button>
//         </Link>
//         <Link href="/sign-up">
//           <Button>Sign Up</Button>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default LandingPage;

import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";

const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
   );
}
 
export default LandingPage;
