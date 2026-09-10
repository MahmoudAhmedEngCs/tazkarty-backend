import { Router } from "express";
import { GetAllMatchesController } from "../controllers/match/GetAllMatchesController";
import { validate } from "../middlewares/validate";
import { matchIdSchema, matchQuerySchema } from "../validation/matchSchemas";
import { GetMatchByIdController } from "../controllers/match/GetMatchByIdController";
import { GetSectionsForMatchController } from "../controllers/section/GetSectionsForMatchController";
import { matchIdParamSchema, matchSectionParamsSchema } from "../validation/sectionschema";
import { GetAvailableSeatsForMatchSectionController } from "../controllers/seat/GetAvailableSeatsForMatchSectionController";
import { bookTicketBodySchema, bookTicketParamsSchema } from "../validation/ticketSchema";
import { authMiddleware } from "../middlewares/authMiddleware";
import { BookTicketController } from "../controllers/ticket/BookTicketController";
import { jwtService, userRepository } from "../../infrastructure/container/userContainer";

const router = Router();

export function createMatchRoutes(
 getAllMatchesController: GetAllMatchesController,
 getMatchByIdController: GetMatchByIdController,
 getSectionsForMatchController: GetSectionsForMatchController,
 getAvailableSeatsForMatchSectionController: GetAvailableSeatsForMatchSectionController,
 bookTicketController: BookTicketController
 
) {
    /**
 * @swagger
 * /matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     parameters:
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         description: Filter matches by team name
 *         example: "Al Ahly"
 *       - in: query
 *         name: upcoming
 *         schema:
 *           type: boolean
 *         description: Filter upcoming or past matches
 *         example: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [matchDatetime]
 *         example: matchDatetime
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: asc
 *     responses:
 *       200:
 *         description: Matches retrieved successfully
 *       400:
 *         description: Invalid query parameters
 */
router.get(
  "/",
  validate(matchQuerySchema, "query"),
  getAllMatchesController.execute.bind(getAllMatchesController)
);

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Get match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Match retrieved successfully
 *       400:
 *         description: Invalid match ID
 *       404:
 *         description: Match not found
 */
router.get(
  "/:id",
  validate(matchIdSchema, "params"),
  getMatchByIdController.execute.bind(getMatchByIdController)
);

/**
 * @swagger
 * /matches/{matchId}/sections:
 *   get:
 *     summary: Get sections for a match
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Sections retrieved successfully
 *       400:
 *         description: Invalid match ID
 */
router.get(
  "/:matchId/sections",
  validate(matchIdParamSchema, "params"),
  getSectionsForMatchController.execute.bind(getSectionsForMatchController)
);

/**
 * @swagger
 * /matches/{matchId}/sections/{sectionName}/seats:
 *   get:
 *     summary: Get available seats for a section in a match
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *       - in: path
 *         name: sectionName
 *         required: true
 *         schema:
 *           type: string
 *         example: A
 *     responses:
 *       200:
 *         description: Available seats retrieved successfully
 *       400:
 *         description: Invalid parameters
 */
router.get(
  "/:matchId/sections/:sectionName/seats",
  validate(matchSectionParamsSchema, "params"),
  getAvailableSeatsForMatchSectionController.execute.bind(
    getAvailableSeatsForMatchSectionController
  )
);

/**
 * @swagger
 * /matches/{matchId}/tickets:
 *   post:
 *     summary: Book a ticket for a match
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sectionName
 *               - seatName
 *             properties:
 *               sectionName:
 *                 type: string
 *                 example: A
 *               seatName:
 *                 type: string
 *                 example: B1
 *     responses:
 *       201:
 *         description: Ticket booked successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Authentication required
 *       409:
 *         description: Seat is already booked or user already has a ticket for this match
 */
router.post(
  "/:matchId/tickets",
  authMiddleware(jwtService, userRepository),
  validate(bookTicketParamsSchema, "params"),
  validate(bookTicketBodySchema, "body"),
  bookTicketController.execute.bind(bookTicketController)
);

    return router;
}