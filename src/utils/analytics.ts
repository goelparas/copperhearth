export function getOrCreateDeviceUUID(): string {
  if (typeof window === "undefined") return "";
  let uuid = localStorage.getItem("device_uuid");
  if (!uuid) {
    uuid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("device_uuid", uuid);
  }
  return uuid;
}

export function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [local, domain] = parts;
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return "****";
  return "*".repeat(cleaned.length - 4) + cleaned.slice(-4);
}

export function trackVote(productId: string, productName: string, isVoted: boolean) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", isVoted ? "vote_cast" : "vote_removed", {
      product_id: productId,
      product_name: productName,
      device_uuid: getOrCreateDeviceUUID(),
    });
  }
}

export function trackSignup(email: string, phone: string, source: "modal" | "inline") {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "lead_signup", {
      signup_source: source,
      masked_email: maskEmail(email),
      masked_phone: maskPhone(phone),
      device_uuid: getOrCreateDeviceUUID(),
    });
  }
}

export function trackInteraction(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, {
      ...params,
      device_uuid: getOrCreateDeviceUUID(),
    });
  }
}
