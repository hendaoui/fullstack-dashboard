import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import { DataEntry, Metric } from "../models";
import { body } from "express-validator";

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, async (req, res) => {
    try {
        const metricId = parseInt(req.params.id, 10);

        if (isNaN(metricId)) {
            return res.status(400).json({ error: "Invalid metric ID" });
        }

        const metric = await Metric.findByPk(metricId);
        if (!metric) {
            return res.status(404).json({ error: "Metric not found" });
        }

        if (
            req.user?.role !== "ADMIN" &&
            req.user?.department !== metric.department
        ) {
            return res
                .status(403)
                .json({ error: "Unauthorized to access this metric" });
        }

        const dataEntries = await DataEntry.findAll({
            where: { metric_id: metricId },
        });
        res.json(dataEntries);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching data entries" });
    }
});

router.post(
    "/add",
    authenticate,
    body("value").exists().withMessage("Value must provided"),
    body("entryDate").isISO8601().withMessage("date_entry must be a valid date"),
    async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const { value, entryDate } = req.body;
        const metric_id = parseInt(req.params.id, 10);

        if (isNaN(metric_id)) {
            return res.status(400).json({ error: "Invalid metric ID" });
        }

        try {
            const metric = await Metric.findByPk(metric_id);
            if (
                !metric ||
                (user.role !== "ADMIN" && metric.department !== user.department)
            ) {
                return res
                    .status(400)
                    .json({ error: "Invalid or inaccessible metric" });
            }

            const _entryDate = new Date(entryDate);

            if (isNaN(_entryDate.getTime())) {
                return res.status(400).json({ error: "Invalid entry date format" });
            }

            const newEntry = await DataEntry.create({
                metric_id,
                value,
                last_update: new Date(),
                created_by: user.email,
                entry_date: _entryDate,
            });

            res.status(201).json(newEntry);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.post(
    "/update/:entryId",
    authenticate,
    body("value").exists().withMessage("Value must be provided"),
    body("entry_date").isISO8601().withMessage("date_entry must be a valid date"),
    async (req: Request, res: Response) => {
        const { entryId } = req.params;

        if (!entryId) {
            return res.status(400).json({ error: "Entry ID is required" });
        }

        const { value, entry_date } = req.body;

        const metricId = parseInt(req.params.id, 10);
        if (isNaN(metricId)) {
            return res.status(400).json({ error: "Invalid metric ID" });
        }

        try {
            const dataEntry = await DataEntry.findByPk(entryId);

            if (!dataEntry) {
                return res.status(404).json({ error: "Data entry not found" });
            }

            const metric = await Metric.findByPk(dataEntry.metric_id);
            if (!metric) {
                return res.status(404).json({ error: "Metric not found" });
            }

            if (
                req.user?.role !== "ADMIN" &&
                req.user?.department !== metric.department
            ) {
                return res
                    .status(403)
                    .json({ error: "Unauthorized to update this entry" });
            }

            if (value !== undefined) {
                dataEntry.value = value;
            }

            if (entry_date !== undefined) {
                const _entryDate = new Date(entry_date);
                if (isNaN(_entryDate.getTime())) {
                    return res.status(400).json({ error: "Invalid entry_date format" });
                }
                dataEntry.entry_date = _entryDate;
            }

            dataEntry.created_by = req.user.email;
            dataEntry.last_update = new Date();
            await dataEntry.save();

            res.json(dataEntry);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.delete(
    "/delete/:entryId",
    authenticate,
    async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        const metric_id = parseInt(req.params.id, 10);
        const entry_id = parseInt(req.params.entryId, 10);

        if (isNaN(metric_id) || isNaN(entry_id)) {
            return res.status(400).json({ error: "Invalid metric or entry ID" });
        }

        try {
            const metric = await Metric.findByPk(metric_id);
            if (
                !metric ||
                (user.role !== "ADMIN" && metric.department !== user.department)
            ) {
                return res
                    .status(400)
                    .json({ error: "Invalid or inaccessible metric" });
            }

            const dataEntry = await DataEntry.findByPk(entry_id);
            if (!dataEntry) {
                return res.status(404).json({ error: "Data entry not found" });
            }

            if (user.role !== "ADMIN" && dataEntry.created_by !== user.email) {
                return res
                    .status(403)
                    .json({ error: "Unauthorized to delete this entry" });
            }

            await dataEntry.destroy();

            res.status(200).json({ message: "Data entry deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

export default router;
