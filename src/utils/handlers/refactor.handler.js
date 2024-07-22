
import { catchAsyncError } from "../../middleware/catchAsyncError.js";


const deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let results = await model.findByIdAndDelete(id);
    !results &&  next(new AppError( "brand not found", 404)) ;
  
    results && res.json({ message: "Brand deleted" });
  });
  
}

export default deleteOne;
