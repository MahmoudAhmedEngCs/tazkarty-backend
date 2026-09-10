import { GetAllMatches } from "../../application/useCases/match/GetAllMatches";
import { GetMatchById } from "../../application/useCases/match/GetMatchById";
import { GetAvailableSeatsForMatchSection } from "../../application/useCases/seat/GetAvailableSeatsForMatchSection";
import { GetSectionsForMatch } from "../../application/useCases/section/GetSectionsForMatch";
import { BookTicket } from "../../application/useCases/ticket/BookTicket";
import { GetAllMatchesController } from "../../presentation/controllers/match/GetAllMatchesController";
import { GetMatchByIdController } from "../../presentation/controllers/match/GetMatchByIdController";
import { GetAvailableSeatsForMatchSectionController } from "../../presentation/controllers/seat/GetAvailableSeatsForMatchSectionController";
import { GetSectionsForMatchController } from "../../presentation/controllers/section/GetSectionsForMatchController";
import { BookTicketController } from "../../presentation/controllers/ticket/BookTicketController";
import { PrismaMatchRepository } from "../repositories/PrismaMatchRepository";
import { PrismaSeatRepository } from "../repositories/PrismaSeatRepository";
import { PrismaSectionRepository } from "../repositories/PrismaSectionRepository";
import { PrismaTicketRepository } from "../repositories/PrismaTicketRepository";

//
const matchRepository = new PrismaMatchRepository();
const sectionRepository = new PrismaSectionRepository(); 
const seatRepository = new PrismaSeatRepository();
const ticketRepository = new PrismaTicketRepository();
//
const getAllMatches = new GetAllMatches(matchRepository);
const getMatchById = new GetMatchById(matchRepository);
const getSectionsForMatch = new GetSectionsForMatch(sectionRepository); 
const getAvailableSeatsForMatchSection = new GetAvailableSeatsForMatchSection(seatRepository);
const bookTicket = new BookTicket(matchRepository,seatRepository,ticketRepository);
//  
export const getAllMatchesController = new GetAllMatchesController(getAllMatches);
export const getMatchByIdController = new GetMatchByIdController(getMatchById);
export const getSectionsForMatchController = new GetSectionsForMatchController(getSectionsForMatch);
export const getAvailableSeatsForMatchSectionController = new GetAvailableSeatsForMatchSectionController(getAvailableSeatsForMatchSection);
export const bookTicketController =
  new BookTicketController(bookTicket);