
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

/**
 * Formats a date string or Date object into a human-readable format
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, "h:mm a")}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, "h:mm a")}`;
  } else {
    return format(dateObj, "MMM d, yyyy");
  }
}

/**
 * Returns a relative time string (e.g., "5 minutes ago", "2 days ago")
 */
export function timeAgo(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Formats a date for display in a form or input
 */
export function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy-MM-dd");
}
