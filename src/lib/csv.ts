/**
 * Convert headers and rows to an RFC 4180 compliant CSV string.
 *
 * Rules applied:
 * - Fields containing commas, double quotes, or newlines are enclosed in double quotes
 * - Double quotes within fields are escaped by doubling them
 * - Each record is terminated with CRLF
 */
export function toCSV(headers: string[], rows: string[][]): string {
  const escapeField = (field: string): string => {
    if (
      field.includes(",") ||
      field.includes('"') ||
      field.includes("\n") ||
      field.includes("\r")
    ) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const lines: string[] = [
    headers.map(escapeField).join(","),
    ...rows.map((row) => row.map(escapeField).join(",")),
  ];

  return lines.join("\r\n") + "\r\n";
}
