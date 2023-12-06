/**
 * util that takes the filter value for the analytics and formats it into a human friendly format
 * @param value the filter of the analytics
 * @returns the formatted string
 */
export const normalizeFilterValue = (value: number | "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "lastYear") => {
    let result;

    switch (value) {
        case "today":
            result = "TODAY"
            break;
        case "yesterday":
            result = "YESTERDAY"
            break;
        case "last7days":
            result = "LAST 7 DAYS"
            break;
        case "last30days":
            result = "LAST 30 DAYS"
            break;
        case "last90days":
            result = "LAST 90 DAYS"
            break;
        case "lastYear":
            result = "LAST YEAR"
            break;
        default:
            result = `Q${value}`
            break;
    }

    return result;
}