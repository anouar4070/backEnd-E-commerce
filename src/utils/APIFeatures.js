export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  pagination() {
    // 1/ Pagination
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 4;
    this.mongooseQuery.skip(skip).limit(4);
    return this;
  }

  filter() {
    // 2/ filters
    let filterObj = { ...this.queryString };
    let executedQuery = ["page", "sort", "keywords", "fields"];
    executedQuery.forEach((q) => {
      delete filterObj[q];
    });

    // console.log(filterObj);
    // delete filterObj.page
    // delete filterObj.sort
    // delete filterObj.keywords
    // delete filterObj.fields

    // filter object
    filterObj = JSON.stringify(filterObj);
    //  filterObj = filterObj.replace("gte", "$gte")
    filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, (match) => `$${match}`);
    //\b: Matches word boundaries, ensuring we only match whole words.
    //match =>$${match}``: This is a callback function passed to the replace method. For each match, it replaces the matched operator with a dollar sign followed by the matched operator.
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    // 3-sort:
    // build query
    // let mongooseQuery = ProductModel.find(filterObj).skip(skip).limit(4);

    if (this.queryString.sort) {
      // console.log(this.queryString.sort)
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
     // Suppose this.queryString.sort is "createdAt,-price".
  //The code will perform the following steps:
  //1/ Checks that this.queryString.sort exists, which it does.
  //2/ Splits the string into an array: ["createdAt", "-price"].
  //3/ Joins array elements with a space: "createdAt -price".
  //4/ Applies the createdAt -price sort criterion to the Mongoose query
  }
 

  search() {
    // 4-  search
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
      //example:
  //db.products.find({
  //     $or: [
  //       { title: /iPhone/i },
  //       { description: /iPhone/i }
  //   ]
  // })
  }


  fields() {
    // execute query
    //5-fields
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
