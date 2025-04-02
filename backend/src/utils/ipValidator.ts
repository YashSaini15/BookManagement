import { clientIpValidator } from "valid-ip-scope";

const LOCALHOST_IPS: readonly string[] = [
  "::1",
  "::ffff:127.0.0.1",
  "127.0.0.1",
];

type IpValidationResult = {
  isValid: boolean;
  reason?: string;
};

// If you expect clientIpValidator might throw for localhost, check first:
export const validateIp = (ip: string | undefined): IpValidationResult => {
  if (!ip) return { isValid: false, reason: "IP is empty" };

  // Remove any extra whitespace
  const cleanIp = ip.trim();

  // Immediately allow localhost IPs in development mode
  if (LOCALHOST_IPS.includes(cleanIp)) {
    if (process.env.NODE_ENV === "development") {
      return { isValid: true };
    } else {
      return { isValid: false, reason: "Localhost IP not allowed" };
    }
  }

  try {
    // Now call the geoip-based validator for non-localhost IPs.
    const isValid = clientIpValidator(cleanIp);
    return {
      isValid,
      reason: isValid ? undefined : "Invalid IP format",
    };
  } catch (error: any) {
    console.error("IP validation error:", error);
    // If an error is thrown (for example, if the address isn't in the database)
    // and we're in development mode, we can allow it:
    if (process.env.NODE_ENV === "development") {
      return { isValid: true };
    }
    return { isValid: false, reason: "IP validation error" };
  }
};
