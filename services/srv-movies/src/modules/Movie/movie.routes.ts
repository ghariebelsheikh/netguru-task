import { validateAccessTokenAndAppendUserToReq } from "../../middleware/auth.middleware";
import { asyncTryCatch } from "../../utils/error-handler";
import { AppRouter } from "../../utils/router-instance";
import { addMovie, getMovies } from "./movie.controller";

const router = AppRouter.getInstance();

router.get(
  "/movies",
  validateAccessTokenAndAppendUserToReq,
  asyncTryCatch(getMovies)
);
router.post(
  "/movies",
  validateAccessTokenAndAppendUserToReq,
  asyncTryCatch(addMovie)
);
