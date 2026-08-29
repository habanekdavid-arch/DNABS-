import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf9f6",
      }}
    >
      <SignIn fallbackRedirectUrl="/admin" />
    </div>
  );
}
