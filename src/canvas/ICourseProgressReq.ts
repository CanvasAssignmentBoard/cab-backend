interface ICourseProgressReq {
    // total number of requirements from all modules
    requirement_count: number,
  
    // total number of requirements the user has completed from all modules
    requirement_completed_count: number,
  
    // url to next module item that has an unmet requirement. null if the user has
    // completed the course or the current module does not require sequential
    // progress
    next_requirement_url: string,
  
    // date the course was completed. null if the course has not been completed by
    // this user
    completed_at: string
  } export default ICourseProgressReq;