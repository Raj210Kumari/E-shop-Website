//need to add search, filter sort funcnality
class ApiFeatures{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }

    search(){
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options : "i",
            }
        }:{}

        // console.log(keyword)

        this.query=this.query.find({...keyword})
        return this
    }

    filter(){
        const queryCopy={...this.queryStr}
        // console.log(queryCopy)
        //removing some fiels for category
        const removeFields=["keyword","page","limit"]

        removeFields.forEach(key=>delete queryCopy[key])
        // console.log(queryCopy)

        
        //we can use this filter for checking the price but 
        // this will check only for the fixed price but we need 
        // if user search for any price it will show all product 
        // which is in its range. 
        //So we create a new filter

        // console.log(queryCopy)

        //fileter for price
        let queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        // console.log(queryStr)
        return this

    }

    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1

        const skip = resultPerPage*(currentPage-1)

        this.query=this.query.limit(resultPerPage).skip(skip)

        return this
    }
}

module.exports={
    ApiFeatures
}