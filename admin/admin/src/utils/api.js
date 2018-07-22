const BASE_URL = process.env.base_url || "http://localhost:1337"

export default {
  LIST_SUBJECTS: BASE_URL + "/subject",
  LIST_GRADES: BASE_URL + "/grade",
  LIST_PARTS: BASE_URL + "/part",
  LIST_CHAPTERS: BASE_URL + "/chapter",
  LIST_LESSONS: BASE_URL + "/lesson",
  CREATE_EXERCISE: BASE_URL + "/exercise",
  LIST_TYPES: BASE_URL + "/users-permissions/roles",
  REGISTER: BASE_URL + "/auth/local/register"
}
