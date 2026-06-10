type GtagParams = Record<string, string | number | boolean | undefined>;
type Gtag = (command: "event", eventName: string, params: GtagParams) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function getOrCreateDeviceUUID(): string {
  if (typeof window === "undefined") return "";
  let uuid = localStorage.getItem("device_uuid");
  if (!uuid) {
    uuid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("device_uuid", uuid);
  }
  return uuid;
}

export function trackInteraction(eventName: string, params?: GtagParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...params,
      device_uuid: getOrCreateDeviceUUID(),
    });
  }
}

export function trackCtaClick(location: string, destination: string) {
  trackInteraction("cta_click", {
    location,
    destination,
  });
}

export function trackVote(productId: string, productName: string, isVoted: boolean) {
  trackInteraction(isVoted ? "vote_submit_success" : "vote_removed", {
    finish_id: productId,
    finish_name: productName,
  });
}

export function trackVoteAttempt(productId: string, productName: string) {
  trackInteraction("vote_submit_attempt", {
    finish_id: productId,
    finish_name: productName,
  });
}

export function trackVoteError(productId: string, productName: string, status: string | number) {
  trackInteraction("vote_submit_error", {
    finish_id: productId,
    finish_name: productName,
    status,
  });
}

export function trackLeadAttempt(source: string) {
  trackInteraction("lead_submit_attempt", {
    source,
  });
}

export function trackSignup(source: string) {
  trackInteraction("lead_signup_success", {
    source,
  });
}

export function trackLeadError(source: string, status: string | number) {
  trackInteraction("lead_signup_error", {
    source,
    status,
  });
}

export function trackDiscountChoice(choice: "claimed" | "full_price") {
  trackInteraction("discount_choice", {
    choice,
  });
}
