import API from "./api";

export const getReportStats = () =>
    API.get("/reports/stats");

export const getLowStockReport = () =>
    API.get("/reports/low-stock");